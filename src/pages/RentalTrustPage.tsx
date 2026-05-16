import { useState } from 'react';
import { CheckCircle, TrendingUp, Lock, ShieldCheck, Sparkles, ArrowLeft, Eye, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RentalTrustScore } from '../components/zk/RentalTrustScore';

export function RentalTrustPage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

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
            <ShieldCheck className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ZK-Rental Trust Score
            </h1>
            <p className="text-gray-600 mt-1">
              Prove your rental reliability without revealing your history
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your rental history stays private</span>
        </div>
      </div>

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We calculate your trust score from rental history and generate a zero-knowledge proof. 
              Only your trust score is revealed, not the individual rental transactions or history.
            </p>
          </div>
        </div>
      </div>

      {/* Wallet Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          XRPL Wallet Address
        </label>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="r..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg"
        />
        <p className="text-sm text-gray-500 mt-2">
          Enter your XRPL wallet address to generate a rental trust score proof
        </p>
      </div>

      {/* Rental Trust Score Component */}
      {userAddress && (
        <RentalTrustScore 
          userAddress={userAddress}
          onVerified={(hash, s) => {
            setProofHash(hash);
            setStats(s);
          }}
        />
      )}

      {/* Success State with Magic Moment */}
      {proofHash && stats && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Trust Score Verified</h3>
              <p className="text-green-600 text-sm">Your rental reliability has been proven</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium">Success Rate</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.successRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Successful rentals</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-medium">On-Time Rate</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.onTimeRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Returned on time</div>
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
                <span className="font-medium">Your individual rental history remains confidential</span>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in your marketplace 
                  for NFT rental requests. The marketplace will verify your trust score without seeing your rental history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
