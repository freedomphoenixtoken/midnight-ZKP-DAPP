import { useState } from 'react';
import { CheckCircle, Lock, Shield, ArrowLeft, Play, Eye, Info, Image, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CompliancePassport } from '../components/zk/CompliancePassport';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';
import { WalletConnection } from '../components/wallet/WalletConnection';
import { XRPLWalletConnection } from '../components/wallet/XRPLWalletConnection';
import { CrossChainService } from '../services/cross-chain-service';
import { MidnightService } from '../services/midnight-service';

export function CompliancePage() {
  const [userAddress, setUserAddress] = useState('');
  const [xrplAddress, setXrplAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [crossChainProof, setCrossChainProof] = useState<any>(null);
  const [isProcessingCrossChain, setIsProcessingCrossChain] = useState(false);

  const midnightService = new MidnightService();
  const crossChainService = new CrossChainService(midnightService);

  const handleXRPLConnect = (address: string) => {
    setXrplAddress(address);
    // Connect XRPL wallet to cross-chain service
    crossChainService.connectXRPLWallet({
      address,
      signTransaction: async (tx: any) => {
        if (window.xrpl) {
          return await window.xrpl.signTransaction(tx);
        }
        throw new Error('XRPL wallet not available');
      },
      submitTransaction: async (tx: any) => {
        if (window.xrpl) {
          return await window.xrpl.submitTransaction(tx);
        }
        throw new Error('XRPL wallet not available');
      }
    });
  };

  const executeCrossChainFlow = async () => {
    if (!userAddress || !xrplAddress) {
      alert('Please connect both Midnight and XRPL wallets first');
      return;
    }

    try {
      setIsProcessingCrossChain(true);
      console.log('Starting cross-chain flow...');

      // Generate and sign proof on Midnight with DUST
      const proof = await crossChainService.executeCrossChainFlow('nft_ownership', {
        userDid: userAddress,
        accreditationLevel: 5
      });

      setCrossChainProof(proof);
      setProofHash(proof.midnightProofHash);

      console.log('Cross-chain flow completed:', proof);
    } catch (error) {
      console.error('Cross-chain flow failed:', error);
      alert('Cross-chain verification failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessingCrossChain(false);
    }
  };

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
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-2xl">
            <Image className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ZK-NFT Ownership Proof
            </h1>
            <p className="text-gray-600 mt-1">
              Prove NFT ownership on XRPL without revealing your entire portfolio
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your NFT portfolio stays private</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="space-y-4 mb-6">
        <WalletConnection 
          onConnect={setUserAddress}
          onDisconnect={() => {
            setUserAddress('');
            setProofHash(null);
          }}
          connectedAddress={userAddress}
        />

        <XRPLWalletConnection
          onConnect={handleXRPLConnect}
          onDisconnect={() => {
            setXrplAddress('');
            setCrossChainProof(null);
          }}
          connectedAddress={xrplAddress}
        />

        {userAddress && xrplAddress && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Link2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cross-Chain Verification</h3>
                <p className="text-sm text-gray-600">Generate ZK proof on Midnight, sign with DUST, verify on XRPL</p>
              </div>
            </div>

            <button
              onClick={executeCrossChainFlow}
              disabled={isProcessingCrossChain || !userAddress || !xrplAddress}
              className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
                isProcessingCrossChain
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
              }`}
            >
              {isProcessingCrossChain ? 'Processing Cross-Chain Flow...' : 'Execute Cross-Chain Verification'}
            </button>

            {crossChainProof && (
              <div className="mt-4 bg-white rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Midnight Proof Generated and Signed with DUST</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Proof Verified on XRPL</span>
                </div>
                <div className="text-xs text-gray-500">
                  Midnight Signature: {crossChainProof.midnightSignature.substring(0, 20)}...
                </div>
                <div className="text-xs text-gray-500">
                  XRPL Tx Hash: {crossChainProof.xrplTxHash || 'Pending...'}
                </div>
              </div>
            )}
          </div>
        )}
        
        {userAddress && (
          <CompliancePassport
            userAddress={userAddress}
            proofHash={proofHash || undefined}
            onVerified={(hash) => {
              setProofHash(hash);
            }}
            onRegenerate={() => {
              setProofHash(null);
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
            featureName="NFT Ownership Proof"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="NFT Ownership Proof" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Lock className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="NFT Ownership Proof"
            beforeData={[
              'Full NFT portfolio exposed',
              'All NFT IDs visible to all',
              'NFT metadata shared publicly',
              'Purchase history revealed',
              'Portfolio composition tracked'
            ]}
            afterData={[
              'Only ownership status revealed',
              'NFT count range (not exact)',
              'Specific NFTs remain private',
              'Purchase history protected',
              'Portfolio composition hidden'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<Shield className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="NFT Ownership Proof"
            protectedData={[
              'Specific NFT IDs',
              'Complete NFT portfolio',
              'NFT purchase history',
              'NFT metadata',
              'Portfolio composition'
            ]}
            exposedData={[
              'Proof hash only',
              'NFT ownership status (yes/no)',
              'NFT count range (not exact)',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your NFT data stays on your device',
              'We verify NFT ownership from XRPL ledger',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your NFTs',
              'Marketplace verifies proof without seeing your portfolio'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="NFT Ownership Proof"
            problems={[
              {
                title: "Portfolio Privacy",
                description: "Traditional NFT ownership verification requires revealing complete NFT portfolios, exposing valuable holdings and trading patterns to competitors and malicious actors.",
                severity: 'high'
              },
              {
                title: "Whale Targeting",
                description: "Public NFT holdings make whale accounts visible targets for manipulation, front-running, and predatory trading strategies on XRPL marketplaces.",
                severity: 'high'
              },
              {
                title: "Cross-Platform Tracking",
                description: "NFT holdings are tracked across multiple platforms, creating privacy risks and enabling surveillance of user activity and preferences.",
                severity: 'high'
              },
              {
                title: "NFT Marketplace Privacy",
                description: "XRPL NFT marketplaces often require public verification of NFT ownership for eligibility, forcing users to compromise privacy for access.",
                severity: 'medium'
              },
              {
                title: "RWA NFT Privacy",
                description: "Real World Asset (RWA) NFTs represent sensitive ownership stakes (real estate, art, etc.) that users prefer to keep private while still proving ownership.",
                severity: 'high'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">NFT Ownership Verified</h3>
              <p className="text-green-600 text-sm">Your proof has been generated successfully</p>
            </div>
          </div>

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
                <Lock className="w-4 h-4" />
                <span className="font-medium">This proof is cryptographically verifiable</span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in XRPL NFT marketplaces for RWA purchases or exclusive NFT drops. The marketplace will verify your NFT ownership without seeing your portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
