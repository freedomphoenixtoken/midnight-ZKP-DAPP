import { useState } from 'react';
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle, ArrowRight, Lock } from 'lucide-react';

interface BeforeAfterComparisonProps {
  featureName: string;
  beforeData: string[];
  afterData: string[];
}

export function BeforeAfterComparison({ featureName, beforeData, afterData }: BeforeAfterComparisonProps) {
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-xl">
          {showBefore ? <Eye className="w-6 h-6 text-white" /> : <EyeOff className="w-6 h-6 text-white" />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Privacy Comparison</h3>
          <p className="text-sm text-gray-600">See what changes with {featureName}</p>
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setShowBefore(true)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            showBefore
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          Before ZK Proof
        </button>
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
        <button
          onClick={() => setShowBefore(false)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            !showBefore
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          After ZK Proof
        </button>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before Card */}
        <div className={`rounded-xl p-6 border-2 transition-all duration-500 ${
          showBefore
            ? 'bg-red-50 border-red-300 shadow-lg shadow-red-500/20 scale-105'
            : 'bg-gray-50 border-gray-200 opacity-60'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${showBefore ? 'bg-red-500' : 'bg-gray-400'}`}>
              <Eye className={`w-5 h-5 ${showBefore ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <h4 className={`font-bold ${showBefore ? 'text-red-900' : 'text-gray-600'}`}>
              Traditional Verification
            </h4>
          </div>
          <div className="space-y-3">
            {beforeData.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <AlertTriangle className={`w-4 h-4 mt-0.5 ${showBefore ? 'text-red-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${showBefore ? 'text-red-800' : 'text-gray-500'}`}>{item}</span>
              </div>
            ))}
          </div>
          <div className={`mt-4 p-3 rounded-lg ${showBefore ? 'bg-red-100' : 'bg-gray-100'}`}>
            <div className={`text-xs font-semibold ${showBefore ? 'text-red-700' : 'text-gray-500'}`}>
              ⚠️ Privacy Risk: HIGH
            </div>
            <div className={`text-xs ${showBefore ? 'text-red-600' : 'text-gray-400'}`}>
              Your sensitive data is exposed to third parties
            </div>
          </div>
        </div>

        {/* After Card */}
        <div className={`rounded-xl p-6 border-2 transition-all duration-500 ${
          !showBefore
            ? 'bg-green-50 border-green-300 shadow-lg shadow-green-500/20 scale-105'
            : 'bg-gray-50 border-gray-200 opacity-60'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${!showBefore ? 'bg-green-500' : 'bg-gray-400'}`}>
              <Shield className={`w-5 h-5 ${!showBefore ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <h4 className={`font-bold ${!showBefore ? 'text-green-900' : 'text-gray-600'}`}>
              Zero-Knowledge Proof
            </h4>
          </div>
          <div className="space-y-3">
            {afterData.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 mt-0.5 ${!showBefore ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${!showBefore ? 'text-green-800' : 'text-gray-500'}`}>{item}</span>
              </div>
            ))}
          </div>
          <div className={`mt-4 p-3 rounded-lg ${!showBefore ? 'bg-green-100' : 'bg-gray-100'}`}>
            <div className={`text-xs font-semibold ${!showBefore ? 'text-green-700' : 'text-gray-500'}`}>
              ✅ Privacy Risk: MINIMAL
            </div>
            <div className={`text-xs ${!showBefore ? 'text-green-600' : 'text-gray-400'}`}>
              Only mathematical proof is shared, never your data
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Score */}
      <div className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-green-600" />
            <div>
              <div className="text-sm font-bold text-green-900">Privacy Improvement</div>
              <div className="text-xs text-green-700">
                Zero-knowledge proofs protect {beforeData.length} types of sensitive data
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">99.9%</div>
            <div className="text-xs text-green-700">Data Protected</div>
          </div>
        </div>
      </div>
    </div>
  );
}
