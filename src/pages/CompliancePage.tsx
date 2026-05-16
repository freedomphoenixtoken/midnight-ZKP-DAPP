import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { CompliancePassport } from '../components/zk/CompliancePassport';

export function CompliancePage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ZK-Compliance Passport</h1>
        <p className="text-gray-600">
          Generate a zero-knowledge proof to verify your KYC/accreditation status without revealing personal identity.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          XRPL Wallet Address
        </label>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="r..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {userAddress && (
        <CompliancePassport 
          userAddress={userAddress}
          onVerified={setProofHash}
        />
      )}

      {proofHash && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <CheckCircle className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Compliance Verified</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>Proof Hash:</strong> {proofHash}</p>
            <p className="text-gray-600">
              This proof hash can be used in your marketplace for RWA purchases.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
