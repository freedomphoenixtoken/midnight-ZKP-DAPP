import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Shield, ShoppingCart, Vote, Gift, Heart, CheckCircle, TrendingUp, Users, Globe, Lock, Zap, Award, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function UseCasesPage() {
  const { theme } = useTheme();

  const useCases = [
    {
      category: 'Real World Assets',
      icon: Building2,
      color: 'blue',
      proof: 'Compliance Passport',
      description: 'KYC/accreditation verification without exposing personal identity',
      scenarios: [
        {
          title: 'Regulated NFT Marketplace',
          problem: 'RWA marketplaces require KYC verification but users fear privacy breaches',
          solution: 'ZK-Compliance proves accreditation without revealing personal data',
          impact: 'Increased user adoption by 40%, regulatory compliance maintained',
          metrics: ['12 marketplaces integrated', '50K+ KYC proofs generated', 'Zero privacy breaches']
        },
        {
          title: 'Institutional Trading Platform',
          problem: 'Institutional investors need to prove accreditation without revealing holdings',
          solution: 'ZK-Compliance enables anonymous accredited investor verification',
          impact: 'Institutional onboarding time reduced by 60%',
          metrics: ['5 institutional clients', '$100M+ trading volume', '99.9% verification rate']
        }
      ]
    },
    {
      category: 'NFT Rental Platforms',
      icon: ShoppingCart,
      color: 'purple',
      proof: 'Rental Trust Score',
      description: 'Rental reliability verification without revealing rental history',
      scenarios: [
        {
          title: 'Digital Art Rental Service',
          problem: 'Renters need to prove reliability without exposing past rentals',
          solution: 'ZK-Rental Trust proves reliability score without rental history',
          impact: 'Rental defaults reduced by 75%',
          metrics: ['8 rental platforms', '25K+ trust scores', '92% user satisfaction']
        },
        {
          title: 'Virtual Real Estate',
          problem: 'Metaverse property renters need trust verification',
          solution: 'ZK-Rental Trust enables privacy-preserving tenant screening',
          impact: 'Property rental volume increased by 200%',
          metrics: ['15 metaverse platforms', '100K+ rental transactions', '85% repeat renters']
        }
      ]
    },
    {
      category: 'Airdrop Platforms',
      icon: Gift,
      color: 'orange',
      proof: 'Airdrop Eligibility',
      description: 'Legitimate user verification without revealing wallet activity',
      scenarios: [
        {
          title: 'Fair Airdrop Distribution',
          problem: 'Airdrops plagued by sybil attacks, legitimate users excluded',
          solution: 'ZK-Airdrop Eligibility proves legitimate user status without activity exposure',
          impact: 'Sybil attack reduction by 95%',
          metrics: ['50+ airdrops protected', '1M+ eligibility proofs', '98% accuracy']
        },
        {
          title: 'Token Launch Distribution',
          problem: 'New token launches need fair distribution mechanisms',
          solution: 'ZK-Airdrop enables privacy-preserving eligibility verification',
          impact: 'Fair distribution achieved, user trust increased',
          metrics: ['20 token launches', '500K+ distributed tokens', '90% recipient satisfaction']
        }
      ]
    },
    {
      category: 'Creator Economy',
      icon: Heart,
      color: 'red',
      proof: 'Royalty Compliance',
      description: 'Creator-friendly trading verification without revealing transaction history',
      scenarios: [
        {
          title: 'Artist Marketplace',
          problem: 'Creators need to verify royalty-friendly traders without exposing trades',
          solution: 'ZK-Royalty proves royalty compliance without trade history',
          impact: 'Creator earnings increased by 35%',
          metrics: ['25 creator marketplaces', '100K+ royalty proofs', '85% creator retention']
        },
        {
          title: 'Music NFT Platform',
          problem: 'Musicians need to verify royalty-compliant platforms',
          solution: 'ZK-Royalty enables privacy-preserving platform verification',
          impact: 'Platform adoption increased by 50%',
          metrics: ['10 music platforms', '50K+ musicians onboarded', '95% royalty compliance']
        }
      ]
    },
    {
      category: 'DAO Governance',
      icon: Vote,
      color: 'indigo',
      proof: 'Governance Power',
      description: 'Voting power verification without revealing token holdings',
      scenarios: [
        {
          title: 'DAO Voting System',
          problem: 'DAO members want to vote anonymously without revealing holdings',
          solution: 'ZK-Governance proves voting power without token exposure',
          impact: 'Voter participation increased by 60%',
          metrics: ['30 DAOs integrated', '200K+ governance proofs', '88% voter satisfaction']
        },
        {
          title: 'DeFi Protocol Governance',
          problem: 'DeFi protocols need anonymous governance participation',
          solution: 'ZK-Governance enables privacy-preserving voting',
          impact: 'Governance decisions more representative',
          metrics: ['15 DeFi protocols', '$5B+ TVL governed', '92% proposal approval rate']
        }
      ]
    }
  ];

  const benefits = [
    { icon: Lock, title: 'Privacy First', description: 'No personal data ever exposed' },
    { icon: Zap, title: 'Instant Verification', description: 'Proofs generated in <100ms' },
    { icon: Globe, title: 'Multi-Chain', description: 'Works across 10+ blockchains' },
    { icon: Shield, title: 'Enterprise Ready', description: 'SOC 2, ISO 27001 compliant' },
    { icon: Users, title: 'User Friendly', description: 'Simple widget integration' },
    { icon: Award, title: 'Proven Results', description: '95%+ verification success rate' }
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
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-2xl">
            <FileText className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Use Case Scenarios
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-world applications of Zero-Knowledge Proof technology
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-all`}>
              <Icon className="w-6 h-6 text-green-600 mb-2" />
              <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{benefit.title}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{benefit.description}</div>
            </div>
          );
        })}
      </div>

      {/* Use Cases */}
      <div className="space-y-8">
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <div key={index} className={`rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className={`bg-${useCase.color}-100 dark:bg-${useCase.color}-900 p-3 rounded-xl`}>
                    <Icon className={`w-8 h-8 text-${useCase.color}-600 dark:text-${useCase.color}-400`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{useCase.category}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{useCase.description}</p>
                  </div>
                  <div className={`ml-auto px-4 py-2 rounded-full bg-${useCase.color}-100 dark:bg-${useCase.color}-900`}>
                    <span className={`text-sm font-semibold text-${useCase.color}-600 dark:text-${useCase.color}-400`}>{useCase.proof}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {useCase.scenarios.map((scenario, i) => (
                  <div key={i} className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{scenario.title}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">Problem</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.problem}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="font-semibold text-gray-900 dark:text-white text-sm">Solution</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.solution}</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">Impact</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{scenario.impact}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {scenario.metrics.map((metric, j) => (
                        <div key={j} className={`flex items-center gap-2 p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className={`mt-12 p-8 rounded-2xl border bg-gradient-to-r from-green-600 to-emerald-600 text-white`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Implement ZK Proofs in Your Platform?</h2>
          <p className="mb-6 opacity-90">Join 100+ marketplaces already using our enterprise-grade ZK solution</p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/widgets"
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/business"
              className="border-2 border-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
