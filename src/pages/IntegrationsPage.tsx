import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Code, ExternalLink, BookOpen, Zap, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function IntegrationsPage() {
  const { theme } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const integrations = [
    {
      name: 'OpenSea',
      icon: '🌊',
      description: 'Add ZK verification to NFT listings',
      code: `// OpenSea Widget Integration
import { ComplianceWidget } from '@midnight-zkp/widgets';

<ComplianceWidget 
  userAddress={walletAddress}
  theme="dark"
  compact={true}
  onProofGenerated={(hash) => {
    // Enable purchase after verification
    setCanPurchase(true);
  }}
/>`
    },
    {
      name: 'Rarible',
      icon: '🎨',
      description: 'Verify royalty compliance for creators',
      code: `// Rarible Widget Integration
import { RoyaltyWidget } from '@midnight-zkp/widgets';

<RoyaltyWidget 
  userAddress={walletAddress}
  theme="dark"
  onProofGenerated={(hash) => {
    // Show royalty-compliant badge
    showRoyaltyBadge(hash);
  }}
/>`
    },
    {
      name: 'Blur',
      icon: '⚡',
      description: 'Prove trader reputation anonymously',
      code: `// Blur Widget Integration
import { RentalTrustWidget } from '@midnight-zkp/widgets';

<RentalTrustWidget 
  userAddress={walletAddress}
  theme="dark"
  compact={true}
  onProofGenerated={(hash) => {
    // Enable flash trading
    enableFlashTrading();
  }}
/>`
    },
    {
      name: 'X2Y2',
      icon: '🔷',
      description: 'Governance voting power verification',
      code: `// X2Y2 Widget Integration
import { GovernanceWidget } from '@midnight-zkp/widgets';

<GovernanceWidget 
  userAddress={walletAddress}
  theme="dark"
  onProofGenerated={(hash) => {
    // Enable DAO voting
    enableDAOVoting();
  }}
/>`
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
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 p-4 rounded-2xl">
            <Code className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Marketplace Integrations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              One-click integration for major NFT marketplaces
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          Quick Start
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl mb-2">1️⃣</div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Install SDK</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">npm install @midnight-zkp/widgets</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl mb-2">2️⃣</div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Add Widget</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Copy the integration code</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl mb-2">3️⃣</div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Go Live</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Deploy and start verifying</div>
          </div>
        </div>
      </div>

      {/* Integration Examples */}
      <div className="space-y-6">
        {integrations.map((integration) => (
          <div key={integration.name} className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-all`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl">{integration.icon}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{integration.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{integration.description}</p>
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => copyToClipboard(integration.code, integration.name)}
                className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                {copiedCode === integration.name ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-300" />
                )}
              </button>
              <pre className={`p-4 rounded-xl text-sm overflow-x-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-900'}`}>
                <code className="text-gray-300">{integration.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Chain Support */}
      <div className={`mt-8 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Multi-Chain Support
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-medium text-gray-900 dark:text-white">XRPL</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Native support</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-3xl mb-2">⟠</div>
            <div className="font-medium text-gray-900 dark:text-white">Ethereum</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Via EVM bridge</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-3xl mb-2">◈</div>
            <div className="font-medium text-gray-900 dark:text-white">Polygon</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Via EVM bridge</div>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className={`mt-8 p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Documentation
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">API Reference</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">SDK Documentation</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Integration Guide</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Troubleshooting</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
