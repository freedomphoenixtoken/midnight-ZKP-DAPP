import { useState } from 'react';
import { ShieldCheck, AlertCircle, Loader2, Lock, Sparkles, CheckCircle2, Eye, TrendingUp } from 'lucide-react';

interface RentalTrustScoreProps {
  userAddress: string;
  onVerified: (hash: string, stats: any) => void;
}

export function RentalTrustScore({ userAddress, onVerified }: RentalTrustScoreProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationStep(0);

    // Simulate magic moment with step-by-step animation
    const steps = [
      { text: 'Analyzing rental history...', duration: 800 },
      { text: 'Calculating trust metrics...', duration: 1000 },
      { text: 'Generating zero-knowledge proof...', duration: 1200 },
      { text: 'Encrypting rental data...', duration: 800 },
      { text: 'Creating trust score proof...', duration: 600 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    try {
      const response = await fetch('/api/zk/generate-rental-trust-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress,
          userDid: `did:xrpl:${userAddress}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate proof');
      }

      const data = await response.json();
      onVerified(data.proofHash, data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const steps = [
    { text: 'Analyzing rental history...', icon: TrendingUp },
    { text: 'Calculating trust metrics...', icon: ShieldCheck },
    { text: 'Generating zero-knowledge proof...', icon: Sparkles },
    { text: 'Encrypting rental data...', icon: Lock },
    { text: 'Creating trust score proof...', icon: CheckCircle2 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">ZK-Rental Trust Score</h3>
          <p className="text-sm text-gray-600">Generate your privacy-preserving trust proof</p>
        </div>
      </div>

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-100">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-purple-600 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Your rental history is analyzed locally. Only your trust score is shared, 
            never the individual rental transactions.
          </p>
        </div>
      </div>

      {!isGenerating && !error && (
        <button
          onClick={generateProof}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-lg font-semibold group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Generate Trust Score Proof
          <ShieldCheck className="w-5 h-5" />
        </button>
      )}

      {isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
            <span className="text-lg font-semibold text-gray-900">Calculating Trust Score...</span>
          </div>

          {/* Step-by-step Animation */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCurrentStep = index + 1 === generationStep;
              const isPastStep = index + 1 < generationStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isCurrentStep
                      ? 'bg-purple-50 border-2 border-purple-300'
                      : isPastStep
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isCurrentStep
                      ? 'bg-purple-600 text-white animate-pulse'
                      : isPastStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm ${
                    isCurrentStep
                      ? 'font-semibold text-purple-900'
                      : isPastStep
                      ? 'text-green-700 line-through'
                      : 'text-gray-500'
                  }`}>
                    {step.text}
                  </span>
                  {isCurrentStep && (
                    <div className="flex-1 h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Proof Generation Failed</h4>
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={generateProof}
                className="mt-3 text-sm text-red-700 font-medium hover:text-red-900 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
