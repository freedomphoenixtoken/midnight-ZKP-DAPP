import { useState } from 'react';
import { Wallet, X, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';

interface WalletConnectionProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  connectedAddress?: string;
}

export function WalletConnection({ onConnect, onDisconnect, connectedAddress }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleXUMMConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      // XUMM SDK integration
      const XUMM_SDK = (await import('xumm-sdk')).default;
      const xumm = new XUMM_SDK({
        apiKey: process.env.VITE_XUMM_API_KEY || '',
        apiSecret: process.env.VITE_XUMM_API_SECRET || ''
      });

      const payload = await xumm.payload?.create({
        txjson: {
          TransactionType: 'SignIn',
        },
        options: {
          submit: false
        }
      });

      if (payload) {
        // Open XUMM app
        window.open(payload.next.always, '_blank');

        // Poll for signed payload
        const pollInterval = setInterval(async () => {
          const resolved = await xumm.payload?.get(payload.uuid);
          
          if (resolved && resolved.meta.signed) {
            clearInterval(pollInterval);
            const address = resolved.meta.signed_account;
            onConnect(address);
            setIsConnecting(false);
          } else if (resolved && resolved.meta.resolved === false) {
            clearInterval(pollInterval);
            setError('XUMM sign-in cancelled');
            setIsConnecting(false);
          }
        }, 2000);

        // Timeout after 5 minutes
        setTimeout(() => {
          clearInterval(pollInterval);
          if (isConnecting) {
            setError('XUMM sign-in timed out');
            setIsConnecting(false);
          }
        }, 300000);
      }
    } catch (err) {
      console.error('XUMM connection error:', err);
      // Fallback to manual entry if XUMM is not configured
      setError('XUMM not configured. Please enter your address manually.');
      setIsConnecting(false);
    }
  };

  const handleManualConnect = () => {
    setError(null);
    
    // Basic XRPL address validation
    const xrplAddressRegex = /^r[a-zA-Z0-9]{25,34}$/;
    if (!xrplAddressRegex.test(manualAddress)) {
      setError('Invalid XRPL address. Must start with "r" and be 25-34 characters.');
      return;
    }

    onConnect(manualAddress);
    setManualAddress('');
  };

  const copyAddress = () => {
    if (connectedAddress) {
      navigator.clipboard.writeText(connectedAddress);
    }
  };

  if (connectedAddress) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-3 rounded-full">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-green-800">Connected</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-sm text-gray-600 font-mono mt-1">
                {connectedAddress.substring(0, 6)}...{connectedAddress.substring(-4)}
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
              className="p-2 hover:bg-green-100 rounded-lg transition-colors"
              title="Disconnect"
            >
              <X className="w-4 h-4 text-green-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-xl">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Connect XRPL Wallet</h3>
          <p className="text-sm text-gray-600">Choose your preferred connection method</p>
        </div>
      </div>

      {/* XUMM Connection */}
      <button
        onClick={handleXUMMConnect}
        disabled={isConnecting}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isConnecting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="font-semibold">Connecting to XUMM...</span>
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5" />
            <span className="font-semibold">Connect with XUMM Wallet</span>
          </>
        )}
      </button>

      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-sm text-gray-400 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Manual Address Entry */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          Enter XRPL Wallet Address
        </label>
        <input
          type="text"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          placeholder="r..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
        <button
          onClick={handleManualConnect}
          disabled={!manualAddress}
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl hover:bg-purple-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Connect with Address
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Privacy Notice</p>
            <p className="text-blue-700">
              Your wallet data is fetched directly from the XRPL ledger. No sensitive information is stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
