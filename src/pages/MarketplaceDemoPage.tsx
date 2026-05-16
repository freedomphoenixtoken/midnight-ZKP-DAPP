import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, Heart, Vote, Gift, Code, CheckCircle, TrendingUp, Users, Star } from 'lucide-react';
import { ComplianceWidget } from '../widgets/ComplianceWidget';
import { RentalTrustWidget } from '../widgets/RentalTrustWidget';
import { AirdropWidget } from '../widgets/AirdropWidget';
import { RoyaltyWidget } from '../widgets/RoyaltyWidget';
import { GovernanceWidget } from '../widgets/GovernanceWidget';
import { useTheme } from '../contexts/ThemeContext';

export function MarketplaceDemoPage() {
  const { theme } = useTheme();
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);

  const nfts = [
    {
      id: 1,
      name: 'Cosmic Ape #1234',
      price: '2.5 XRP',
      image: '🦍',
      category: 'RWA',
      requiresCompliance: true
    },
    {
      id: 2,
      name: 'Digital Mansion #5678',
      price: '1.8 XRP',
      image: '🏠',
      category: 'Rental',
      requiresTrust: true
    },
    {
      id: 3,
      name: 'Governance Token',
      price: '0.5 XRP',
      image: '🗳️',
      category: 'DAO',
      requiresGovernance: true
    },
    {
      id: 4,
      name: 'Artist Collection #9012',
      price: '1.2 XRP',
      image: '🎨',
      category: 'Creator',
      requiresRoyalty: true
    },
    {
      id: 5,
      name: 'Community Badge',
      price: '0.1 XRP',
      image: '🎖️',
      category: 'Airdrop',
      requiresEligibility: true
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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-2xl">
            <ShoppingCart className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Demo Marketplace
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              See ZK widgets in action in a realistic marketplace
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">24.5K</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Volume (XRP)</span>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">1,234</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Active Users</span>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">567</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">NFTs Listed</span>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">98.7%</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Verification Rate</span>
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            className={`group rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
            onClick={() => setSelectedNFT(nft.id)}
          >
            <div className={`p-6 text-center text-6xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {nft.image}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  nft.category === 'RWA' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                  nft.category === 'Rental' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                  nft.category === 'DAO' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400' :
                  nft.category === 'Creator' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                }`}>
                  {nft.category}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{nft.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{nft.price}</span>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Widget Integration Demo */}
      {selectedNFT && (() => {
        const nft = nfts.find(n => n.id === selectedNFT);
        if (!nft) return null;

        return (
          <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in`} onClick={() => setSelectedNFT(null)}>
            <div className={`max-w-4xl w-full rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`text-8xl p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    {nft.image}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{nft.name}</h2>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{nft.price}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedNFT(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  ✕
                </button>
              </div>

              {/* Requirement Badge */}
              <div className={`mb-6 p-4 rounded-xl ${nft.requiresCompliance ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                nft.requiresTrust ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' :
                nft.requiresGovernance ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' :
                nft.requiresRoyalty ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'} border`}>
                <div className="flex items-center gap-3">
                  {nft.requiresCompliance && <Shield className="w-5 h-5 text-blue-600" />}
                  {nft.requiresTrust && <Shield className="w-5 h-5 text-purple-600" />}
                  {nft.requiresGovernance && <Vote className="w-5 h-5 text-indigo-600" />}
                  {nft.requiresRoyalty && <Heart className="w-5 h-5 text-red-600" />}
                  {nft.requiresEligibility && <Gift className="w-5 h-5 text-orange-600" />}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {nft.requiresCompliance && 'This is a Real World Asset. KYC/Compliance verification required.'}
                    {nft.requiresTrust && 'This is a rental NFT. Trust score verification required.'}
                    {nft.requiresGovernance && 'This is a DAO governance token. Voting power verification required.'}
                    {nft.requiresRoyalty && 'This is a creator NFT. Royalty compliance verification required.'}
                    {nft.requiresEligibility && 'This is an airdrop. Eligibility verification required.'}
                  </span>
                </div>
              </div>

              {/* Widget Integration */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-purple-600" />
                  ZK Widget Integration
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Complete the verification below to purchase this NFT. Your data remains private.
                </p>
                
                {nft.requiresCompliance && <ComplianceWidget theme={theme} compact={true} />}
                {nft.requiresTrust && <RentalTrustWidget theme={theme} compact={true} />}
                {nft.requiresGovernance && <GovernanceWidget theme={theme} compact={true} />}
                {nft.requiresRoyalty && <RoyaltyWidget theme={theme} compact={true} />}
                {nft.requiresEligibility && <AirdropWidget theme={theme} compact={true} />}
              </div>

              {/* Purchase Button */}
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Purchase Now
              </button>
            </div>
          </div>
        );
      })()}

      {/* Integration Guide */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Code className="w-6 h-6 text-purple-600" />
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
}
