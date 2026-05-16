import { useState } from 'react';
import { CheckCircle, XCircle, Loader2, ShieldCheck, Sparkles, ArrowLeft, Lock, AlertTriangle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VerificationPage() {
  const [proofHash, setProofHash] = useState('');
  const [proofType, setProofType] = useState<'compliance' | 'rental_trust'>('compliance');
  const [verifying, setVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [result, setResult] = useState<any>(null);

  const verifyProof = async () => {
    setVerifying(true);
    setResult(null);
    setVerificationStep(0);

    // Simulate magic moment with step-by-step animation
    const steps = [
      { text: 'Retrieving proof from blockchain...', duration: 600 },
      { text: 'Validating cryptographic signature...', duration: 800 },
      { text: 'Checking proof expiration...', duration: 600 },
      { text: 'Verifying zero-knowledge circuit...', duration: 1000 },
      { text: 'Confirming proof authenticity...', duration: 400 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setVerificationStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

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
      setVerificationStep(0);
    }
  };

  const steps = [
    { text: 'Retrieving proof from blockchain...', icon: ShieldCheck },
    { text: 'Validating cryptographic signature...', icon: Lock },
    { text: 'Checking proof expiration...', icon: Clock },
    { text: 'Verifying zero-knowledge circuit...', icon: Sparkles },
    { text: 'Confirming proof authenticity...', icon: CheckCircle }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Header with Privacy-First Design */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Verify ZK Proof
            </h1>
            <p className="text-gray-600 mt-1">
              Cryptographically verify zero-knowledge proofs
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Mathematical verification without data exposure</span>
        </div>
      </div>

      {/* Privacy Visualization */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 mb-8 border border-green-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <ShieldCheck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How Verification Works</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We verify the mathematical proof without ever accessing the underlying data. 
              The proof itself contains all the information needed to confirm authenticity.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-green-600" />
            Proof Hash
          </label>
          <input
            type="text"
            value={proofHash}
            onChange={(e) => setProofHash(e.target.value)}
            placeholder="zk_compliance_..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-lg font-mono"
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter the proof hash you want to verify
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Proof Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setProofType('compliance')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                proofType === 'compliance'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Compliance Passport</div>
              <div className="text-sm text-gray-600 mt-1">KYC/Accreditation proof</div>
            </button>
            <button
              type="button"
              onClick={() => setProofType('rental_trust')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                proofType === 'rental_trust'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Rental Trust Score</div>
              <div className="text-sm text-gray-600 mt-1">Rental reliability proof</div>
            </button>
          </div>
        </div>

        {!verifying && !result && (
          <button
            onClick={verifyProof}
            disabled={!proofHash}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 text-lg font-semibold group disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <ShieldCheck className="w-5 h-5 group-hover:animate-pulse" />
            Verify Proof
            <Sparkles className="w-5 h-5" />
          </button>
        )}

        {verifying && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 animate-spin text-green-600" />
              <span className="text-lg font-semibold text-gray-900">Verifying Proof...</span>
            </div>

            {/* Step-by-step Animation */}
            <div className="space-y-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCurrentStep = index + 1 === verificationStep;
                const isPastStep = index + 1 < verificationStep;

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      isCurrentStep
                        ? 'bg-green-50 border-2 border-green-300'
                        : isPastStep
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isCurrentStep
                        ? 'bg-green-600 text-white animate-pulse'
                        : isPastStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-sm ${
                      isCurrentStep
                        ? 'font-semibold text-green-900'
                        : isPastStep
                        ? 'text-green-700 line-through'
                        : 'text-gray-500'
                    }`}>
                      {step.text}
                    </span>
                    {isCurrentStep && (
                      <div className="flex-1 h-2 bg-green-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full animate-[progress_1s_ease-in-out_infinite]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {result && (
          <div className={`rounded-2xl p-6 border-2 animate-pulse-once ${
            result.valid 
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
          }`}>
            {result.valid ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-3 rounded-full animate-bounce">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-800">Proof Verified</h3>
                    <p className="text-green-600 text-sm">Cryptographically authentic</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-green-200 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        User Address
                      </label>
                      <div className="mt-1 font-mono text-sm text-gray-800 break-all">
                        {result.userAddress}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Created
                      </label>
                      <div className="mt-1 text-sm text-gray-800">
                        {new Date(result.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Expires
                    </label>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-800">
                      <Clock className="w-4 h-4 text-orange-500" />
                      {new Date(result.expiresAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg p-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-medium">This proof is mathematically valid and has not been tampered with</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 p-3 rounded-full">
                    <XCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-800">Proof Invalid</h3>
                    <p className="text-red-600 text-sm">Verification failed</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-red-200">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-900 font-medium">
                      {result.error || result.reason || 'This proof could not be verified'}
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      The proof may be expired, tampered with, or invalid.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
