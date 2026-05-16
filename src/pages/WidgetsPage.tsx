import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Gift, Heart, Vote, ArrowLeft, Copy, Check, Code, BookOpen, Zap } from 'lucide-react';
import { ComplianceWidget } from '../widgets/ComplianceWidget';
import { RentalTrustWidget } from '../widgets/RentalTrustWidget';
import { AirdropWidget } from '../widgets/AirdropWidget';
import { RoyaltyWidget } from '../widgets/RoyaltyWidget';
import { GovernanceWidget } from '../widgets/GovernanceWidget';
import { useTheme } from '../contexts/ThemeContext';

export function WidgetsPage() {
  const { theme, toggleTheme } = useTheme();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);

  const copyCode = (code: string, widgetName: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(widgetName);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const widgets = [
    {
      name: 'ComplianceWidget',
      component: ComplianceWidget,
      icon: Shield,
      color: 'blue',
      description: 'Prove KYC/accreditation without revealing identity',
      code: `import { ComplianceWidget } from '@midnight-zkp/widgets';

<ComplianceWidget 
  userAddress="r..."
  theme="light"
  compact={false}
  onProofGenerated={(hash) => console.log(hash)}
/>`
    },
    {
      name: 'RentalTrustWidget',
      component: RentalTrustWidget,
      icon: ShieldCheck,
      color: 'purple',
      description: 'Prove rental reliability without revealing history',
      code: `import { RentalTrustWidget } from '@midnight-zkp/widgets';

<RentalTrustWidget 
  userAddress="r..."
  theme="light"
  compact={false}
  onProofGenerated={(hash) => console.log(hash)}
/>`
    },
    {
      name: 'AirdropWidget',
      component: AirdropWidget,
      icon: Gift,
      color: 'orange',
      description: 'Prove airdrop eligibility without revealing activity',
      code: `import { AirdropWidget } from '@midnight-zkp/widgets';

<AirdropWidget 
  userAddress="r..."
  theme="light"
  compact={false}
  onProofGenerated={(hash) => console.log(hash)}
/>`
    },
    {
      name: 'RoyaltyWidget',
      component: RoyaltyWidget,
      icon: Heart,
      color: 'red',
      description: 'Prove royalty compliance without revealing trades',
      code: `import { RoyaltyWidget } from '@midnight-zkp/widgets';

<RoyaltyWidget 
  userAddress="r..."
  theme="light"
  compact={false}
  onProofGenerated={(hash) => console.log(hash)}
/>`
    },
    {
      name: 'GovernanceWidget',
      component: GovernanceWidget,
      icon: Vote,
      color: 'indigo',
      description: 'Prove governance power without revealing holdings',
      code: `import { GovernanceWidget } from '@midnight-zkp/widgets';

<GovernanceWidget 
  userAddress="r..."
  theme="light"
  compact={false}
  onProofGenerated={(hash) => console.log(hash)}
/>`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 rounded-2xl">
            <Code className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Widget Integration
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Embed our ZK widgets into any NFT marketplace
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <Zap className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </span>
        </button>
      </div>

      {/* Widget Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Select a Widget
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <button
                key={widget.name}
                onClick={() => setSelectedWidget(widget.name)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedWidget === widget.name
                    ? `border-${widget.color}-500 bg-${widget.color}-50 dark:bg-${widget.color}-900/20`
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 text-${widget.color}-600 dark:text-${widget.color}-400`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{widget.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Widget Preview */}
      {selectedWidget && (() => {
        const widget = widgets.find(w => w.name === selectedWidget);
        if (!widget) return null;
        const WidgetComponent = widget.component;

        return (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Live Preview */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Live Preview</h3>
              <div className="p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <WidgetComponent theme={theme} />
              </div>
            </div>

            {/* Integration Code */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Integration Code</h3>
              <div className={`relative p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-900'}`}>
                <button
                  onClick={() => copyCode(widget.code, widget.name)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  {copiedCode === widget.name ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-300" />
                  )}
                </button>
                <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                  <code>{widget.code}</code>
                </pre>
              </div>

              {/* Props Documentation */}
              <div className={`mt-6 p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Props</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-mono text-purple-600 dark:text-purple-400">userAddress</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">- Optional wallet address</span>
                  </div>
                  <div>
                    <span className="font-mono text-purple-600 dark:text-purple-400">theme</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">- "light" or "dark"</span>
                  </div>
                  <div>
                    <span className="font-mono text-purple-600 dark:text-purple-400">compact</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">- Boolean, smaller widget</span>
                  </div>
                  <div>
                    <span className="font-mono text-purple-600 dark:text-purple-400">onProofGenerated</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">- Callback with proof hash</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Use Cases */}
      <div className={`p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-purple-600" />
          Marketplace Integration Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
            <Shield className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">RWA Marketplaces</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use ComplianceWidget to verify KYC/accreditation for real-world asset purchases
            </p>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
            <ShieldCheck className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">NFT Rental Platforms</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use RentalTrustWidget to verify user reliability without revealing history
            </p>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20">
            <Gift className="w-8 h-8 text-orange-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Airdrop Platforms</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use AirdropWidget to verify legitimate users without revealing activity
            </p>
          </div>
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
            <Heart className="w-8 h-8 text-red-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Creator Marketplaces</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use RoyaltyWidget to verify creator-friendly trading without revealing trades
            </p>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 md:col-span-2">
            <Vote className="w-8 h-8 text-indigo-600 mb-2" />
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">DAO Governance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use GovernanceWidget to verify voting power without revealing token holdings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
