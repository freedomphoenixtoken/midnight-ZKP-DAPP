import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, TrendingUp, Shield, Clock, Zap, CheckCircle, Globe, BarChart3, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function DashboardPage() {
  const { theme } = useTheme();
  const [proofCount, setProofCount] = useState(1247);
  const [verificationRate, setVerificationRate] = useState(98.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setProofCount(prev => prev + Math.floor(Math.random() * 3));
      setVerificationRate(prev => Math.min(99.9, Math.max(95, prev + (Math.random() - 0.5) * 0.1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const recentProofs = [
    { id: 1, type: 'Compliance', hash: 'zk_comp_8f2a...', time: '2s ago', status: 'verified' },
    { id: 2, type: 'Rental Trust', hash: 'zk_rent_3d7b...', time: '5s ago', status: 'verified' },
    { id: 3, type: 'Airdrop', hash: 'zk_aird_1c9e...', time: '8s ago', status: 'verified' },
    { id: 4, type: 'Royalty', hash: 'zk_roya_4f2d...', time: '12s ago', status: 'verified' },
    { id: 5, type: 'Governance', hash: 'zk_govn_7a3c...', time: '15s ago', status: 'verified' },
  ];

  const chains = [
    { name: 'XRPL', icon: '⚡', proofs: 523, percentage: 42 },
    { name: 'Ethereum', icon: '⟠', proofs: 412, percentage: 33 },
    { name: 'Polygon', icon: '◈', proofs: 312, percentage: 25 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 rounded-2xl">
            <Activity className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Real-Time Proof Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Live ZK proof generation and verification analytics
            </p>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Zap className="w-3 h-3 animate-pulse" />
              <span>Live</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{proofCount.toLocaleString()}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Proofs Generated</div>
        </div>

        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-3 h-3" />
              <span>+2.3%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{verificationRate}%</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Verification Success Rate</div>
        </div>

        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-600" />
            <div className="flex items-center gap-1 text-purple-600 text-sm">
              <Zap className="w-3 h-3" />
              <span>Fast</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2.3s</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Avg Generation Time</div>
        </div>

        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <Globe className="w-8 h-8 text-orange-600" />
            <div className="flex items-center gap-1 text-orange-600 text-sm">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Multi</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Supported Chains</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Chain Distribution */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-orange-600" />
            Multi-Chain Distribution
          </h3>
          <div className="space-y-4">
            {chains.map((chain) => (
              <div key={chain.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{chain.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{chain.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{chain.proofs} proofs</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${chain.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Proofs */}
        <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Recent Proofs
          </h3>
          <div className="space-y-3">
            {recentProofs.map((proof) => (
              <div key={proof.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{proof.type}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{proof.hash}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{proof.time}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">{proof.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Performance Metrics
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">&lt;100ms</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Verification Latency</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">256-bit</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Proof Security</div>
          </div>
        </div>
      </div>
    </div>
  );
}
