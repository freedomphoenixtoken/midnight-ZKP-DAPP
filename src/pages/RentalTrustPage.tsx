import { useState } from 'react';
import { CheckCircle, DollarSign, Lock, ShieldCheck, ArrowLeft, Play, Eye, Info, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RentalTrustScore } from '../components/zk/RentalTrustScore';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';
import { WalletConnection } from '../components/wallet/WalletConnection';

export function RentalTrustPage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Header with Privacy-First Design */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl">
            <DollarSign className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ZK-XRP Balance Proof
            </h1>
            <p className="text-gray-600 mt-1">
              Prove minimum XRP balance without revealing your exact holdings
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your XRP balance stays private</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="space-y-4 mb-6">
        <WalletConnection 
          onConnect={setUserAddress}
          onDisconnect={() => {
            setUserAddress('');
            setProofHash(null);
            setStats(null);
          }}
          connectedAddress={userAddress}
        />
        
        {userAddress && (
          <RentalTrustScore
            userAddress={userAddress}
            proofHash={proofHash || undefined}
            onVerified={(hash, data) => {
              setProofHash(hash);
              setStats(data);
            }}
            onRegenerate={() => {
              setProofHash(null);
              setStats(null);
            }}
          />
        )}
      </div>

      {/* Collapsible Educational Content */}
      <div className="space-y-4">
        <Accordion 
          title="Interactive Demo" 
          icon={<Play className="w-5 h-5 text-indigo-600" />}
          defaultOpen={false}
        >
          <DemoMode
            featureName="XRP Balance Proof"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="XRP Balance Proof" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Lock className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="XRP Balance Proof"
            beforeData={[
              'Exact XRP balance exposed',
              'Account reserve visible',
              'Transaction history revealed',
              'Trust line amounts shared',
              'Wallet activity tracked'
            ]}
            afterData={[
              'Only minimum balance status revealed',
              'Account reserve protected',
              'Transaction history private',
              'Trust line amounts hidden',
              'Wallet activity never tracked'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="XRP Balance Proof"
            protectedData={[
              'Exact XRP balance',
              'Account reserve amount',
              'Transaction history',
              'Trust line balances',
              'Wallet activity patterns'
            ]}
            exposedData={[
              'Proof hash only',
              'Minimum balance status (yes/no)',
              'Balance range (not exact)',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your XRP balance stays on your device',
              'We check minimum balance from XRPL ledger',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your balance',
              'Marketplace verifies proof without seeing your XRP holdings'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="XRP Balance Proof"
            problems={[
              {
                title: "Balance Privacy",
                description: "Traditional balance verification requires revealing exact XRP holdings, exposing users to targeted attacks, manipulation, and surveillance of their financial position on XRPL.",
                severity: 'high'
              },
              {
                title: "Transaction Fee Requirements",
                description: "XRPL requires minimum XRP balance for account reserve and transaction fees, but traditional verification exposes the exact amount needed for attackers to target users.",
                severity: 'high'
              },
              {
                title: "Marketplace Eligibility",
                description: "XRPL NFT marketplaces often require minimum balance verification for eligibility, forcing users to compromise privacy to access premium features.",
                severity: 'medium'
              },
              {
                title: "Whale Targeting",
                description: "Public XRP balances make whale accounts visible targets for manipulation, front-running, and predatory trading strategies on XRPL.",
                severity: 'high'
              },
              {
                title: "Cross-Chain Privacy",
                description: "Users often bridge funds across chains, but traditional verification exposes balance information across multiple networks, creating comprehensive privacy risks.",
                severity: 'medium'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && stats && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">XRP Balance Verified</h3>
              <p className="text-green-600 text-sm">Your balance status has been proven</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-medium">Balance Status</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">✓</div>
              <div className="text-xs text-gray-500 mt-1">Above minimum</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Reserve Met</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">✓</div>
              <div className="text-xs text-gray-500 mt-1">Account reserve</div>
            </div>
          </div>

          {/* Proof Hash */}
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Proof Hash
                </label>
                <div className="mt-1 bg-gray-50 rounded-lg p-3 font-mono text-sm text-gray-800 break-all">
                  {proofHash}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-700">
                <ShieldAlert className="w-4 h-4" />
                <span className="font-medium">Your exact XRP balance remains confidential</span>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in XRPL marketplaces for NFT trading, RWA purchases, or premium features. The marketplace will verify your balance status without seeing your XRP holdings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
