import { useState } from 'react';
import { ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

interface RentalTrustScoreProps {
  userAddress: string;
  onVerified: (hash: string, stats: any) => void;
}

export function RentalTrustScore({ userAddress, onVerified }: RentalTrustScoreProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);

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
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">ZK-Rental Trust Score</h3>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Generate a zero-knowledge proof to verify your rental reliability without revealing your rental history.
      </p>

      <button
        onClick={generateProof}
        disabled={isGenerating}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Trust Score Proof'
        )}
      </button>

      {error && (
        <div className="mt-4 text-red-600 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
