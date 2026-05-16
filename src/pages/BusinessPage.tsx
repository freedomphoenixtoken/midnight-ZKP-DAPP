import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, Users, Zap, CheckCircle, BarChart, Target } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function BusinessPage() {
  const { theme } = useTheme();

  const pricing = [
    {
      name: 'Starter',
      price: '$0',
      features: ['1,000 proofs/month', 'Basic widgets', 'Community support', 'XRPL only'],
      popular: false
    },
    {
      name: 'Pro',
      price: '$299/mo',
      features: ['10,000 proofs/month', 'All widgets', 'Priority support', 'Multi-chain', 'Custom branding'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited proofs', 'White-label solution', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-2xl">
            <DollarSign className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Business Model
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              How marketplaces can monetize ZK verification
            </p>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-green-600" />
          Why Integrate ZK Verification?
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Increase in user trust</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Higher conversion rates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">25%</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Reduced support costs</div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart className="w-6 h-6 text-blue-600" />
          Pricing Plans
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((plan) => (
            <div key={plan.name} className={`p-6 rounded-2xl border ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {plan.popular && (
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
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
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Model */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          Revenue Model for Marketplaces
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">Premium Verification</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Charge users for instant ZK verification on high-value transactions</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-gray-900 dark:text-white">Verification API</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monetize verification API calls from partner marketplaces</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-white">Trust Badges</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sell verified user badges as a premium feature</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900 dark:text-white">Analytics Dashboard</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Provide proof analytics as a SaaS offering</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-600" />
          Real Marketplace Problems Solved
        </h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Problem: Sybil Attacks in Airdrops</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Airdrop Eligibility proves legitimate users without revealing wallet details</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Problem: KYC Privacy Concerns</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Compliance proves accreditation without exposing personal identity</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Problem: Royalty Evasion</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Royalty Compliance proves creator support without revealing trades</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Problem: Anonymous DAO Governance</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Governance Power proves voting rights without revealing holdings</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Problem: NFT Rental Trust</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solution: ZK-Rental Trust proves reliability without revealing rental history</div>
          </div>
        </div>
      </div>
    </div>
  );
}
