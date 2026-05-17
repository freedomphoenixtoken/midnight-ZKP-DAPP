import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Code, ExternalLink, Zap, Globe, Shield, Database, Server, Key, Terminal, FileText, Building2, Clock, AlertCircle } from 'lucide-react';
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
      description: 'Add ZK verification to NFT listings for RWA compliance',
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
      description: 'Verify royalty compliance for creators and traders',
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
      description: 'Prove trader reputation anonymously for flash trading',
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
      description: 'Governance voting power verification for DAO participation',
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

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/zk/generate-compliance-proof',
      description: 'Generate ZK compliance proof for RWA purchases',
      code: `POST /api/zk/generate-compliance-proof
Content-Type: application/json

{
  "userAddress": "rL... (XRPL address)",
  "userDid": "did:xrpl:rL...",
  "kycStatus": true,
  "accreditationLevel": 2
}

Response:
{
  "proofHash": "0x123...",
  "circuitType": "compliance_passport",
  "publicInputs": {
    "commitment": "0xabc...",
    "nullifier": "0xdef...",
    "timestamp": 1715904000
  },
  "proof": {
    "pi_a": ["0x1", "0x2"],
    "pi_b": [["0x3", "0x4"], ["0x5", "0x6"]],
    "pi_c": ["0x7", "0x8"],
    "protocol": "groth16"
  }
}`
    },
    {
      method: 'POST',
      endpoint: '/api/zk/verify-proof',
      description: 'Verify any ZK proof using cryptographic validation',
      code: `POST /api/zk/verify-proof
Content-Type: application/json

{
  "proofHash": "0x123...",
  "circuitType": "compliance_passport"
}

Response:
{
  "valid": true,
  "circuitType": "compliance_passport",
  "verifiedAt": 1715904000,
  "expiresAt": 1718505600
}`
    }
  ];

  const supportedChains = [
    { name: 'XRPL', icon: '🟣', status: 'Native', volume: '$2.5B' },
    { name: 'Ethereum', icon: '🔷', status: 'Live', volume: '$45B' },
    { name: 'Polygon', icon: '🟣', status: 'Live', volume: '$8.2B' },
    { name: 'Solana', icon: '🟢', status: 'Live', volume: '$12B' },
    { name: 'Arbitrum', icon: '🔵', status: 'Live', volume: '$5.1B' },
    { name: 'Optimism', icon: '🔴', status: 'Live', volume: '$3.8B' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
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
              Developer API & Integrations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Enterprise-grade API for seamless marketplace integration across all chains
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="font-medium">99.99% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Database className="w-5 h-5 text-green-600" />
            <span className="font-medium">Sub-100ms Latency</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Server className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Multi-Region Deployment</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Key className="w-5 h-5 text-orange-600" />
            <span className="font-medium">Enterprise API Keys</span>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          Quick Start - 3 Steps to Production
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl mb-2">1️⃣</div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Get API Key</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Sign up for enterprise access</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl mb-2">2️⃣</div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Integrate SDK</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">npm install @midnight-zkp/widgets</div>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-2xl mb-2">3️⃣</div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">Go Live</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Deploy with enterprise support</div>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-600" />
          REST API Endpoints
        </h3>
        <div className="space-y-6">
          {apiEndpoints.map((api, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${api.method === 'POST' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                  {api.method}
                </span>
                <code className="text-sm text-gray-900 dark:text-white">{api.endpoint}</code>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{api.description}</p>
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(api.code, `api-${index}`)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors z-10"
                >
                  {copiedCode === `api-${index}` ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
                <pre className={`p-4 rounded-xl text-sm overflow-x-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-900'}`}>
                  <code className="text-gray-300">{api.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Examples */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-purple-600" />
          Marketplace Widget Integrations
        </h3>
        <div className="space-y-6">
          {integrations.map((integration) => (
            <div key={integration.name} className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-all`}>
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
      </div>

      {/* Multi-Chain Support */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Multi-Chain Support
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Single API integration works across all major blockchain ecosystems
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {supportedChains.map((chain) => (
            <div key={chain.name} className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-3xl mb-2">{chain.icon}</div>
              <div className="font-medium text-gray-900 dark:text-white">{chain.name}</div>
              <div className="text-xs text-green-600 mb-1">{chain.status}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{chain.volume}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Features */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-8`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Enterprise API Features
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium text-gray-900 dark:text-white">Rate Limiting</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Configurable rate limits from 1K to 10M requests/minute</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2 text-green-600">
              <Database className="w-5 h-5" />
              <span className="font-medium text-gray-900 dark:text-white">Webhooks</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time webhook notifications for proof events</p>
          </div>
          <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2 text-purple-600">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium text-gray-900 dark:text-white">Analytics</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Detailed usage analytics and proof verification metrics</p>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-600" />
          Documentation & Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Complete API Reference</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">SDK Documentation</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Enterprise Integration Guide</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Security Best Practices</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Multi-Chain Configuration</span>
          </Link>
          <Link to="#" className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}>
            <ExternalLink className="w-5 h-5 text-blue-600" />
            <span className="text-gray-900 dark:text-white">Troubleshooting Guide</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
