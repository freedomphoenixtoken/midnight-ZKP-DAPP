import { useState } from 'react';
import { CheckCircle, Link as LinkIcon, Lock, ArrowLeft, ShieldAlert, Users, Crown, Play, Eye, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GovernancePowerProof } from '../components/zk/GovernancePowerProof';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';
import { WalletConnection } from '../components/wallet/WalletConnection';

export function GovernancePowerPage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [governanceData, setGovernanceData] = useState<any>(null);
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
          <div className="bg-gradient-to-r from-indigo-100 to-violet-100 p-4 rounded-2xl">
            <LinkIcon className="w-10 h-10 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ZK-Trust Line Proof
            </h1>
            <p className="text-gray-600 mt-1">
              Prove trust line status on XRPL without revealing your token holdings
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your trust line amounts stay private</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="space-y-4 mb-6">
        <WalletConnection 
          onConnect={setUserAddress}
          onDisconnect={() => {
            setUserAddress('');
            setProofHash(null);
            setGovernanceData(null);
          }}
          connectedAddress={userAddress}
        />
        
        {userAddress && (
          <GovernancePowerProof 
            userAddress={userAddress}
            proofHash={proofHash || undefined}
            onVerified={(hash, data) => {
              setProofHash(hash);
              setGovernanceData(data);
            }}
            onRegenerate={() => {
              setProofHash(null);
              setGovernanceData(null);
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
            featureName="Trust Line Proof"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="Trust Line Proof" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Shield className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="Trust Line Proof"
            beforeData={[
              'Exact trust line amounts exposed',
              'All token balances visible to all',
              'Counterparty addresses revealed',
              'Trust line limits tracked',
              'Token holdings shared'
            ]}
            afterData={[
              'Only trust line status revealed',
              'Token amounts remain private',
              'Counterparties stay anonymous',
              'Trust line limits protected',
              'Token holdings hidden'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<Lock className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="Trust Line Proof"
            protectedData={[
              'Exact trust line amounts',
              'Token balances',
              'Counterparty addresses',
              'Trust line limits',
              'Token holdings'
            ]}
            exposedData={[
              'Proof hash only',
              'Trust line status (yes/no)',
              'Trust line count (not exact)',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your trust line data stays on your device',
              'We check trust line status from XRPL ledger',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your trust lines',
              'Marketplace verifies proof without seeing your token holdings'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="Trust Line Proof"
            problems={[
              {
                title: "Trust Line Privacy",
                description: "Traditional trust line verification requires revealing exact token amounts and counterparty addresses, exposing trading relationships and portfolio composition on XRPL.",
                severity: 'high'
              },
              {
                title: "Counterparty Privacy",
                description: "Trust lines reveal counterparty addresses, exposing business relationships, trading partners, and network connections that users prefer to keep private on XRPL.",
                severity: 'high'
              },
              {
                title: "Token Holdings Exposure",
                description: "Trust line verification often reveals complete token holdings, making users targets for manipulation, front-running, and predatory trading strategies.",
                severity: 'high'
              },
              {
                title: "Marketplace Eligibility",
                description: "XRPL token marketplaces often require trust line verification for eligibility, forcing users to compromise privacy to access token trading features.",
                severity: 'medium'
              },
              {
                title: "Cross-Platform Tracking",
                description: "Trust lines are tracked across multiple platforms, creating privacy risks and enabling surveillance of user activity and token preferences.",
                severity: 'high'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && governanceData && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Trust Line Status Verified</h3>
              <p className="text-green-600 text-sm">Your trust line status has been proven</p>
            </div>
          </div>

          {/* Governance Metrics */}
          <div className="bg-white rounded-xl p-6 border border-green-200 space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <Crown className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{governanceData.votingPower || 0}</div>
                <div className="text-xs text-gray-500">Trust Lines</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{governanceData.proposals || 0}</div>
                <div className="text-xs text-gray-500">Tokens</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <LinkIcon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{governanceData.participation || 0}%</div>
                <div className="text-xs text-gray-500">Status</div>
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
                <span className="font-medium">Your trust line amounts remain completely private</span>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in XRPL token marketplaces for trading, RWA purchases, or premium features. The marketplace will verify your trust line status without seeing your token holdings.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
