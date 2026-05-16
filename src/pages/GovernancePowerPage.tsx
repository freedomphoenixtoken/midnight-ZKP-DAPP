import { useState } from 'react';
import { CheckCircle, Vote, Lock, ArrowLeft, ShieldAlert, Users, Crown, Play, Eye, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GovernancePowerProof } from '../components/zk/GovernancePowerProof';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';

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
            <Vote className="w-10 h-10 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ZK-Governance Power
            </h1>
            <p className="text-gray-600 mt-1">
              Vote anonymously with verified power
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Vote anonymously with verified power</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-8 mb-6 border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-purple-600" />
          <label className="text-lg font-bold text-gray-900">Generate Your Proof</label>
        </div>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="Enter XRPL wallet address (r...)"
          className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-200 text-lg mb-3"
        />
        <p className="text-sm text-gray-600 mb-4">
          Your token holdings stay private. Only voting power is revealed.
        </p>
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
            featureName="Governance Power"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="Governance Power" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Shield className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="Governance Power"
            beforeData={[
              'Exact token count exposed',
              'Complete voting history visible',
              'Proposal choices tracked',
              'Wallet composition revealed',
              'Delegation patterns analyzed'
            ]}
            afterData={[
              'Only voting power range revealed',
              'Voting history remains private',
              'Proposal choices stay hidden',
              'Wallet composition protected',
              'Delegation patterns never shared'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<Lock className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="Governance Power"
            protectedData={[
              'Exact token count',
              'Voting history',
              'Proposal choices',
              'Wallet composition',
              'Delegation patterns'
            ]}
            exposedData={[
              'Proof hash only',
              'Voting power range (not exact)',
              'Has voting rights (yes/no)',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your token data stays on your device',
              'We check governance eligibility locally',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your holdings',
              'DAO verifies proof without seeing your token count'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="Governance Power"
            problems={[
              {
                title: "Whale Dominance",
                description: "Large token holders (whales) often dominate DAO governance, making it difficult for smaller token holders to have meaningful influence on decisions.",
                severity: 'high'
              },
              {
                title: "Vote Buying",
                description: "Voting power can be bought or rented, allowing malicious actors to influence governance outcomes without genuine community interest.",
                severity: 'high'
              },
              {
                title: "Privacy in Voting",
                description: "Traditional governance systems often require revealing token holdings and voting history, exposing sensitive financial information and potentially enabling vote coercion.",
                severity: 'high'
              },
              {
                title: "Sybil Attacks",
                description: "Governance systems are vulnerable to sybil attacks where users create multiple wallets to amplify their voting power beyond their actual stake.",
                severity: 'high'
              },
              {
                title: "Cross-DAO Verification",
                description: "Verifying governance power across multiple DAOs requires sharing voting history and token holdings between platforms, creating privacy risks.",
                severity: 'medium'
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
              <h3 className="text-2xl font-bold text-green-800">Governance Power Verified</h3>
              <p className="text-green-600 text-sm">You can vote anonymously</p>
            </div>
          </div>

          {/* Governance Metrics */}
          <div className="bg-white rounded-xl p-6 border border-green-200 space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <Crown className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{governanceData.votingPower || 0}</div>
                <div className="text-xs text-gray-500">Voting Power</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{governanceData.proposals || 0}</div>
                <div className="text-xs text-gray-500">Proposals Voted</div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <Vote className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{governanceData.participation || 0}%</div>
                <div className="text-xs text-gray-500">Participation Rate</div>
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
                <span className="font-medium">Your token holdings remain completely private</span>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-sm text-indigo-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash to participate in DAO governance anonymously. 
                  The DAO will verify your voting power without seeing your token count.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
