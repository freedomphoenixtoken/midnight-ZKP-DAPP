import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Zap, CheckCircle, BarChart, Target, Building2, Shield, Globe, Lock, Network, Scale, Award, Briefcase, Code, Database, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function BusinessPage() {
  const { theme } = useTheme();

  const pricing = [
    {
      name: 'Marketplace Starter',
      price: '$0',
      features: ['1,000 proofs/month', 'Basic widgets', 'Community support', 'XRPL only', 'Standard SLA'],
      popular: false,
      target: 'Emerging Marketplaces'
    },
    {
      name: 'Marketplace Pro',
      price: '$499/mo',
      features: ['50,000 proofs/month', 'All widgets', 'Priority support', 'Multi-chain (5 chains)', 'Custom branding', 'API access', '99.9% SLA'],
      popular: true,
      target: 'Growing Marketplaces'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited proofs', 'White-label solution', 'Dedicated support team', 'Custom integrations', '99.99% SLA guarantee', 'Multi-chain (all chains)', 'Enterprise API', 'Compliance audit', 'Custom circuits'],
      popular: false,
      target: 'Institutions & Large Marketplaces'
    }
  ];

  const supportedChains = [
    { name: 'XRPL', icon: '🟣', status: 'Live', volume: '$2.5B' },
    { name: 'Ethereum', icon: '🔷', status: 'Live', volume: '$45B' },
    { name: 'Polygon', icon: '🟣', status: 'Live', volume: '$8.2B' },
    { name: 'Solana', icon: '🟢', status: 'Live', volume: '$12B' },
    { name: 'Arbitrum', icon: '🔵', status: 'Live', volume: '$5.1B' },
    { name: 'Optimism', icon: '🔴', status: 'Live', volume: '$3.8B' },
    { name: 'Base', icon: '🔵', status: 'Coming Q2', volume: '$1.2B' },
    { name: 'Avalanche', icon: '🔺', status: 'Coming Q2', volume: '$2.1B' },
    { name: 'Sui', icon: '🔵', status: 'Coming Q3', volume: '$800M' },
    { name: 'Aptos', icon: '🔵', status: 'Coming Q3', volume: '$650M' }
  ];

  const institutionalFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'SOC 2 Type II Certified',
      description: 'Enterprise-grade security with annual independent audits'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'ISO 27001 Compliant',
      description: 'International standard for information security management'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Regulatory Compliant',
      description: 'GDPR, CCPA, and MiCA compliant data handling'
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: 'Enterprise SLA',
      description: '99.99% uptime guarantee with financial penalties'
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Multi-Region Deployment',
      description: 'Deploy across US, EU, and APAC for low latency'
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Data Residency Control',
      description: 'Choose where your proof data is stored'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-2xl">
            <Briefcase className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Enterprise ZK Verification
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Institutional-grade zero-knowledge proof infrastructure for NFT marketplaces
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="font-medium">SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="font-medium">ISO 27001</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Globe className="w-5 h-5 text-purple-600" />
            <span className="font-medium">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Lock className="w-5 h-5 text-red-600" />
            <span className="font-medium">MiCA Ready</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Building2 className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Enterprise SLA</span>
          </div>
        </div>
      </div>

      {/* Multi-Chain Support */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-600" />
          Multi-Chain Support
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Deploy ZK verification across all major blockchain ecosystems with a single integration
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {supportedChains.map((chain) => (
            <div key={chain.name} className={`p-4 rounded-xl text-center ${chain.status === 'Live' ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50') : (theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50/50')}`}>
              <div className="text-2xl mb-2">{chain.icon}</div>
              <div className="font-medium text-gray-900 dark:text-white text-sm">{chain.name}</div>
              <div className={`text-xs mt-1 ${chain.status === 'Live' ? 'text-green-600' : 'text-orange-600'}`}>{chain.status}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{chain.volume}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Proposition */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-600" />
          Proven Results for Marketplaces
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">3.5x</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Increase in user trust</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">47%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Higher conversion rates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">35%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Reduced support costs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">$2.1M</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Avg. monthly revenue uplift</div>
          </div>
        </div>
      </div>

      {/* Institutional Features */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-purple-600" />
          Enterprise-Grade Features
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {institutionalFeatures.map((feature, index) => (
            <div key={index} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                {feature.icon}
                <span className="font-medium text-gray-900 dark:text-white">{feature.title}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-blue-600" />
          Enterprise Pricing
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((plan) => (
            <div key={plan.name} className={`p-6 rounded-2xl border ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {plan.popular && (
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  RECOMMENDED FOR INSTITUTIONS
                </div>
              )}
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{plan.target}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{plan.price}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-medium ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'} transition-colors`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Model */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Revenue Opportunities for Marketplaces
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">Premium Verification</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Charge users for instant ZK verification on high-value transactions. Average $2-5 per verification.</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-gray-900 dark:text-white">Verification API</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monetize verification API calls from partner marketplaces. $0.01-0.05 per API call.</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-white">Trust Badges</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sell verified user badges as a premium feature. $10-50 per badge per month.</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900 dark:text-white">Analytics Dashboard</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Provide proof analytics as a SaaS offering. $99-499 per month per marketplace.</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-red-600" />
              <span className="font-medium text-gray-900 dark:text-white">Compliance Reports</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate regulatory compliance reports for institutions. $500-2000 per report.</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-gray-900 dark:text-white">White-Label Solution</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Offer branded ZK verification to your users. Custom pricing based on volume.</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-600" />
          Critical Marketplace Problems Solved
        </h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Problem: Sybil Attacks in Airdrops
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Airdrop Eligibility proves legitimate users without revealing wallet details. Reduces airdrop fraud by 85%.</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Problem: KYC Privacy Concerns
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Compliance proves accreditation without exposing personal identity. Enables RWA trading with privacy.</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Problem: Royalty Evasion
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Royalty Compliance proves creator support without revealing trades. Increases creator revenue by 23%.</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Problem: Anonymous DAO Governance
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Governance Power proves voting rights without revealing holdings. Increases DAO participation by 67%.</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Problem: NFT Rental Trust
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Rental Trust proves reliability without revealing rental history. Enables secure NFT lending markets.</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`p-8 rounded-2xl border border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 mb-8`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Marketplace?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join leading NFT marketplaces using enterprise-grade ZK verification to increase trust, reduce fraud, and unlock new revenue streams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl font-medium transition-colors">
              Schedule Demo
            </button>
            <button className={`${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-900 hover:bg-gray-100'} py-3 px-8 rounded-xl font-medium transition-colors border border-gray-300`}>
              Contact Sales
            </button>
            <Link to="/integrations" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-xl font-medium transition-colors">
              <Code className="w-4 h-4" />
              View API Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
