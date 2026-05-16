import { useState } from 'react';
import { CheckCircle, Lock, Shield, ArrowLeft, Play, Eye, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CompliancePassport } from '../components/zk/CompliancePassport';
import { PrivacyVisualization } from '../components/privacy/PrivacyVisualization';
import { ProblemsSolved } from '../components/problems/ProblemsSolved';
import { DemoMode } from '../components/demo/DemoMode';
import { DataFlowVisualization } from '../components/visualization/DataFlowVisualization';
import { BeforeAfterComparison } from '../components/privacy/BeforeAfterComparison';
import { Accordion } from '../components/ui/Accordion';
import { WalletConnection } from '../components/wallet/WalletConnection';

export function CompliancePage() {
  const [userAddress, setUserAddress] = useState('');
  const [proofHash, setProofHash] = useState<string | null>(null);
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
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-2xl">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ZK-Compliance Passport
            </h1>
            <p className="text-gray-600 mt-1">
              Prove your compliance without revealing your identity
            </p>
          </div>
        </div>

        {/* Privacy Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
          <Lock className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">Privacy-First: Your data stays private</span>
        </div>
      </div>

      {/* Main Action Section - Prominent at Top */}
      <div className="space-y-4 mb-6">
        <WalletConnection 
          onConnect={setUserAddress}
          onDisconnect={() => {
            setUserAddress('');
            setProofHash(null);
          }}
          connectedAddress={userAddress}
        />
        
        {userAddress && (
          <CompliancePassport
            userAddress={userAddress}
            onVerified={(hash) => {
              setProofHash(hash);
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
            featureName="Compliance Passport"
            onStartDemo={() => setIsDemoRunning(true)}
            isDemoRunning={isDemoRunning}
          />
        </Accordion>

        <Accordion 
          title="How It Works" 
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          defaultOpen={false}
        >
          <DataFlowVisualization featureName="Compliance Passport" />
        </Accordion>

        <Accordion 
          title="Privacy Comparison" 
          icon={<Lock className="w-5 h-5 text-green-600" />}
          defaultOpen={false}
        >
          <BeforeAfterComparison
            featureName="Compliance Passport"
            beforeData={[
              'Full identity documents shared',
              'KYC details exposed to all',
              'Accreditation details revealed',
              'Financial information visible',
              'Government ID numbers stored'
            ]}
            afterData={[
              'Only compliance status revealed',
              'KYC details remain private',
              'Accreditation status only',
              'Financial information protected',
              'ID numbers never stored'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Protected Data Details" 
          icon={<Shield className="w-5 h-5 text-blue-600" />}
          defaultOpen={false}
        >
          <PrivacyVisualization
            featureName="Compliance Passport"
            protectedData={[
              'Personal identity (name, DOB)',
              'KYC documents',
              'Accreditation details',
              'Financial information',
              'Government ID numbers'
            ]}
            exposedData={[
              'Proof hash only',
              'Compliance status (yes/no)',
              'Compliance type (KYC/Accredited)',
              'Proof expiration date'
            ]}
            processSteps={[
              'Your KYC data stays on your device',
              'We verify compliance status locally',
              'Zero-knowledge proof is generated mathematically',
              'Only the proof is shared - never your identity',
              'Marketplace verifies proof without seeing your personal data'
            ]}
          />
        </Accordion>

        <Accordion 
          title="Problems Solved" 
          icon={<Info className="w-5 h-5 text-orange-600" />}
          defaultOpen={false}
        >
          <ProblemsSolved
            featureName="Compliance Passport"
            problems={[
              {
                title: "Identity Exposure",
                description: "Traditional compliance verification requires sharing complete identity documents, KYC data, and government IDs with every platform, creating massive privacy risks and data breaches.",
                severity: 'high'
              },
              {
                title: "Centralized Data Silos",
                description: "Compliance data is stored in centralized databases that become honeypots for hackers, with single points of failure and no user control over personal information.",
                severity: 'high'
              },
              {
                title: "Repeated Verification",
                description: "Users must repeatedly submit KYC documents and personal information to every platform, creating friction and exposing the same data multiple times.",
                severity: 'medium'
              },
              {
                title: "RWA Access Barriers",
                description: "Real World Asset (RWA) marketplaces require extensive compliance verification, but traditional methods expose sensitive financial and identity data to third parties.",
                severity: 'high'
              },
              {
                title: "Cross-Platform Compliance",
                description: "Verifying compliance across multiple platforms requires sharing personal data between services, creating privacy risks and regulatory complexity.",
                severity: 'medium'
              }
            ]}
          />
        </Accordion>
      </div>

      {/* Success State with Magic Moment */}
      {proofHash && (
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 animate-pulse-once">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Compliance Verified</h3>
              <p className="text-green-600 text-sm">Your proof has been generated successfully</p>
            </div>
          </div>

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
                <Lock className="w-4 h-4" />
                <span className="font-medium">This proof is cryptographically verifiable</span>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Next Step:</span> Use this proof hash in your marketplace 
                  for RWA purchases. The marketplace will verify the proof without seeing your personal data.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
