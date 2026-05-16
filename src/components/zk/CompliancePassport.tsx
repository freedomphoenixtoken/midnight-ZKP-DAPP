import { useState } from 'react';
import { Shield, AlertCircle, Loader2, Lock, Sparkles, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';

interface CompliancePassportProps {
  userAddress: string;
  onVerified: (hash: string) => void;
}

export function CompliancePassport({ userAddress, onVerified }: CompliancePassportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationStep(0);

    // Simulate magic moment with step-by-step animation
    const steps = [
      { text: 'Initializing secure environment...', duration: 800 },
      { text: 'Encrypting personal data...', duration: 1000 },
      { text: 'Generating zero-knowledge proof...', duration: 1200 },
      { text: 'Verifying cryptographic signature...', duration: 800 },
      { text: 'Creating proof hash...', duration: 600 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    try {
      const response = await fetch('/api/zk/generate-compliance-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress,
          userDid: `did:xrpl:${userAddress}`,
          kycStatus: true,
          accreditationLevel: 2
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate proof');
      }

      const { proofHash } = await response.json();
      onVerified(proofHash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const steps = [
    { text: 'Initializing secure environment...', icon: Lock },
    { text: 'Encrypting personal data...', icon: Shield },
    { text: 'Generating zero-knowledge proof...', icon: Sparkles },
    { text: 'Verifying cryptographic signature...', icon: ShieldCheck },
    { text: 'Creating proof hash...', icon: CheckCircle2 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-xl">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">ZK-Compliance Passport</h3>
          <p className="text-sm text-gray-600">Generate your privacy-preserving proof</p>
        </div>
      </div>

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-purple-600 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Your personal data is encrypted locally. Only a mathematical proof is shared, 
            never your actual information.
          </p>
        </div>
      </div>

      {!isGenerating && !error && (
        <button
          onClick={generateProof}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-lg font-semibold group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Generate Compliance Proof
          <Shield className="w-5 h-5" />
        </button>
      )}

      {isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
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
                      ? 'bg-blue-50 border-2 border-blue-300'
                      : isPastStep
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isCurrentStep
                      ? 'bg-blue-600 text-white animate-pulse'
                      : isPastStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm ${
                    isCurrentStep
                      ? 'font-semibold text-blue-900'
                      : isPastStep
                      ? 'text-green-700 line-through'
                      : 'text-gray-500'
                  }`}>
                    {step.text}
                  </span>
                  {isCurrentStep && (
                    <div className="flex-1 h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
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
