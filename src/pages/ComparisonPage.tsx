import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Zap, Shield, Globe, Building2, DollarSign, TrendingUp, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ComparisonPage() {
  const { theme } = useTheme();

  const competitors = [
    {
      name: 'Midnight ZKP DApp',
      isUs: true,
      multiChain: 10,
      compliance: ['SOC 2', 'ISO 27001', 'GDPR', 'CCPA', 'MiCA'],
      widgets: 5,
      enterprise: true,
      pricing: '$0 - Custom',
      deployment: 'Production',
      proofTypes: 5,
      api: true,
      demo: true
    },
    {
      name: 'Aztec Network',
      isUs: false,
      multiChain: 2,
      compliance: ['GDPR'],
      widgets: 0,
      enterprise: false,
      pricing: '$500+',
      deployment: 'Testnet',
      proofTypes: 3,
      api: true,
      demo: false
    },
    {
      name: 'Tornado Cash',
      isUs: false,
      multiChain: 1,
      compliance: [],
      widgets: 0,
      enterprise: false,
      pricing: 'Gas fees',
      deployment: 'Mainnet',
      proofTypes: 1,
      api: false,
      demo: false
    },
    {
      name: 'zkSync',
      isUs: false,
      multiChain: 2,
      compliance: ['SOC 2'],
      widgets: 0,
      enterprise: false,
      pricing: 'Gas fees',
      deployment: 'Mainnet',
      proofTypes: 2,
      api: true,
      demo: true
    },
    {
      name: 'Polygon ID',
      isUs: false,
      multiChain: 3,
      compliance: ['GDPR'],
      widgets: 2,
      enterprise: true,
      pricing: '$100+',
      deployment: 'Mainnet',
      proofTypes: 3,
      api: true,
      demo: true
    },
    {
      name: 'Aleo',
      isUs: false,
      multiChain: 1,
      compliance: ['SOC 2'],
      widgets: 0,
      enterprise: false,
      pricing: 'Gas fees',
      deployment: 'Testnet',
      proofTypes: 2,
      api: true,
      demo: false
    }
  ];

  const features = [
    { name: 'Multi-Chain Support', icon: Globe, description: 'Support for 10+ blockchains' },
    { name: 'Enterprise Compliance', icon: Shield, description: 'SOC 2, ISO 27001, GDPR, CCPA, MiCA' },
    { name: 'Widget SDK', icon: Zap, description: '5 embeddable widget types' },
    { name: 'Production Ready', icon: TrendingUp, description: 'Live deployment with real data' },
    { name: 'Enterprise Pricing', icon: DollarSign, description: 'Flexible pricing from $0 to custom' },
    { name: '5 Proof Types', icon: Award, description: 'Compliance, Rental, Airdrop, Royalty, Governance' }
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
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-2xl">
            <Trophy className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Competitive Advantage
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              See how Midnight ZKP DApp compares to other Zero-Knowledge solutions
            </p>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-all`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">{feature.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className={`mb-12 rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Feature</th>
                {competitors.map((competitor) => (
                  <th
                    key={competitor.name}
                    className={`px-6 py-4 text-center text-sm font-bold ${
                      competitor.isUs
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {competitor.name}
                    {competitor.isUs && <span className="block text-xs opacity-90 mt-1">🏆 Our Solution</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Multi-Chain Support</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      competitor.isUs ? 'text-purple-600' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {competitor.multiChain}+
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Enterprise Compliance</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {competitor.compliance.length > 0 ? (
                        competitor.compliance.map((cert) => (
                          <span key={cert} className={`text-xs px-2 py-1 rounded-full ${
                            competitor.isUs
                              ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                          }`}>
                            {cert}
                          </span>
                        ))
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Widget SDK</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    {competitor.widgets > 0 ? (
                      <span className={`text-lg font-bold ${
                        competitor.isUs ? 'text-purple-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {competitor.widgets} widgets
                      </span>
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Enterprise Features</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    {competitor.enterprise ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Pricing</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    <span className={`text-sm font-medium ${
                      competitor.isUs ? 'text-purple-600' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {competitor.pricing}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Deployment Status</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    <span className={`text-sm font-medium ${
                      competitor.deployment === 'Production' && competitor.isUs
                        ? 'text-green-600'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {competitor.deployment}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Proof Types</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    <span className={`text-lg font-bold ${
                      competitor.isUs ? 'text-purple-600' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {competitor.proofTypes}
                    </span>
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">API Access</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    {competitor.api ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Interactive Demo</td>
                {competitors.map((competitor) => (
                  <td key={competitor.name} className="px-6 py-4 text-center">
                    {competitor.demo ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          Why We Win
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Globe className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Multi-Chain First</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Support for 10+ blockchains from day one, while competitors are limited to 1-3 chains. Built for the multi-chain future.
            </p>
          </div>
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Enterprise Compliance</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              SOC 2, ISO 27001, GDPR, CCPA, and MiCA ready. The most comprehensive compliance package in the industry.
            </p>
          </div>
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Widget-First Approach</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              5 embeddable widget types with full customization. No other solution offers marketplace-ready widgets.
            </p>
          </div>
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-orange-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-6 h-6 text-orange-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Production Ready</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Live deployment with real XRPL data, not just testnet prototypes. Ready for enterprise adoption today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
