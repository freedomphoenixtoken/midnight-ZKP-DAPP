import { useState, useEffect } from 'react';
import { Lock, Shield, Eye, EyeOff, Database, Server, Smartphone } from 'lucide-react';

export function DataFlowVisualization({ featureName }: { featureName: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const [dataParticles, setDataParticles] = useState<Array<{ id: number; x: number; y: number; phase: 'protected' | 'exposed' }>>([]);

  useEffect(() => {
    // Generate animated data particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 20 + (i * 10),
      y: 50,
      phase: 'protected' as const
    }));
    setDataParticles(particles);

    // Animate through the flow
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      title: 'User Device',
      icon: Smartphone,
      description: 'Your data stays here',
      color: 'blue'
    },
    {
      title: 'ZK Circuit',
      icon: Shield,
      description: 'Privacy-preserving computation',
      color: 'purple'
    },
    {
      title: 'Proof Generation',
      icon: Lock,
      description: 'Mathematical proof created',
      color: 'green'
    },
    {
      title: 'Network',
      icon: Server,
      description: 'Only proof transmitted',
      color: 'orange'
    },
    {
      title: 'Verifier',
      icon: Database,
      description: 'Proof verified, data hidden',
      color: 'pink'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 border border-purple-300 mb-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Data Flow Visualization</h3>
          <p className="text-sm text-purple-200">Watch how {featureName} protects your data</p>
        </div>
      </div>

      {/* Animated Data Flow */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isPast = index < activeStep;

            const colorClasses = {
              blue: 'from-blue-500 to-cyan-500',
              purple: 'from-purple-500 to-pink-500',
              green: 'from-green-500 to-emerald-500',
              orange: 'from-orange-500 to-yellow-500',
              pink: 'from-pink-500 to-rose-500'
            };

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`p-4 rounded-xl transition-all duration-500 ${
                    isActive
                      ? `bg-gradient-to-r ${colorClasses[step.color as keyof typeof colorClasses]} shadow-lg shadow-purple-500/50 scale-110`
                      : isPast
                      ? 'bg-green-600 shadow-lg'
                      : 'bg-slate-700'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive || isPast ? 'text-white' : 'text-slate-400'}`} />
                </div>
                <div className="mt-3 text-center">
                  <div className={`text-xs font-semibold ${
                    isActive ? 'text-purple-300' : isPast ? 'text-green-400' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-[10px] ${
                    isActive ? 'text-purple-400' : isPast ? 'text-green-500' : 'text-slate-500'
                  }`}>
                    {step.description}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[20%] right-[20%] h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated Data Particles */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-3">
          <EyeOff className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-semibold text-purple-300">Protected Data Flow</span>
        </div>
        <div className="relative h-24">
          {dataParticles.map((particle, index) => {
            const progress = (activeStep / 4) * 100;
            const x = 10 + (progress * 0.8) + (index * 8);
            const opacity = 0.3 + (Math.sin(Date.now() / 500 + index) * 0.3);

            return (
              <div
                key={particle.id}
                className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50"
                style={{
                  left: `${x}%`,
                  top: `${particle.y + Math.sin(Date.now() / 300 + index) * 10}%`,
                  opacity,
                  transition: 'all 0.5s ease-in-out'
                }}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400">Data Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400">ZK Proof Generated</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-pink-400">Only Proof Visible</span>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Badge */}
      <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/50">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 p-2 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-green-400">Privacy Guaranteed</div>
            <div className="text-xs text-green-300">
              Your data never leaves your device. Only mathematical proof is shared.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
