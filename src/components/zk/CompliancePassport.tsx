import { useState } from 'react';
import { Shield, AlertCircle, Loader2 } from 'lucide-react';

interface CompliancePassportProps {
  userAddress: string;
  onVerified: (hash: string) => void;
}

export function CompliancePassport({ userAddress, onVerified }: CompliancePassportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateProof = async () => {
    setIsGenerating(true);
    setError(null);

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
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">ZK-Compliance Passport</h3>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        Generate a zero-knowledge proof to verify your KYC/accreditation status without revealing personal identity.
      </p>

      <button
        onClick={generateProof}
        disabled={isGenerating}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Compliance Proof'
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
