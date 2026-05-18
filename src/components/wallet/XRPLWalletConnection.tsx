import { useState } from 'react';
import { Wallet, Check, AlertCircle, QrCode, Loader2, Smartphone } from 'lucide-react';

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
  const [isSigning, setIsSigning] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [deepLinkUrl, setDeepLinkUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Detect mobile device
  const checkMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  };

  const connectXRPLWallet = async () => {
    if (isConnecting) return;

    const mobile = checkMobile();

    try {
      setIsConnecting(true);
      setError(null);
      console.log('Requesting Xumm payload from server...');

      // Call Netlify function to create Xumm payload server-side (keeps API secret secure)
      const response = await fetch('/.netlify/functions/create-xumm-payload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/?wallet=connected`,
          identifier: 'ignition-zkp-wallet-connection'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to create sign request');
      }

      const payload = await response.json();
      console.log('Xumm payload created:', payload);

      setIsSigning(true);

      // Show QR code for desktop, deep link button for mobile
      if (mobile) {
        setDeepLinkUrl(payload.deepLinkUrl);
      } else {
        setQrCodeUrl(payload.qrUrl);
      }

      // Poll for signing status
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await fetch(`/.netlify/functions/check-xumm-payload?uuid=${payload.uuid}`);
          if (!statusRes.ok) return;

          const status = await statusRes.json();
          console.log('Payload status:', status);

          if (status.signed && status.account) {
            clearInterval(pollInterval);
            setQrCodeUrl('');
            setDeepLinkUrl('');
            setIsSigning(false);
            setIsConnecting(false);
            onConnect(status.account);
          } else if (status.cancelled || status.expired) {
            clearInterval(pollInterval);
            setQrCodeUrl('');
            setDeepLinkUrl('');
            setIsSigning(false);
            setIsConnecting(false);
            setError(status.cancelled ? 'Signing was cancelled.' : 'Sign request expired. Please try again.');
          }
        } catch (pollError) {
          console.error('Polling error:', pollError);
        }
      }, 2000);

      // Auto-cancel after 5 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
        if (isSigning) {
          setQrCodeUrl('');
          setDeepLinkUrl('');
          setIsSigning(false);
          setIsConnecting(false);
          setError('Sign request timed out. Please try again.');
        }
      }, 300000);

    } catch (error) {
      console.error('Failed to connect XRPL wallet:', error);
      const msg = error instanceof Error ? error.message : 'Unknown error';
      setError(msg);
      setIsConnecting(false);
      setIsSigning(false);
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
            <p className="text-sm text-gray-600">Connect with transaction signing for verification</p>
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
        <div className="space-y-3">
          {!isConnecting && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Transaction Signing Required</p>
                  <p className="text-blue-700">You will be prompted to sign a transaction in your wallet to verify ownership. This transaction will not be submitted to the blockchain.</p>
                </div>
              </div>
            </div>
          )}
          {isSigning && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 text-yellow-600 animate-spin" />
                <div>
                  <p className="text-sm font-semibold text-yellow-900">Waiting for Transaction Signature</p>
                  <p className="text-xs text-yellow-700">Please approve the transaction in your wallet to complete the connection</p>
                </div>
              </div>
            </div>
          )}
          {qrCodeUrl && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <div className="flex flex-col items-center gap-3">
                <QrCode className="w-6 h-6 text-purple-600" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-purple-900 mb-2">Scan QR Code with Xumm/Xaman</p>
                  <p className="text-xs text-purple-700 mb-3">Use your mobile wallet to scan the QR code below</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-purple-300">
                  <img src={qrCodeUrl} alt="Xumm QR Code" className="w-48 h-48" />
                </div>
                <p className="text-xs text-purple-600 text-center">Waiting for wallet signature...</p>
              </div>
            </div>
          )}
          {deepLinkUrl && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex flex-col items-center gap-3">
                <Smartphone className="w-6 h-6 text-blue-600" />
                <div className="text-center">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Open Xumm/Xaman App</p>
                  <p className="text-xs text-blue-700 mb-3">Tap the button below to open your wallet and sign the transaction</p>
                </div>
                <a
                  href={deepLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Open Wallet to Sign
                </a>
                <p className="text-xs text-blue-600 text-center">Waiting for wallet signature...</p>
              </div>
            </div>
          )}
          <button
            onClick={connectXRPLWallet}
            disabled={isConnecting}
            className={`w-full font-medium py-3 px-4 rounded-lg transition-colors ${
              isConnecting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
            }`}
          >
            {isConnecting ? (isSigning ? 'Please Sign Transaction in Wallet...' : 'Connecting...') : 'Connect XRPL Wallet'}
          </button>
        </div>
      )}
    </div>
  );
}
