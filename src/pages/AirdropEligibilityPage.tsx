import { useState } from 'react';
import { CheckCircle, Activity, Lock, ArrowLeft, ShieldAlert, Clock, Wallet, Play, Eye, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AirdropEligibilityProof } from '../components/zk/AirdropEligibilityProof';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';
import { WalletConnection } from '../components/wallet/WalletConnection';

export function AirdropEligibilityPage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [eligibilityData, setEligibilityData] = useState<any>(null);
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
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-4 rounded-2xl">
            <Activity className="w-10 h-10 text-orange-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              ZK-Transaction History Proof
            </h1>
            <p className="text-gray-600 mt-1">
              Prove wallet activity on XRPL without revealing your transaction history
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your transaction history stays private</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="space-y-4 mb-6">
        <WalletConnection 
          onConnect={setUserAddress}
          onDisconnect={() => {
            setUserAddress('');
            setProofHash(null);
            setEligibilityData(null);
          }}
          connectedAddress={userAddress}
        />
        
        {userAddress && (
          <AirdropEligibilityProof 
            userAddress={userAddress}
            proofHash={proofHash || undefined}
            onVerified={(hash, data) => {
              setProofHash(hash);
              setEligibilityData(data);
            }}
            onRegenerate={() => {
              setProofHash(null);
              setEligibilityData(null);
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
            featureName="Transaction History Proof"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="Transaction History Proof" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Shield className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="Transaction History Proof"
            beforeData={[
              'Complete transaction history exposed',
              'Transaction amounts visible to all',
              'Counterparty addresses revealed',
              'Transaction types tracked',
              'Timing patterns analyzed'
            ]}
            afterData={[
              'Only activity status revealed',
              'Transaction amounts private',
              'Counterparties remain anonymous',
              'Transaction types hidden',
              'Timing patterns protected'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<Lock className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="Transaction History Proof"
            protectedData={[
              'Transaction amounts',
              'Counterparty addresses',
              'Transaction types',
              'Timing patterns',
              'Specific transaction details'
            ]}
            exposedData={[
              'Proof hash only',
              'Activity status (yes/no)',
              'Transaction count range',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your transaction data stays on your device',
              'We check activity from XRPL ledger',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your transactions',
              'Marketplace verifies proof without seeing your history'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="Transaction History Proof"
            problems={[
              {
                title: "Transaction Privacy",
                description: "Traditional transaction verification requires revealing complete transaction history, exposing financial patterns, counterparties, and trading strategies to surveillance and analysis.",
                severity: 'high'
              },
              {
                title: "Sybil Attack Prevention",
                description: "XRPL marketplaces need to verify legitimate wallet activity without revealing transaction history to prevent sybil attacks while maintaining user privacy.",
                severity: 'high'
              },
              {
                title: "Pattern Analysis",
                description: "Transaction history reveals spending patterns, trading strategies, and behavioral data that can be used for profiling and targeted manipulation on XRPL.",
                severity: 'high'
              },
              {
                title: "Counterparty Privacy",
                description: "Traditional verification exposes counterparty addresses, revealing business relationships, trading partners, and network connections on XRPL.",
                severity: 'high'
              },
              {
                title: "Marketplace Eligibility",
                description: "XRPL NFT marketplaces often require transaction history verification for eligibility, forcing users to compromise privacy to access premium features.",
                severity: 'medium'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && eligibilityData && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Transaction History Verified</h3>
              <p className="text-green-600 text-sm">Your wallet activity has been proven</p>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white rounded-xl p-6 border border-green-200 space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-xs text-gray-500">Days Active</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-xs text-gray-500">Transactions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Wallet className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">✓</div>
                <div className="text-xs text-gray-500">Active Wallet</div>
              </div>
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
                <span className="font-medium">Your transaction details remain completely private</span>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in XRPL marketplaces for NFT trading, RWA purchases, or premium features. The marketplace will verify your activity without seeing your transaction history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
