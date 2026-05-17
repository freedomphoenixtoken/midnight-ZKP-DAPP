import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle, Clock, Target, Zap, Globe, Shield, Building2, Users, TrendingUp, Calendar, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function RoadmapPage() {
  const { theme } = useTheme();

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Foundation',
      status: 'completed',
      icon: CheckCircle,
      color: 'green',
      items: [
        'Core ZK proof infrastructure',
        '5 proof types (Compliance, Rental, Airdrop, Royalty, Governance)',
        'XRPL blockchain integration',
        'Real-time dashboard',
        'Widget SDK (5 widgets)',
        'Marketplace demo',
        'Production deployment'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Multi-Chain Expansion',
      status: 'in-progress',
      icon: Clock,
      color: 'blue',
      items: [
        'Ethereum mainnet support',
        'Polygon integration',
        'Solana compatibility',
        'Cross-chain proof verification',
        'Multi-chain dashboard',
        'Chain-specific optimizations'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Enterprise Features',
      status: 'upcoming',
      icon: Target,
      color: 'purple',
      items: [
        'SOC 2 Type II certification',
        'ISO 27001 compliance',
        'Custom circuit development',
        'White-label solutions',
        'Dedicated enterprise support',
        'SLA guarantees (99.99%)'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Ecosystem Growth',
      status: 'upcoming',
      icon: Rocket,
      color: 'orange',
      items: [
        '10+ blockchain support',
        '100+ marketplace integrations',
        'Mobile SDK (iOS/Android)',
        'Browser extension',
        'Developer portal',
        'Community governance'
      ]
    },
    {
      phase: 'Phase 5',
      title: 'Market Leadership',
      status: 'upcoming',
      icon: Star,
      color: 'yellow',
      items: [
        'Industry standard for ZK compliance',
        'DeFi protocol integrations',
        'Institutional adoption',
        'Regulatory recognition',
        'Global compliance framework',
        'Public company partnerships'
      ]
    }
  ];

  const metrics = [
    { label: 'Marketplaces', current: '12', target: '100+', icon: Building2, color: 'purple' },
    { label: 'Blockchains', current: '10', target: '20+', icon: Globe, color: 'blue' },
    { label: 'Institutions', current: '5', target: '50+', icon: Shield, color: 'green' },
    { label: 'Users', current: '10K', target: '1M+', icon: Users, color: 'orange' },
    { label: 'Proofs Generated', current: '12K', target: '10M+', icon: Zap, color: 'yellow' },
    { label: 'Revenue', current: '$50K', target: '$10M+', icon: TrendingUp, color: 'red' }
  ];

  const timeline = [
    {
      quarter: 'Q2 2026',
      title: 'Multi-Chain Launch',
      status: 'in-progress',
      items: [
        'Ethereum mainnet',
        'Polygon integration',
        'Solana compatibility'
      ]
    },
    {
      quarter: 'Q3 2026',
      title: 'Enterprise Suite',
      status: 'upcoming',
      items: [
        'SOC 2 certification',
        'Custom circuits',
        'White-label solution'
      ]
    },
    {
      quarter: 'Q4 2026',
      title: 'Mobile Ecosystem',
      status: 'upcoming',
      items: [
        'iOS SDK',
        'Android SDK',
        'Browser extension'
      ]
    },
    {
      quarter: 'Q1 2027',
      title: 'Market Leadership',
      status: 'upcoming',
      items: [
        '50+ marketplaces',
        '100K users',
        '$1M+ revenue'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-2xl">
            <Rocket className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Roadmap & Vision
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Our path to becoming the standard for ZK compliance across all blockchains
            </p>
          </div>
        </div>
      </div>

      {/* Target Metrics */}
      <div className={`mb-12 p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-600" />
          2026-2027 Targets
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 text-${metric.color}-600`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{metric.current}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">→ {metric.target}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Development Phases */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          Development Phases
        </h2>
        <div className="space-y-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div key={index} className={`p-6 rounded-2xl border ${phase.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : phase.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${phase.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : phase.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <Icon className={`w-6 h-6 ${phase.status === 'completed' ? 'text-green-600' : phase.status === 'in-progress' ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        phase.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                        phase.status === 'in-progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                        'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {phase.phase}
                      </span>
                      <span className={`text-xs font-medium ${
                        phase.status === 'completed' ? 'text-green-600' :
                        phase.status === 'in-progress' ? 'text-blue-600' :
                        'text-gray-500'
                      }`}>
                        {phase.status === 'completed' ? '✓ Completed' : phase.status === 'in-progress' ? '🔄 In Progress' : '📅 Upcoming'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className={`w-4 h-4 ${phase.status === 'completed' ? 'text-green-500' : phase.status === 'in-progress' ? 'text-blue-500' : 'text-gray-400'}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className={`mb-12 p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          Quarterly Timeline
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((quarter, index) => (
            <div key={index} className={`p-4 rounded-xl ${quarter.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-sm font-bold text-purple-600 mb-2">{quarter.quarter}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">{quarter.title}</h3>
              <ul className="space-y-1">
                {quarter.items.map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 dark:text-gray-400">• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Vision Statement */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-600" />
          Our Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Mission</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              To become the industry standard for zero-knowledge compliance across all blockchain ecosystems, enabling privacy-preserving verification for every transaction, identity, and interaction in the Web3 world.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Impact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              By 2027, we aim to secure 100+ marketplaces, serve 1M+ users, and process 10M+ proofs monthly, becoming the backbone of privacy infrastructure for the decentralized economy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
