import { useState } from 'react';
import { Heart, AlertCircle, Loader2, Sparkles, CheckCircle2, Eye, TrendingUp, Coins, Twitter, Link as LinkIcon } from 'lucide-react';

interface RoyaltyComplianceProofProps {
  userAddress: string;
  onVerified: (hash: string, data: any) => void;
  proofHash?: string;
}

export function RoyaltyComplianceProof({ userAddress, onVerified, proofHash }: RoyaltyComplianceProofProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);

  const shareOnTwitter = () => {
    if (!proofHash) return;
    const text = `I just generated a ZK-Royalty Compliance proof without revealing my transaction details! 🔐 Creator-friendly trading with privacy. #ZeroKnowledge #MidnightNetwork #NFTs`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyProofHash = () => {
    if (!proofHash) return;
    navigator.clipboard.writeText(proofHash);
  };

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);
    setGenerationStep(0);

    // Simulate magic moment with step-by-step animation
    const steps = [
      { text: 'Analyzing transaction history...', duration: 800 },
      { text: 'Calculating royalty payments...', duration: 1000 },
      { text: 'Verifying creator support...', duration: 800 },
      { text: 'Generating zero-knowledge proof...', duration: 1200 },
      { text: 'Creating compliance certificate...', duration: 600 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    try {
      const response = await fetch('/api/zk/generate-royalty-compliance-proof', {
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

      const { proofHash, complianceData } = await response.json();
      onVerified(proofHash, complianceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const steps = [
    { text: 'Analyzing transaction history...', icon: TrendingUp },
    { text: 'Calculating royalty payments...', icon: Coins },
    { text: 'Verifying creator support...', icon: Heart },
    { text: 'Generating zero-knowledge proof...', icon: Sparkles },
    { text: 'Creating compliance certificate...', icon: CheckCircle2 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-red-100 to-pink-100 p-3 rounded-xl">
          <Heart className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Royalty Compliance Proof</h3>
          <p className="text-sm text-gray-600">Generate your creator support proof</p>
        </div>
      </div>

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 mb-6 border border-red-100">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Your transaction history is analyzed locally. Only your compliance status is shared, 
            never your transaction amounts or counterparties.
          </p>
        </div>
      </div>

      {!isGenerating && !error && (
        <button
          onClick={generateProof}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-lg font-semibold group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
          Generate Royalty Compliance Proof
          <Heart className="w-5 h-5" />
        </button>
      )}

      {isGenerating && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-red-600" />
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
                      ? 'bg-red-50 border-2 border-red-300'
                      : isPastStep
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isCurrentStep
                      ? 'bg-red-600 text-white animate-pulse'
                      : isPastStep
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-sm ${
                    isCurrentStep
                      ? 'font-semibold text-red-900'
                      : isPastStep
                      ? 'text-green-700 line-through'
                      : 'text-gray-500'
                  }`}>
                    {step.text}
                  </span>
                  {isCurrentStep && (
                    <div className="flex-1 h-2 bg-red-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
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

      {proofHash && !isGenerating && !error && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="font-bold text-green-900 text-lg">Proof Generated Successfully!</h4>
              <p className="text-sm text-green-700">Your royalty compliance is verified</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 mb-4">
            <div className="text-xs text-gray-500 mb-1">Proof Hash</div>
            <div className="font-mono text-sm text-gray-900 break-all">{proofHash}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Share on X
            </button>
            <button
              onClick={copyProofHash}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              Copy Hash
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
