import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, ArrowRight, FileCheck } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Zero-Knowledge Proof DApp
        </h1>
        <p className="text-xl text-gray-600">
          Privacy-preserving compliance and trust verification for the XRPL ecosystem
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">ZK-Compliance Passport</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Prove your KYC/accreditation status without revealing personal identity. Required for RWA (Real World Asset) purchases.
          </p>
          <Link
            to="/compliance"
            className="inline-flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">ZK-Rental Trust Score</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Prove your rental reliability without revealing your rental history. Required for NFT rental requests.
          </p>
          <Link
            to="/rental-trust"
            className="inline-flex items-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <FileCheck className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Verify Proofs</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Verify zero-knowledge proofs to check their validity and expiration status.
        </p>
        <Link
          to="/verify"
          className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          Verify Proof
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
