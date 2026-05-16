import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, ArrowRight, FileCheck, Lock, Eye, Sparkles, Zap, ShieldAlert } from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section with Magic Moment */}
      <div className="text-center mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50 animate-pulse"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Midnight Network</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Prove Without Exposing
          </h1>
          <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Zero-Knowledge Proof technology that lets you verify compliance and trust 
            <span className="font-semibold text-purple-600"> without revealing your personal data</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Lock className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Privacy-First</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Selective Disclosure</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Instant Verification</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Feature Cards with Enhanced UX */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">ZK-Compliance Passport</h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Prove your KYC/accreditation status without revealing personal identity. 
            <span className="font-semibold text-blue-600"> Required for RWA (Real World Asset) purchases.</span>
          </p>
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <ShieldAlert className="w-4 h-4 text-green-600" />
            <span>Your data stays private - only proof is shared</span>
          </div>
          <Link
            to="/compliance"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
          >
            Generate Proof
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200 hover:border-purple-300 transform hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-colors">
              <ShieldCheck className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">ZK-Rental Trust Score</h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Prove your rental reliability without revealing your rental history. 
            <span className="font-semibold text-purple-600"> Required for NFT rental requests.</span>
          </p>
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
            <ShieldAlert className="w-4 h-4 text-green-600" />
            <span>Show your trust score, hide your history</span>
          </div>
          <Link
            to="/rental-trust"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
          >
            Generate Proof
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Verification Section with Trust Indicators */}
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-200 hover:border-green-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
            <FileCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Verify Proofs</h2>
        </div>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Verify zero-knowledge proofs to check their validity and expiration status. 
          <span className="font-semibold text-green-600"> Instant verification with cryptographic certainty.</span>
        </p>
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <ShieldAlert className="w-4 h-4 text-green-600" />
          <span>Mathematical proof without data exposure</span>
        </div>
        <Link
          to="/verify"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
        >
          Verify Proof
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Privacy Promise Section */}
      <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
            <Lock className="w-8 h-8" />
            Privacy Promise
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your data never leaves your device in raw form. We only generate mathematical proofs 
            that verify your credentials without revealing the underlying information. 
            <span className="text-green-400 font-semibold"> Zero knowledge, full trust.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
