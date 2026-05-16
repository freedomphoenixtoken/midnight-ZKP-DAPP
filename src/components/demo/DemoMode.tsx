import { useState } from 'react';
import { Play, RefreshCw, Zap, Sparkles, CheckCircle2, ArrowRight, Shield, Lock } from 'lucide-react';

interface DemoModeProps {
  featureName: string;
  onStartDemo: () => void;
  isDemoRunning: boolean;
}

export function DemoMode({ featureName, onStartDemo, isDemoRunning }: DemoModeProps) {
  const [demoStep, setDemoStep] = useState(0);

  const demoSteps = [
    {
      title: 'Data Collection',
      description: 'Simulating wallet data retrieval from XRPL...',
      icon: Lock,
      color: 'blue'
    },
    {
      title: 'Privacy Analysis',
      description: 'Analyzing data for zero-knowledge proof generation...',
      icon: Shield,
      color: 'purple'
    },
    {
      title: 'ZK Circuit Execution',
      description: 'Executing zero-knowledge circuit locally on device...',
      icon: Zap,
      color: 'yellow'
    },
    {
      title: 'Proof Generation',
      description: 'Generating cryptographic proof without revealing data...',
      icon: Sparkles,
      color: 'pink'
    },
    {
      title: 'Verification',
      description: 'Proof verified successfully - data remains private!',
      icon: CheckCircle2,
      color: 'green'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-indigo-200 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
          <Play className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Interactive Demo Mode</h3>
          <p className="text-sm text-gray-600">Experience {featureName} without a wallet</p>
        </div>
      </div>

      {!isDemoRunning && demoStep === 0 && (
        <button
          onClick={() => {
            setDemoStep(1);
            onStartDemo();
            // Simulate demo progression
            let currentStep = 1;
            const interval = setInterval(() => {
              if (currentStep < demoSteps.length) {
                setDemoStep(currentStep);
                currentStep++;
              } else {
                clearInterval(interval);
                setTimeout(() => setDemoStep(0), 3000);
              }
            }, 2000);
          }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg font-semibold group"
        >
          <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Start Demo
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {isDemoRunning && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="text-lg font-semibold text-gray-900">Demo Running...</span>
          </div>

          <div className="space-y-3">
            {demoSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index + 1 === demoStep;
              const isPast = index + 1 < demoStep;

              const colorClasses = {
                blue: 'bg-blue-500',
                purple: 'bg-purple-500',
                yellow: 'bg-yellow-500',
                pink: 'bg-pink-500',
                green: 'bg-green-500'
              };

              const borderClasses = {
                blue: 'border-blue-300',
                purple: 'border-purple-300',
                yellow: 'border-yellow-300',
                pink: 'border-pink-300',
                green: 'border-green-300'
              };

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    isActive
                      ? `bg-white border-2 ${borderClasses[step.color as keyof typeof borderClasses]} shadow-lg scale-105`
                      : isPast
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-white/50 border border-gray-200 opacity-50'
                  }`}
                >
                  <div className={`p-3 rounded-lg ${
                    isActive
                      ? `${colorClasses[step.color as keyof typeof colorClasses]} text-white animate-pulse`
                      : isPast
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      isActive ? 'text-gray-900' : isPast ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm ${
                      isActive ? 'text-gray-700' : isPast ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {isPast && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {isActive && (
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${colorClasses[step.color as keyof typeof colorClasses]} rounded-full animate-[progress_2s_ease-in-out_infinite]`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {demoStep === demoSteps.length && !isDemoRunning && (
        <div className="bg-green-100 border-2 border-green-300 rounded-xl p-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h4 className="font-bold text-green-900 text-lg mb-2">Demo Complete!</h4>
          <p className="text-sm text-green-700 mb-4">
            {featureName} proof generated successfully with zero-knowledge privacy protection.
          </p>
          <button
            onClick={() => setDemoStep(0)}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Run Demo Again
          </button>
        </div>
      )}
    </div>
  );
}
