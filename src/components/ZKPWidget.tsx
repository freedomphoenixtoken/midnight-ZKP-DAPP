import { useState } from 'react';
import { Shield } from 'lucide-react';

interface ZKPWidgetProps {
  userAddress: string;
  type: 'compliance' | 'rental_trust';
  onProofGenerated: (proofHash: string) => void;
  apiUrl?: string;
}

export function ZKPWidget({ userAddress, type, onProofGenerated, apiUrl = '/api/zk' }: ZKPWidgetProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const endpoint = type === 'compliance' ? '/generate-compliance-proof' : '/generate-rental-trust-proof';
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAddress,
          userDid: `did:xrpl:${userAddress}`,
          ...(type === 'compliance' ? {
            kycStatus: true,
            accreditationLevel: 2
          } : {})
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate proof');
      }

      const { proofHash } = await response.json();
      onProofGenerated(proofHash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          {type === 'compliance' ? 'Compliance Passport' : 'Rental Trust Score'}
        </h3>
      </div>

      <button
        onClick={generateProof}
        disabled={isGenerating}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate ZK Proof'}
      </button>

      {error && (
        <div className="mt-4 text-red-600 text-sm">{error}</div>
      )}
    </div>
  );
}
