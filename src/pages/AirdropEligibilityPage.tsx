import { useState } from 'react';
import { CheckCircle, Gift, Lock, ArrowLeft, ShieldAlert, Clock, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AirdropEligibilityProof } from '../components/zk/AirdropEligibilityProof';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';

export function AirdropEligibilityPage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [eligibilityData, setEligibilityData] = useState<any>(null);

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
            <Gift className="w-10 h-10 text-orange-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              ZK-Airdrop Eligibility
            </h1>
            <p className="text-gray-600 mt-1">
              Prove you're a legitimate user without revealing your wallet activity
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Fair airdrops without privacy invasion</span>
        </div>
      </div>

      {/* Privacy Visualization */}
      <PrivacyVisualization
        featureName="Airdrop Eligibility"
        protectedData={[
          'Wallet balance',
          'Transaction history',
          'NFT holdings',
          'Personal identity',
          'IP address'
        ]}
        exposedData={[
          'Proof hash only',
          'Eligibility status (yes/no)',
          'Proof expiration date'
        ]}
        processSteps={[
          'Your wallet data stays on your device',
          'We check eligibility criteria locally (30+ days, 5+ txns, holds XRP)',
          'Zero-knowledge proof is generated mathematically',
          'Only the proof is shared - never your data',
          'Marketplace verifies proof without seeing your wallet'
        ]}
      />

      {/* Wallet Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-orange-600" />
          XRPL Wallet Address
        </label>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="r..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-lg"
        />
        <p className="text-sm text-gray-500 mt-2">
          Enter your XRPL wallet address to generate an airdrop eligibility proof
        </p>
      </div>

      {/* Airdrop Eligibility Proof Component */}
      {userAddress && (
        <AirdropEligibilityProof 
          userAddress={userAddress}
          proofHash={proofHash || undefined}
          onVerified={(hash, data) => {
            setProofHash(hash);
            setEligibilityData(data);
          }}
        />
      )}

      {/* Success State with Magic Moment */}
      {proofHash && eligibilityData && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Eligibility Verified</h3>
              <p className="text-green-600 text-sm">You qualify for airdrops</p>
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
                <Wallet className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">5+</div>
                <div className="text-xs text-gray-500">Transactions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Gift className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">✓</div>
                <div className="text-xs text-gray-500">Holds XRP</div>
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
                <span className="font-medium">Your wallet details remain completely private</span>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash to claim airdrops from participating marketplaces. 
                  They will verify your eligibility without seeing your wallet activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
