import { useState } from 'react';
import { CheckCircle, Heart, Lock, ArrowLeft, ShieldAlert, TrendingUp, Coins, Play, Eye, Shield, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoyaltyComplianceProof } from '../components/zk/RoyaltyComplianceProof';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';

export function RoyaltyCompliancePage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [complianceData, setComplianceData] = useState<any>(null);
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
          <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-2xl">
            <Heart className="w-10 h-10 text-red-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              ZK-Royalty Compliance
            </h1>
            <p className="text-gray-600 mt-1">
              Prove you support creators without revealing your trades
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Prove you support creators without revealing trades</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-2xl p-8 mb-6 border-2 border-red-200">
        <div className="flex items-center gap-2 mb-4">
          <Coins className="w-5 h-5 text-red-600" />
          <label className="text-lg font-bold text-gray-900">Generate Your Proof</label>
        </div>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="Enter XRPL wallet address (r...)"
          className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all duration-200 text-lg mb-3"
        />
        <p className="text-sm text-gray-600 mb-4">
          Your trading data stays private. Only royalty compliance is revealed.
        </p>
        {userAddress && (
          <RoyaltyComplianceProof 
            userAddress={userAddress}
            proofHash={proofHash || undefined}
            onVerified={(hash, data) => {
              setProofHash(hash);
              setComplianceData(data);
            }}
            onRegenerate={() => {
              setProofHash(null);
              setComplianceData(null);
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
            featureName="Royalty Compliance"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="Royalty Compliance" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Shield className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="Royalty Compliance"
            beforeData={[
              'Full transaction history exposed',
              'Counterparty identities revealed',
              'Specific NFTs traded visible',
              'Trading patterns analyzed',
              'Portfolio composition shared'
            ]}
            afterData={[
              'Only compliance status revealed',
              'Counterparties remain anonymous',
              'NFT trades stay private',
              'Trading patterns hidden',
              'Portfolio composition protected'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<Lock className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="Royalty Compliance"
            protectedData={[
              'Transaction amounts',
              'Counterparties',
              'Specific NFTs traded',
              'Trading patterns',
              'Portfolio composition'
            ]}
            exposedData={[
              'Proof hash only',
              'Compliance status (yes/no)',
              'Royalty rate percentage',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your transaction data stays on your device',
              'We check royalty compliance locally (100% royalty rate)',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your trades',
              'Marketplace verifies proof without seeing your transaction history'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="Royalty Compliance"
            problems={[
              {
                title: "Creator Underpayment",
                description: "NFT creators often lose revenue when marketplaces don't enforce royalty payments, especially on secondary markets where royalty enforcement is optional.",
                severity: 'high'
              },
              {
                title: "Trading Privacy Concerns",
                description: "Royalty compliance verification typically requires revealing complete transaction history and trading patterns, exposing sensitive financial information to third parties.",
                severity: 'high'
              },
              {
                title: "Marketplace Fragmentation",
                description: "Different marketplaces have different royalty policies, making it difficult for creators to track and enforce royalty payments across all platforms.",
                severity: 'medium'
              },
              {
                title: "Wash Trading Detection",
                description: "Marketplaces need to detect wash trading to ensure fair royalty distribution, but traditional methods require analyzing complete trading histories.",
                severity: 'high'
              },
              {
                title: "Cross-Platform Tracking",
                description: "Tracking royalty compliance across multiple marketplaces requires sharing user data between platforms, creating privacy risks and data silos.",
                severity: 'medium'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && complianceData && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Royalty Compliance Verified</h3>
              <p className="text-green-600 text-sm">You support creators</p>
            </div>
          </div>

          {/* Compliance Metrics */}
          <div className="bg-white rounded-xl p-6 border border-green-200 space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-xs text-gray-500">Royalty Rate</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Heart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{complianceData.transactions || 0}</div>
                <div className="text-xs text-gray-500">Compliant Trades</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Coins className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{complianceData.totalRoyalties || 0} XRP</div>
                <div className="text-xs text-gray-500">Royalties Paid</div>
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

              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash to prove you're a creator-friendly trader. 
                  Marketplaces will verify your compliance without seeing your transaction history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
