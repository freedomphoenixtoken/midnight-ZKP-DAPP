import { useState } from 'react';
import { Vote, AlertCircle, Loader2, Sparkles, CheckCircle2, Eye, Users, Crown } from 'lucide-react';

interface GovernancePowerProofProps {
  userAddress: string;
  onVerified: (hash: string, data: any) => void;
}

export function GovernancePowerProof({ userAddress, onVerified }: GovernancePowerProofProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationStep(0);

    // Simulate magic moment with step-by-step animation
    const steps = [
      { text: 'Analyzing token holdings...', duration: 800 },
      { text: 'Calculating voting power...', duration: 1000 },
      { text: 'Verifying governance rights...', duration: 800 },
      { text: 'Generating zero-knowledge proof...', duration: 1200 },
      { text: 'Creating voting certificate...', duration: 600 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    try {
      const response = await fetch('/api/zk/generate-governance-power-proof', {
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

      const { proofHash, governanceData } = await response.json();
      onVerified(proofHash, governanceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const steps = [
    { text: 'Analyzing token holdings...', icon: Crown },
    { text: 'Calculating voting power...', icon: Users },
    { text: 'Verifying governance rights...', icon: Vote },
    { text: 'Generating zero-knowledge proof...', icon: Sparkles },
    { text: 'Creating voting certificate...', icon: CheckCircle2 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-indigo-100 to-violet-100 p-3 rounded-xl">
          <Vote className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Governance Power Proof</h3>
          <p className="text-sm text-gray-600">Generate your anonymous voting proof</p>
        </div>
      </div>

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4 mb-6 border border-indigo-100">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-indigo-600 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Your token holdings are analyzed locally. Only your voting power is shared, 
            never your exact token count or voting history.
          </p>
        </div>
      </div>

      {!isGenerating && !error && (
        <button
          onClick={generateProof}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-lg font-semibold group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Generate Governance Power Proof
          <Vote className="w-5 h-5" />
        </button>
      )}

      {isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="text-lg font-semibold text-gray-900">Generating Proof...</span>
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
                      ? 'bg-indigo-50 border-2 border-indigo-300'
                      : isPastStep
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isCurrentStep
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : isPastStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm ${
                    isCurrentStep
                      ? 'font-semibold text-indigo-900'
                      : isPastStep
                      ? 'text-green-700 line-through'
                      : 'text-gray-500'
                  }`}>
                    {step.text}
                  </span>
                  {isCurrentStep && (
                    <div className="flex-1 h-2 bg-indigo-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
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
