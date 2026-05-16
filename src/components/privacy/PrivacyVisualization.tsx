import { useState } from 'react';
import { Lock, Eye, ShieldCheck, CheckCircle, AlertTriangle, Info, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface PrivacyVisualizationProps {
  featureName: string;
  protectedData: string[];
  exposedData: string[];
  processSteps: string[];
}

export function PrivacyVisualization({ featureName, protectedData, exposedData, processSteps }: PrivacyVisualizationProps) {
  const { theme } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={`rounded-2xl p-6 border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} mb-6`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
          <ShieldCheck className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">How {featureName} Protects You</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Zero-knowledge proof technology keeps your data private</p>
        </div>
      </div>

      {/* Protected vs Exposed Data */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'} border`}>
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-900 dark:text-green-100">Protected (Never Shared)</span>
          </div>
          <ul className="space-y-2">
            {protectedData.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-green-800 dark:text-green-200">
                <CheckCircle className="w-4 h-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-orange-900/20 border-orange-700' : 'bg-orange-50 border-orange-200'} border`}>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-orange-900 dark:text-orange-100">Shared (Only Proof)</span>
          </div>
          <ul className="space-y-2">
            {exposedData.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-orange-800 dark:text-orange-200">
                <AlertTriangle className="w-4 h-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Process Steps */}
      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-900 dark:text-white">How It Works</span>
        </div>
        <div className="space-y-3">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                activeStep === index
                  ? theme === 'dark'
                    ? 'bg-purple-900/30 border-purple-500'
                    : 'bg-purple-100 border-purple-300'
                  : theme === 'dark'
                  ? 'bg-gray-600 hover:bg-gray-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${activeStep === index ? 'border' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStep >= index
                  ? 'bg-purple-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-500 text-gray-300'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step}</p>
              </div>
              {activeStep === index && (
                <ArrowRight className="w-5 h-5 text-purple-600 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-900 dark:text-blue-100">
          Zero-knowledge proofs use advanced cryptography to verify statements without revealing the underlying data. 
          Your sensitive information stays on your device - only the mathematical proof is shared.
        </p>
      </div>
    </div>
  );
}
