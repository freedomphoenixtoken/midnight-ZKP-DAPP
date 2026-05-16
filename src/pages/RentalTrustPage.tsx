import { useState } from 'react';
import { CheckCircle, TrendingUp, Lock, ShieldCheck, ArrowLeft, Play, Eye, Info, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RentalTrustScore } from '../components/zk/RentalTrustScore';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';

export function RentalTrustPage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isDemoRunning, setIsDemoRunning] = useState(false);

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
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl">
            <ShieldCheck className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ZK-Rental Trust Score
            </h1>
            <p className="text-gray-600 mt-1">
              Prove your rental reliability without revealing your history
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your rental history stays private</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-2xl p-8 mb-6 border-2 border-teal-200">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <label className="text-lg font-bold text-gray-900">Generate Your Proof</label>
        </div>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="Enter XRPL wallet address (r...)"
          className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition-all duration-200 text-lg mb-3"
        />
        <p className="text-sm text-gray-600 mb-4">
          Your rental history stays private. Only trust score is revealed.
        </p>
        {userAddress && (
          <RentalTrustScore
            userAddress={userAddress}
            onVerified={(hash, data) => {
              setProofHash(hash);
              setStats(data);
            }}
          />
        )}
      </div>

      {/* Collapsible Educational Content */}
      <div className="space-y-4">
        <Accordion 
          title="Interactive Demo" 
          icon={<Play className="w-5 h-5 text-indigo-600" />}
          defaultOpen={false}
        >
          <DemoMode
            featureName="Rental Trust Score"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="Rental Trust Score" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Lock className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="Rental Trust Score"
            beforeData={[
              'Complete rental history exposed',
              'Specific properties rented visible',
              'Rental timeline tracked',
              'Landlord information revealed',
              'Payment amounts shared'
            ]}
            afterData={[
              'Only trust score range revealed',
              'Property details stay private',
              'Rental timeline protected',
              'Landlord identity hidden',
              'Payment amounts never shared'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="Rental Trust Score"
            protectedData={[
              'Individual rental transactions',
              'Specific properties rented',
              'Rental history timeline',
              'Landlord information',
              'Payment amounts'
            ]}
            exposedData={[
              'Proof hash only',
              'Trust score range (not exact)',
              'Success rate percentage',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your rental data stays on your device',
              'We calculate trust score locally',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your history',
              'Marketplace verifies proof without seeing your rental transactions'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="Rental Trust Score"
            problems={[
              {
                title: "Privacy in Rental History",
                description: "Traditional rental verification requires sharing complete rental history, payment records, and landlord information, exposing sensitive personal and financial data.",
                severity: 'high'
              },
              {
                title: "Trust Verification Friction",
                description: "Verifying rental trust across different platforms requires repeatedly submitting rental history and references, creating friction and privacy risks.",
                severity: 'medium'
              },
              {
                title: "Cross-Platform Trust",
                description: "Rental trust scores are platform-specific, requiring users to rebuild trust on each platform and share rental data multiple times.",
                severity: 'medium'
              },
              {
                title: "Rental Fraud",
                description: "Without proper trust verification, rental platforms are vulnerable to fraud from users with poor rental history or payment issues.",
                severity: 'high'
              },
              {
                title: "Historical Data Exposure",
                description: "Rental verification often reveals historical payment patterns, property preferences, and landlord relationships that users prefer to keep private.",
                severity: 'high'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && stats && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Trust Score Verified</h3>
              <p className="text-green-600 text-sm">Your rental reliability has been proven</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium">Success Rate</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.successRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Successful rentals</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-medium">On-Time Rate</span>
              </div>
              <div className="text-4xl font-bold text-gray-900">{stats.onTimeRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Returned on time</div>
            </div>
          </div>

          {/* Proof Hash */}
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Proof Hash
                </label>
                <div className="mt-1 bg-gray-50 rounded-lg p-3 font-mono text-sm text-gray-800 break-all">
                  {proofHash}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-700">
                <ShieldAlert className="w-4 h-4" />
                <span className="font-medium">Your individual rental history remains confidential</span>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in your marketplace 
                  for NFT rental requests. The marketplace will verify your trust score without seeing your rental history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
