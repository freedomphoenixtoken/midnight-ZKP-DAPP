import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, Heart, Vote, Gift, Code, CheckCircle, TrendingUp, Users, Star, Globe, Zap, Lock, Clock, Award, Building2, Play, Settings, Copy } from 'lucide-react';
import { ComplianceWidget } from '../widgets/ComplianceWidget';
import { RentalTrustWidget } from '../widgets/RentalTrustWidget';
import { AirdropWidget } from '../widgets/AirdropWidget';
import { RoyaltyWidget } from '../widgets/RoyaltyWidget';
import { GovernanceWidget } from '../widgets/GovernanceWidget';
import { useTheme } from '../contexts/ThemeContext';

export function MarketplaceDemoPage() {
  const { theme } = useTheme();
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [showWidgetConfig, setShowWidgetConfig] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState({
    compact: true,
    showBranding: true,
    customColors: false,
    primaryColor: '#6366f1'
  });

  const nfts = [
    {
      id: 1,
      name: 'Cosmic Ape #1234',
      price: '2.5 XRP',
      image: '🦍',
      category: 'RWA',
      requiresCompliance: true,
      description: 'Rare cosmic ape NFT with real-world asset backing',
      creator: 'Cosmic Studios',
      volume: '45.2K',
      floor: '2.1 XRP',
      owners: '234'
    },
    {
      id: 2,
      name: 'Digital Mansion #5678',
      price: '1.8 XRP',
      image: '🏠',
      category: 'Rental',
      requiresTrust: true,
      description: 'Luxury digital mansion for virtual events and gatherings',
      creator: 'MetaRealty',
      volume: '12.8K',
      floor: '1.5 XRP',
      owners: '156'
    },
    {
      id: 3,
      name: 'Governance Token',
      price: '0.5 XRP',
      image: '🗳️',
      category: 'DAO',
      requiresGovernance: true,
      description: 'DAO governance token with voting rights',
      creator: 'XRPL DAO',
      volume: '89.3K',
      floor: '0.45 XRP',
      owners: '1,234'
    },
    {
      id: 4,
      name: 'Artist Collection #9012',
      price: '1.2 XRP',
      image: '🎨',
      category: 'Creator',
      requiresRoyalty: true,
      description: 'Exclusive digital artwork from renowned artists',
      creator: 'Digital Arts Collective',
      volume: '34.7K',
      floor: '0.9 XRP',
      owners: '445'
    },
    {
      id: 5,
      name: 'Community Badge',
      price: '0.1 XRP',
      image: '🎖️',
      category: 'Airdrop',
      requiresEligibility: true,
      description: 'Exclusive community badge for early supporters',
      creator: 'XRPL Foundation',
      volume: '5.2K',
      floor: '0.08 XRP',
      owners: '2,567'
    },
    {
      id: 6,
      name: 'Treasury Note',
      price: '5.0 XRP',
      image: '💎',
      category: 'RWA',
      requiresCompliance: true,
      description: 'Government-backed treasury note on XRPL',
      creator: 'XRPL Treasury',
      volume: '156.8K',
      floor: '4.8 XRP',
      owners: '89'
    }
  ];

  const marketplaceStats = [
    { label: '24h Volume', value: '24.5K XRP', icon: TrendingUp, color: 'green' },
    { label: 'Active Users', value: '1,234', icon: Users, color: 'blue' },
    { label: 'NFTs Listed', value: '567', icon: Star, color: 'yellow' },
    { label: 'Verification Rate', value: '98.7%', icon: CheckCircle, color: 'green' },
    { label: 'Total Proofs', value: '12,456', icon: Shield, color: 'purple' },
    { label: 'Supported Chains', value: '10', icon: Globe, color: 'blue' }
  ];

  const copyEmbedCode = (widgetName: string) => {
    const code = `<script src="https://cdn.midnight-zkp.com/widget.js"></script>
<midnight-widget type="${widgetName.toLowerCase()}" 
  theme="${theme}" 
  compact="${widgetConfig.compact}"
  primary-color="${widgetConfig.primaryColor}"
  show-branding="${widgetConfig.showBranding}">
</midnight-widget>`;
    navigator.clipboard.writeText(code);
    alert('Embed code copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-2xl">
              <ShoppingCart className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                XRPL Marketplace Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Enterprise-grade ZK widgets in a realistic marketplace environment
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWidgetConfig(!showWidgetConfig)}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Widget Config</span>
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Live Demo</span>
            </button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
            <Award className="w-4 h-4 text-green-600" />
            <span>Enterprise Ready</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span>Sub-100ms Latency</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
            <Globe className="w-4 h-4 text-purple-600" />
            <span>Multi-Chain</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {marketplaceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-all`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget Configuration Panel */}
      {showWidgetConfig && (
        <div className={`mb-8 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Widget Configuration
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgetConfig.compact}
                  onChange={(e) => setWidgetConfig({ ...widgetConfig, compact: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-900 dark:text-white">Compact Mode</span>
              </label>
              <label className="flex items-center gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgetConfig.showBranding}
                  onChange={(e) => setWidgetConfig({ ...widgetConfig, showBranding: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-900 dark:text-white">Show Branding</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgetConfig.customColors}
                  onChange={(e) => setWidgetConfig({ ...widgetConfig, customColors: e.target.checked })}
                  className="w-5 h-5 rounded"
                />
                <span className="text-gray-900 dark:text-white">Custom Colors</span>
              </label>
            </div>
            {widgetConfig.customColors && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Primary Color</label>
                <input
                  type="color"
                  value={widgetConfig.primaryColor}
                  onChange={(e) => setWidgetConfig({ ...widgetConfig, primaryColor: e.target.value })}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* NFT Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className={`group rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            onClick={() => setSelectedNFT(nft.id)}
          >
            <div className={`p-8 text-center text-7xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {nft.image}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  nft.category === 'RWA' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                  nft.category === 'Rental' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                  nft.category === 'DAO' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' :
                  nft.category === 'Creator' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                }`}>
                  {nft.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Star className="w-3 h-3" />
                  <span>{nft.owners} owners</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{nft.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{nft.description}</p>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Price</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{nft.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Volume</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{nft.volume}</div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Widget Integration Demo */}
      {selectedNFT && (() => {
        const nft = nfts.find(n => n.id === selectedNFT);
        if (!nft) return null;

        return (
          <div className={`fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm`} onClick={() => setSelectedNFT(null)}>
            <div className={`max-w-5xl w-full rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className={`text-9xl p-8 rounded-3xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    {nft.image}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        nft.category === 'RWA' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                        nft.category === 'Rental' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                        nft.category === 'DAO' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' :
                        nft.category === 'Creator' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                        'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                      }`}>
                        {nft.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Star className="w-3 h-3" />
                        <span>{nft.owners} owners</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{nft.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{nft.description}</p>
                    <div className="flex items-center gap-6 mb-2">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Price</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{nft.price}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Floor</div>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">{nft.floor}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Volume</div>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">{nft.volume}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Created by {nft.creator}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedNFT(null)} className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  ✕
                </button>
              </div>

              {/* Requirement Badge */}
              <div className={`mb-6 p-4 rounded-xl border ${nft.requiresCompliance ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                nft.requiresTrust ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                nft.requiresGovernance ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                nft.requiresRoyalty ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'}`}>
                <div className="flex items-center gap-3">
                  {nft.requiresCompliance && <Shield className="w-5 h-5 text-blue-600" />}
                  {nft.requiresTrust && <Shield className="w-5 h-5 text-purple-600" />}
                  {nft.requiresGovernance && <Vote className="w-5 h-5 text-indigo-600" />}
                  {nft.requiresRoyalty && <Heart className="w-5 h-5 text-red-600" />}
                  {nft.requiresEligibility && <Gift className="w-5 h-5 text-orange-600" />}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {nft.requiresCompliance && 'This is a Real World Asset. KYC/Compliance verification required for institutional compliance.'}
                    {nft.requiresTrust && 'This is a rental NFT. Trust score verification required to ensure reliability.'}
                    {nft.requiresGovernance && 'This is a DAO governance token. Voting power verification required for participation.'}
                    {nft.requiresRoyalty && 'This is a creator NFT. Royalty compliance verification required to support creators.'}
                    {nft.requiresEligibility && 'This is an airdrop. Eligibility verification required to prevent sybil attacks.'}
                  </span>
                </div>
              </div>

              {/* Widget Integration */}
              <div className={`mb-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-600" />
                    ZK Widget Integration
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyEmbedCode(nft.requiresCompliance ? 'ComplianceWidget' : nft.requiresTrust ? 'RentalTrustWidget' : nft.requiresGovernance ? 'GovernanceWidget' : nft.requiresRoyalty ? 'RoyaltyWidget' : 'AirdropWidget')}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Embed Code
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Complete the verification below to purchase this NFT. Your data remains private through zero-knowledge proofs.
                </p>
                
                {nft.requiresCompliance && <ComplianceWidget theme={theme} compact={widgetConfig.compact} />}
                {nft.requiresTrust && <RentalTrustWidget theme={theme} compact={widgetConfig.compact} />}
                {nft.requiresGovernance && <GovernanceWidget theme={theme} compact={widgetConfig.compact} />}
                {nft.requiresRoyalty && <RoyaltyWidget theme={theme} compact={widgetConfig.compact} />}
                {nft.requiresEligibility && <AirdropWidget theme={theme} compact={widgetConfig.compact} />}
              </div>

              {/* Purchase Button */}
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg">
                <ShoppingCart className="w-5 h-5" />
                Purchase Now
              </button>

              {/* Security Notice */}
              <div className={`mt-6 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">Privacy Guaranteed</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Your personal data never leaves your device. Only a cryptographic proof is shared.
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>~2s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Integration Guide */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-purple-600" />
          Enterprise Integration Guide
        </h2>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. Select NFT</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Browse and select an NFT from the marketplace</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'}`}>
              <Code className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Verify with ZK</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete verification using the embedded ZK widget</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'}`}>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Purchase</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete purchase with your verified credentials</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-orange-900' : 'bg-orange-100'}`}>
              <Building2 className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">4. Scale</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Deploy to production with enterprise support</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`grid md:grid-cols-3 gap-6 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">&lt;100ms</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Proof Generation Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">99.99%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Verification Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Supported Blockchains</div>
          </div>
        </div>
      </div>
    </div>
  );
}
