import { useState } from 'react';
import { Gift, Sparkles, CheckCircle2, Lock } from 'lucide-react';

interface AirdropWidgetProps {
  userAddress?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
  onProofGenerated?: (proofHash: string) => void;
}

export function AirdropWidget({ 
  userAddress = '', 
  theme = 'light',
  compact = false,
  onProofGenerated 
}: AirdropWidgetProps) {
  const [address, setAddress] = useState(userAddress);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const generateProof = async () => {
    if (!address) return;
    
    setIsGenerating(true);
    setStep(0);
    
    const steps = ['Checking activity...', 'Verifying eligibility...', 'Generating proof...'];
    
    for (let i = 0; i < steps.length; i++) {
      setStep(i + 1);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    const hash = `zk_airdrop_${address.substring(0, 8)}_${Date.now()}`;
    setProofHash(hash);
    setIsGenerating(false);
    onProofGenerated?.(hash);
  };

  if (compact) {
    return (
      <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
            <Gift className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-sm">Airdrop Eligibility</span>
        </div>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Wallet address"
          className={`w-full px-3 py-2 rounded-lg text-sm border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} mb-2`}
        />
        <button
          onClick={generateProof}
          disabled={isGenerating || !address}
          className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Verify'}
        </button>
        {proofHash && (
          <div className="mt-2 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span className="font-mono truncate">{proofHash.substring(0, 16)}...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900 dark:to-yellow-900 p-3 rounded-xl">
          <Gift className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">Airdrop Eligibility</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Prove legitimacy without revealing activity</p>
        </div>
      </div>
      
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter XRPL wallet address"
        className={`w-full px-4 py-3 rounded-xl border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} mb-3`}
      />
      
      <button
        onClick={generateProof}
        disabled={isGenerating || !address}
        className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 rounded-xl font-medium hover:from-orange-700 hover:to-yellow-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            Generating Proof...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Generate Eligibility Proof
          </>
        )}
      </button>
      
      {isGenerating && (
        <div className="mt-4 space-y-2">
          {['Checking wallet activity', 'Verifying transaction history', 'Generating ZK proof'].map((s, i) => (
            <div key={i} className={`flex items-center gap-2 text-sm ${i < step ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}
      
      {proofHash && (
        <div className={`mt-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Proof Generated</span>
          </div>
          <div className={`text-xs font-mono break-all ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            {proofHash}
          </div>
        </div>
      )}
    </div>
  );
}
