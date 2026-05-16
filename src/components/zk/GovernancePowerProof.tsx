import { useState, useEffect } from 'react';
import { Vote, AlertCircle, Loader2, Sparkles, CheckCircle2, Eye, Users, Crown, Twitter, Link as LinkIcon, RefreshCw, Shield, Clock } from 'lucide-react';

interface GovernancePowerProofProps {
  userAddress: string;
  onVerified: (hash: string, data: any) => void;
  proofHash?: string;
  onRegenerate?: () => void;
}

export function GovernancePowerProof({ userAddress, onVerified, proofHash, onRegenerate }: GovernancePowerProofProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationStep, setGenerationStep] = useState(0);
  const [proofGeneratedAt, setProofGeneratedAt] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (proofHash && !proofGeneratedAt) {
      setProofGeneratedAt(new Date());
    }
  }, [proofHash, proofGeneratedAt]);

  useEffect(() => {
    if (!proofGeneratedAt) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const expiration = new Date(proofGeneratedAt.getTime() + 30 * 24 * 60 * 60 * 1000);
      const diff = expiration.getTime() - now.getTime();

      if (diff <= 0) return 'Expired';

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) return `${days}d ${hours}h remaining`;
      if (hours > 0) return `${hours}h ${minutes}m remaining`;
      return `${minutes}m remaining`;
    };

    setTimeRemaining(calculateTimeRemaining());
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, [proofGeneratedAt]);

  const shareOnTwitter = () => {
    if (!proofHash) return;
    const text = `I just generated a ZK-Governance Power proof to vote anonymously without revealing my token count! 🔐 Privacy-first DAO governance is here. #ZeroKnowledge #MidnightNetwork #DAO`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const copyProofHash = () => {
    if (!proofHash) return;
    navigator.clipboard.writeText(proofHash);
  };

  const regenerateProof = () => {
    setProofGeneratedAt(null);
    setTimeRemaining('');
    if (onRegenerate) {
      onRegenerate();
    } else {
      generateProof();
    }
  };

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

      {proofHash && !isGenerating && !error && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <h4 className="font-bold text-green-900 text-lg">Proof Generated Successfully!</h4>
              <p className="text-sm text-green-700">Your governance power is verified</p>
            </div>
          </div>
          
          {timeRemaining && (
            <div className="bg-white rounded-lg p-3 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-xs text-gray-500">Proof Expires In</div>
                <div className="font-semibold text-gray-900">{timeRemaining}</div>
              </div>
              <Shield className="w-5 h-5 text-green-600 ml-auto" />
            </div>
          )}

          <div className="bg-white rounded-lg p-3 mb-4">
            <div className="text-xs text-gray-500 mb-1">Proof Hash</div>
            <div className="font-mono text-sm text-gray-900 break-all">{proofHash}</div>
          </div>
          <div className="flex gap-2 mb-3">
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
          <button
            onClick={regenerateProof}
            className="w-full flex items-center justify-center gap-2 bg-purple-100 text-purple-900 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors border border-purple-300"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate Proof
          </button>
        </div>
      )}
    </div>
  );
}
