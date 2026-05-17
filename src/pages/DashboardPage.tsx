import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, TrendingUp, Shield, Clock, Zap, CheckCircle, Globe, BarChart3, Sparkles, Building2, DollarSign, Users, Server, AlertTriangle, Database, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function DashboardPage() {
  const { theme } = useTheme();
  const [proofCount, setProofCount] = useState(1247);
  const [verificationRate, setVerificationRate] = useState(98.7);
  const [marketplaces, setMarketplaces] = useState(47);
  const [revenue, setRevenue] = useState(2.1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProofCount(prev => prev + Math.floor(Math.random() * 3));
      setVerificationRate(prev => Math.min(99.9, Math.max(95, prev + (Math.random() - 0.5) * 0.1)));
      setMarketplaces(prev => Math.min(100, prev + (Math.random() > 0.9 ? 1 : 0)));
      setRevenue(prev => Math.min(10, prev + (Math.random() > 0.8 ? 0.01 : 0)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const recentProofs = [
    { id: 1, type: 'Compliance', hash: 'zk_comp_8f2a...', time: '2s ago', status: 'verified', chain: 'XRPL' },
    { id: 2, type: 'Rental Trust', hash: 'zk_rent_3d7b...', time: '5s ago', status: 'verified', chain: 'Ethereum' },
    { id: 3, type: 'Airdrop', hash: 'zk_aird_1c9e...', time: '8s ago', status: 'verified', chain: 'Polygon' },
    { id: 4, type: 'Royalty', hash: 'zk_roya_4f2d...', time: '12s ago', status: 'verified', chain: 'Solana' },
    { id: 5, type: 'Governance', hash: 'zk_govn_7a3c...', time: '15s ago', status: 'verified', chain: 'Arbitrum' },
  ];

  const chains = [
    { name: 'XRPL', icon: '🟣', proofs: 523, percentage: 42, volume: '$2.5B' },
    { name: 'Ethereum', icon: '🔷', proofs: 412, percentage: 33, volume: '$45B' },
    { name: 'Polygon', icon: '🟣', proofs: 312, percentage: 25, volume: '$8.2B' },
    { name: 'Solana', icon: '🟢', proofs: 245, percentage: 20, volume: '$12B' },
    { name: 'Arbitrum', icon: '🔵', proofs: 198, percentage: 16, volume: '$5.1B' },
    { name: 'Optimism', icon: '🔴', proofs: 156, percentage: 12, volume: '$3.8B' }
  ];

  const institutionalMetrics = [
    { label: 'Enterprise Marketplaces', value: marketplaces, change: '+12%', icon: Building2, color: 'blue' },
    { label: 'Monthly Revenue (M)', value: `$${revenue}M`, change: '+23%', icon: DollarSign, color: 'green' },
    { label: 'Active Institutions', value: '127', change: '+8%', icon: Users, color: 'purple' },
    { label: 'API Calls (24h)', value: '2.4M', change: '+45%', icon: Server, color: 'orange' }
  ];

  const securityMetrics = [
    { label: 'SOC 2 Compliance', value: 'Certified', icon: Shield, color: 'blue' },
    { label: 'Data Breaches', value: '0', icon: AlertTriangle, color: 'green' },
    { label: 'GDPR Compliant', value: 'Yes', icon: FileText, color: 'purple' },
    { label: 'Data Residency', value: 'Multi-Region', icon: Database, color: 'orange' }
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
              Enterprise Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time ZK proof analytics and institutional metrics
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Metrics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {institutionalMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 text-${metric.color}-600`} />
                <div className={`flex items-center gap-1 text-${metric.color}-600 text-sm font-medium`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</div>
            </div>
          );
        })}
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
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">6</div>
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
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{chain.proofs} proofs</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{chain.volume}</span>
                  </div>
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
                  <div className="text-xs text-gray-500 dark:text-gray-400">{proof.chain}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Compliance Metrics */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Security & Compliance
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          {securityMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center">
                <div className={`flex items-center justify-center gap-2 mb-2 text-${metric.color}-600`}>
                  <Icon className="w-6 h-6" />
                  <span className="text-4xl font-bold">{metric.value}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          Infrastructure Performance
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99.99%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">&lt;100ms</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">API Latency</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">256-bit</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Proof Security</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">3</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Global Regions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
