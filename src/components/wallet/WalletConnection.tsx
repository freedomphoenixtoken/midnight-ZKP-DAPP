import { useState } from 'react';
import { Wallet, X, CheckCircle, AlertCircle, Copy, ExternalLink, Info, Loader2, QrCode, Smartphone } from 'lucide-react';
import { XummSdk } from 'xumm-sdk';

interface WalletConnectionProps {
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

export function WalletConnection({ onConnect, onDisconnect, connectedAddress }: WalletConnectionProps) {
  const [manualAddress, setManualAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [needsSigning, setNeedsSigning] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [deepLinkUrl, setDeepLinkUrl] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  const checkMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  };

  const handleManualConnect = () => {
    setError(null);
    
    // Comprehensive XRPL address validation
    if (!manualAddress || manualAddress.trim() === '') {
      setError('Please enter an XRPL wallet address');
      return;
    }

    // XRPL address validation: starts with 'r', 25-34 characters, base58 characters
    const xrplAddressRegex = /^r[a-zA-Z0-9]{25,34}$/;
    if (!xrplAddressRegex.test(manualAddress)) {
      setError('Invalid XRPL address. Must start with "r" and be 25-34 characters');
      return;
    }

    // Additional validation: check for common invalid characters
    const invalidChars = /[IOl0]/;
    if (invalidChars.test(manualAddress)) {
      setError('Invalid XRPL address. Contains invalid characters');
      return;
    }

    setNeedsSigning(true);
  };

  const handleTransactionSigning = async () => {
    setIsMobile(checkMobile());
    setIsSigning(true);
    setError(null);

    try {
      // Initialize Xumm SDK with environment variables
      const xummApiKey = import.meta.env.VITE_XUMM_API_KEY || 'demo_api_key';
      const xummApiSecret = import.meta.env.VITE_XUMM_API_SECRET || 'demo_api_secret';
      const xumm = new XummSdk(xummApiKey, xummApiSecret);

      // Create a sign request payload for wallet verification
      const payload = await xumm.payload.create({
        txjson: {
          TransactionType: 'Payment',
          Amount: '1',
          Destination: manualAddress,
          Memos: [{
            Memo: {
              MemoData: btoa('WALLET_VERIFICATION'),
              MemoFormat: btoa('VERIFICATION'),
              MemoType: btoa('ZK_DAPP')
            }
          }]
        },
        options: {
          force_network: 'TESTNET',
          return_url: {
            web: `${window.location.origin}/?wallet=connected`
          }
        },
        custom_meta: {
          identifier: 'ignition-zkp-wallet-verification',
          instruction: 'Sign this transaction to verify you own this address'
        }
      });

      console.log('Xumm payload created:', payload);

      // Set QR code for desktop or deep link for mobile
      if (isMobile) {
        setDeepLinkUrl(payload.next.always);
        console.log('Deep link set for mobile:', payload.next.always);
      } else {
        setQrCodeUrl(payload.refs.qr_png);
        console.log('QR code set for desktop:', payload.refs.qr_png);
      }

      // Subscribe to payload updates
      const subscription = await xumm.payload.subscribe(payload.uuid, async (event) => {
        console.log('Payload event:', event);
        
        if (event.data.signed) {
          console.log('Transaction signed successfully');
          const signedTx = event.data.signed;
          const walletAddress = signedTx.Account;
          
          // Verify the signed address matches the entered address
          if (walletAddress.toLowerCase() !== manualAddress.toLowerCase()) {
            throw new Error('Signed wallet address does not match the entered address');
          }
          
          // Clean up
          subscription.resolve();
          setQrCodeUrl('');
          setDeepLinkUrl('');
          setIsSigning(false);
          
          onConnect(manualAddress.trim());
          setManualAddress('');
          setNeedsSigning(false);
        } else if (event.data.opened) {
          console.log('Payload opened by user');
        }
      });

      // Wait for subscription to complete
      await subscription.resolved;

    } catch (error) {
      console.error('Failed to sign transaction:', error);
      setError(error instanceof Error ? error.message : 'Transaction signing failed. Please ensure you approve the transaction in your wallet.');
    } finally {
      setIsSigning(false);
      setQrCodeUrl('');
      setDeepLinkUrl('');
    }
  };

  const copyAddress = () => {
    if (connectedAddress) {
      navigator.clipboard.writeText(connectedAddress);
    }
  };

  if (connectedAddress) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-full shadow-md">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-green-800">Wallet Connected</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-sm text-gray-600 font-mono mt-1">
                {connectedAddress.substring(0, 8)}...{connectedAddress.substring(-8)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
              title="Copy address"
            >
              <Copy className="w-4 h-4 text-green-600" />
            </button>
            <a
              href={`https://xrpscan.com/account/${connectedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
              title="View on XRPScan"
            >
              <ExternalLink className="w-4 h-4 text-green-600" />
            </a>
            <button
              onClick={onDisconnect}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Disconnect"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl shadow-md">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Connect XRPL Wallet</h3>
          <p className="text-sm text-gray-600">Enter address and sign transaction to verify ownership</p>
        </div>
      </div>

      {/* Manual Address Entry */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          XRPL Wallet Address
        </label>
        <input
          type="text"
          value={manualAddress}
          onChange={(e) => {
            setManualAddress(e.target.value);
            setError(null);
          }}
          placeholder="r..."
          disabled={needsSigning}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
        
        {!needsSigning ? (
          <button
            onClick={handleManualConnect}
            disabled={!manualAddress}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-3">
            {!isSigning && (
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Wallet className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-sm text-purple-900">
                    <p className="font-semibold mb-1">Transaction Signing Required</p>
                    <p className="text-purple-700">You will be prompted to sign a transaction in your wallet to verify you own this address. The transaction will not be submitted to the blockchain.</p>
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
                    <p className="text-xs text-yellow-700">Please approve the transaction in your wallet to verify ownership</p>
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
              onClick={handleTransactionSigning}
              disabled={isSigning}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-md ${
                isSigning
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg'
              }`}
            >
              {isSigning ? 'Please Sign Transaction in Wallet...' : 'Sign Transaction to Verify'}
            </button>
            <button
              onClick={() => {
                setNeedsSigning(false);
                setError(null);
              }}
              disabled={isSigning}
              className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Transaction Signing Required</p>
            <p className="text-blue-700">
              To verify you own this wallet address, you'll need to sign a small transaction. This proves ownership without revealing your private keys. The transaction won't be submitted to the blockchain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
