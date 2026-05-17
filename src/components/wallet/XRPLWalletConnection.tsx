import { useState } from 'react';
import { Wallet, Check, AlertCircle } from 'lucide-react';

interface XRPLWalletConnectionProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  connectedAddress?: string;
}

declare global {
  interface Window {
    xrpl?: {
      connect: () => Promise<{ address: string }>;
      disconnect: () => Promise<void>;
      signTransaction: (tx: any) => Promise<any>;
      submitTransaction: (tx: any) => Promise<any>;
    };
  }
}

export function XRPLWalletConnection({ onConnect, onDisconnect, connectedAddress }: XRPLWalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectXRPLWallet = async () => {
    if (isConnecting) return;

    try {
      setIsConnecting(true);
      setError(null);
      console.log('Attempting to connect to XRPL wallet...');

      // Check if XRPL wallet extension is available
      if (!window.xrpl) {
        throw new Error('XRPL wallet extension not found. Please install an XRPL wallet extension.');
      }

      // Connect to XRPL wallet
      const wallet = await window.xrpl.connect();
      console.log('XRPL wallet connected:', wallet.address);

      // Sign a transaction to verify wallet functionality
      try {
        const signResult = await window.xrpl.signTransaction({
          TransactionType: 'Payment',
          Account: wallet.address,
          Amount: '1',
          Destination: wallet.address
        });
        console.log('Transaction signed successfully:', signResult);
      } catch (signError) {
        console.warn('Transaction signing failed, but connection succeeded:', signError);
        // Continue even if signing fails for demo purposes
      }

      onConnect(wallet.address);
    } catch (error) {
      console.error('Failed to connect XRPL wallet:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      alert(`Failed to connect XRPL wallet: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure:\n1. XRPL wallet extension is installed\n2. Wallet is unlocked\n3. You are using a supported browser`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectXRPLWallet = async () => {
    try {
      if (window.xrpl) {
        await window.xrpl.disconnect();
      }
      onDisconnect();
    } catch (error) {
      console.error('Failed to disconnect XRPL wallet:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">XRPL Wallet</h3>
            <p className="text-sm text-gray-600">Connect your XRPL wallet for cross-chain verification</p>
          </div>
        </div>
        {connectedAddress && (
          <div className="bg-green-100 p-2 rounded-full">
            <Check className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {connectedAddress ? (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Connected Address</p>
            <p className="text-sm font-mono text-gray-800 break-all">{connectedAddress}</p>
          </div>
          <button
            onClick={disconnectXRPLWallet}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Disconnect XRPL Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connectXRPLWallet}
          disabled={isConnecting}
          className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
            isConnecting
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
          }`}
        >
          {isConnecting ? 'Connecting...' : 'Connect XRPL Wallet'}
        </button>
      )}
    </div>
  );
}
