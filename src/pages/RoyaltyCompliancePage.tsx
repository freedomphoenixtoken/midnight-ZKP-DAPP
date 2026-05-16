import { useState } from 'react';
import { CheckCircle, Heart, Lock, ArrowLeft, Eye, ShieldAlert, TrendingUp, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoyaltyComplianceProof } from '../components/zk/RoyaltyComplianceProof';

export function RoyaltyCompliancePage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [complianceData, setComplianceData] = useState<any>(null);

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

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 mb-8 border border-red-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Eye className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We generate a zero-knowledge proof that verifies you've paid royalties on your NFT transactions 
              without revealing transaction amounts, counterparties, or specific NFTs traded.
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Coins className="w-4 h-4 text-red-600" />
          XRPL Wallet Address
        </label>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="r..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-lg"
        />
        <p className="text-sm text-gray-500 mt-2">
          Enter your XRPL wallet address to generate a royalty compliance proof
        </p>
      </div>

      {/* Royalty Compliance Proof Component */}
      {userAddress && (
        <RoyaltyComplianceProof 
          userAddress={userAddress}
          onVerified={(hash, data) => {
            setProofHash(hash);
            setComplianceData(data);
          }}
        />
      )}

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
