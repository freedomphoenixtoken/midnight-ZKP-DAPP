import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Database, Shield, Globe, Zap, Server, Lock, Code, Users, Building2, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ArchitecturePage() {
  const { theme } = useTheme();

  const layers = [
    {
      name: 'Presentation Layer',
      icon: Code,
      color: 'blue',
      components: ['React Frontend', 'Widget SDK', 'Marketplace Demo', 'Dashboard']
    },
    {
      name: 'API Layer',
      icon: Server,
      color: 'purple',
      components: ['REST API', 'GraphQL API', 'Webhook System', 'Rate Limiting']
    },
    {
      name: 'Business Logic Layer',
      icon: Zap,
      color: 'orange',
      components: ['Proof Generation', 'Proof Verification', 'Circuit Compiler', 'Circuit Optimizer']
    },
    {
      name: 'Blockchain Layer',
      icon: Globe,
      color: 'green',
      components: ['XRPL', 'Ethereum', 'Polygon', 'Solana', '10+ Chains']
    },
    {
      name: 'Data Layer',
      icon: Database,
      color: 'red',
      components: ['Supabase', 'Proof Storage', 'User Data', 'Analytics']
    },
    {
      name: 'Security Layer',
      icon: Shield,
      color: 'indigo',
      components: ['SOC 2', 'ISO 27001', 'Encryption', 'Access Control']
    }
  ];

  const dataFlow = [
    { step: 1, title: 'User Request', description: 'User initiates proof generation via widget', icon: Users },
    { step: 2, title: 'API Gateway', description: 'Request routed to appropriate service', icon: Server },
    { step: 3, title: 'Circuit Execution', description: 'ZK circuit compiled and executed', icon: Zap },
    { step: 4, title: 'Proof Generation', description: 'Groth16 proof generated', icon: Lock },
    { step: 5, title: 'Blockchain Verification', description: 'Proof verified on-chain', icon: Globe },
    { step: 6, title: 'Storage & Indexing', description: 'Proof stored and indexed', icon: Database }
  ];

  const components = [
    {
      category: 'Frontend Components',
      items: [
        { name: 'React 18', description: 'Modern React with hooks and concurrent features' },
        { name: 'TypeScript', description: 'Type-safe development' },
        { name: 'TailwindCSS', description: 'Utility-first CSS framework' },
        { name: 'Lucide Icons', description: 'Beautiful icon library' },
        { name: 'React Router', description: 'Client-side routing' }
      ]
    },
    {
      category: 'Backend Services',
      items: [
        { name: 'Netlify Functions', description: 'Serverless functions for API endpoints' },
        { name: 'Supabase', description: 'PostgreSQL database and auth' },
        { name: 'XRPL Client', description: 'XRPL ledger integration' },
        { name: 'Circuit Compiler', description: 'ZK circuit compilation (simulated)' },
        { name: 'Proof Server', description: 'Groth16 proof generation (simulated)' }
      ]
    },
    {
      category: 'ZK Infrastructure',
      items: [
        { name: 'Groth16', description: 'Proof system for efficient verification' },
        { name: 'Circom', description: 'Circuit description language' },
        { name: 'SnarkJS', description: 'JavaScript ZK proof library' },
        { name: 'Compact', description: 'Compiled circuit format' },
        { name: 'Witness Calculator', description: 'Circuit execution engine' }
      ]
    },
    {
      category: 'Security & Compliance',
      items: [
        { name: 'SOC 2 Type II', description: 'Security and compliance certification' },
        { name: 'ISO 27001', description: 'Information security management' },
        { name: 'GDPR', description: 'EU data protection regulation' },
        { name: 'CCPA', description: 'California privacy law' },
        { name: 'MiCA', description: 'EU crypto regulation' }
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
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900 dark:to-blue-900 p-4 rounded-2xl">
            <Layers className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              System Architecture
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Technical overview of the Midnight ZKP DApp infrastructure
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Layers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6 text-cyan-600" />
          Architecture Layers
        </h2>
        <div className="space-y-4">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div key={index} className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`bg-${layer.color}-100 dark:bg-${layer.color}-900 p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 text-${layer.color}-600 dark:text-${layer.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{layer.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {layer.components.map((component, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-xs font-medium ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Flow */}
      <div className={`mb-12 p-8 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <ArrowRight className="w-6 h-6 text-purple-600" />
          Proof Generation Flow
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataFlow.map((flow, index) => {
            const Icon = flow.icon;
            return (
              <div key={index} className="relative">
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">{flow.step}</span>
                    </div>
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{flow.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{flow.description}</p>
                </div>
                {index < dataFlow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Components */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-green-600" />
          Technical Components
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {components.map((category, index) => (
            <div key={index} className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.items.map((item, i) => (
                  <div key={i} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">{item.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Architecture */}
      <div className={`p-8 rounded-2xl border bg-gradient-to-r from-indigo-600 to-purple-600 text-white`}>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Security Architecture</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-5 h-5" />
              <span className="font-bold">Data Protection</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>AES-256 encryption at rest</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>TLS 1.3 in transit</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Zero-knowledge proofs</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5" />
              <span className="font-bold">Access Control</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Role-based permissions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Multi-factor authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Audit logging</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5" />
              <span className="font-bold">Compliance</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>SOC 2 Type II certified</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>ISO 27001 compliant</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>GDPR/CCPA compliant</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
