import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, CheckCircle } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface GuidedTourProps {
  onComplete: () => void;
  theme: 'light' | 'dark';
}

export function GuidedTour({ onComplete, theme }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const tourSteps: TourStep[] = [
    {
      target: '.hero-section',
      title: 'Welcome to Midnight ZKP DApp',
      description: 'Enterprise-grade Zero-Knowledge Proof infrastructure for multi-chain NFT marketplaces. Prove compliance without exposing personal data.',
      position: 'bottom'
    },
    {
      target: '.feature-card-compliance',
      title: 'ZK-Compliance Passport',
      description: 'Prove KYC/accreditation status without revealing personal identity. Required for RWA purchases on regulated marketplaces.',
      position: 'right'
    },
    {
      target: '.feature-card-rental',
      title: 'ZK-Rental Trust Score',
      description: 'Prove rental reliability without revealing rental history. Required for NFT rentals and peer-to-peer lending.',
      position: 'right'
    },
    {
      target: '.feature-card-airdrop',
      title: 'ZK-Airdrop Eligibility',
      description: 'Prove legitimate user status without revealing wallet activity. Fair airdrops without privacy invasion.',
      position: 'right'
    },
    {
      target: '.feature-card-royalty',
      title: 'ZK-Royalty Compliance',
      description: 'Prove creator-friendly trading without revealing transaction history. Support artists while maintaining privacy.',
      position: 'right'
    },
    {
      target: '.feature-card-governance',
      title: 'ZK-Governance Power',
      description: 'Prove voting power without revealing token holdings. Anonymous DAO voting with cryptographic proof.',
      position: 'right'
    },
    {
      target: '.marketplace-demo-link',
      title: 'Interactive Marketplace Demo',
      description: 'See widgets in action in a realistic NFT marketplace. Test widget configuration and embed code generation.',
      position: 'left'
    },
    {
      target: '.dashboard-link',
      title: 'Live Analytics Dashboard',
      description: 'Real-time proof generation metrics across 10+ blockchains. Enterprise-grade analytics for institutional clients.',
      position: 'left'
    },
    {
      target: '.widgets-link',
      title: 'Widget Integration',
      description: 'Embed our ZK widgets into any marketplace. 5 widget types with full customization options.',
      position: 'left'
    },
    {
      target: '.business-link',
      title: 'Enterprise Business Model',
      description: 'Multi-chain support, institutional compliance, and enterprise pricing. Ready for marketplaces from every chain.',
      position: 'left'
    }
  ];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    setIsVisible(false);
    onComplete();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipTour();
      }
      if (e.key === 'ArrowRight') {
        nextStep();
      }
      if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep]);

  if (!isVisible) return null;

  const step = tourSteps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={skipTour} />
      
      {/* Tour Tooltip */}
      <div className={`fixed z-[60] p-6 rounded-2xl shadow-2xl max-w-md ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border`} style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-2 rounded-xl">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Step {currentStep + 1} of {tourSteps.length}</span>
                <span>•</span>
                <span>Press ESC to skip</span>
              </div>
            </div>
          </div>
          <button
            onClick={skipTour}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg"
          >
            {currentStep === tourSteps.length - 1 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Complete Tour
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
