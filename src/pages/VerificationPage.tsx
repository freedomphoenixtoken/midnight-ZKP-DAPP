import { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function VerificationPage() {
  const [proofHash, setProofHash] = useState('');
  const [proofType, setProofType] = useState<'compliance' | 'rental_trust'>('compliance');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const verifyProof = async () => {
    setVerifying(true);
    setResult(null);

    try {
      const response = await fetch('/api/zk/verify-proof', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proofHash, proofType })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Verification failed' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify ZK Proof</h1>
        <p className="text-gray-600">
          Verify a zero-knowledge proof hash to check its validity and expiration.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proof Hash
          </label>
          <input
            type="text"
            value={proofHash}
            onChange={(e) => setProofHash(e.target.value)}
            placeholder="zk_compliance_..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proof Type
          </label>
          <select
            value={proofType}
            onChange={(e) => setProofType(e.target.value as 'compliance' | 'rental_trust')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="compliance">Compliance Passport</option>
            <option value="rental_trust">Rental Trust Score</option>
          </select>
        </div>

        <button
          onClick={verifyProof}
          disabled={!proofHash || verifying}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {verifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Proof'
          )}
        </button>

        {result && (
          <div className={`p-4 rounded-lg ${result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            {result.valid ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Proof Valid</span>
                </div>
                <p className="text-sm text-gray-600">
                  User: {result.userAddress}
                </p>
                <p className="text-sm text-gray-600">
                  Created: {new Date(result.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Expires: {new Date(result.expiresAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                <span className="font-semibold">{result.error || result.reason || 'Proof Invalid'}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
