import { Link, useLocation } from 'react-router-dom';
import { Shield, ShieldCheck, FileCheck, Lock, Sparkles, Menu, X, Gift, Heart, Vote, Moon, Sun, Code, ShoppingCart, Activity, DollarSign, ChevronDown, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import '@midnight-ntwrk/dapp-connector-api';
import type { InitialAPI } from '@midnight-ntwrk/dapp-connector-api';

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isZKDropdownOpen, setIsZKDropdownOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => location.pathname === path;

  const zkProofItems = [
    { to: '/compliance', icon: Shield, label: 'NFT Ownership' },
    { to: '/rental-trust', icon: ShieldCheck, label: 'XRP Balance' },
    { to: '/verify', icon: FileCheck, label: 'Verify' },
    { to: '/airdrop-eligibility', icon: Gift, label: 'Transaction History' },
    { to: '/royalty-compliance', icon: Heart, label: 'Royalty' },
    { to: '/governance-power', icon: Vote, label: 'Trust Lines' },
  ];

  const businessItems = [
    { to: '/dashboard', icon: Activity, label: 'Dashboard' },
    { to: '/marketplace-demo', icon: ShoppingCart, label: 'Demo' },
    { to: '/widgets', icon: Code, label: 'Widgets' },
    { to: '/integrations', icon: Code, label: 'Integrations' },
    { to: '/business', icon: DollarSign, label: 'Business' },
  ];

  const connectWallet = async () => {
    // Prevent multiple simultaneous connection attempts
    if (isConnecting) {
      console.log('Connection already in progress, please wait...');
      return;
    }

    try {
      setIsConnecting(true);
      console.log('Attempting to connect to Midnight wallet...');
      
      // Check if window is available
      if (typeof window === 'undefined') {
        console.error('Window is not available');
        alert('Window is not available. This should only happen in server-side rendering.');
        return;
      }

      console.log('Window object available, checking for Midnight wallet...');
      
      // Check if Midnight wallet extension is available
      const midnightWallet = (window as any).midnight;
      if (!midnightWallet) {
        console.error('Midnight wallet extension not found');
        alert('Midnight wallet extension not found. Please install the 1AM wallet extension from https://1am.xyz/');
        return;
      }

      console.log('Midnight wallet extension found, attempting connection...');
      console.log('Available wallet providers:', Object.keys(midnightWallet));

      // Detect the correct wallet provider key
      // 1AM wallet uses 'mnLace' or '1am' depending on version
      const walletProvider =
        midnightWallet.mnLace ||
        midnightWallet['1am'] ||
        midnightWallet['1AM'] ||
        Object.values(midnightWallet)[0];

      if (!walletProvider) {
        throw new Error('No wallet provider found in window.midnight. Please ensure the 1AM wallet extension is installed and enabled.');
      }

      console.log('Found wallet provider, connecting to preprod...');

      // Connect to the wallet using the correct method from Midnight documentation
      try {
        const wallet: InitialAPI = walletProvider;
        
        // Connect to the preprod network
        const connectedApi = await wallet.connect('preprod');
        console.log('Connected to Midnight wallet');
        
        // Retrieve the shielded addresses from the wallet
        const addresses = await connectedApi.getShieldedAddresses();
        const walletAddress = addresses.shieldedAddress;
        console.log('Wallet address:', walletAddress);
        
        // Check if the connection is established
        const connectionStatus = await connectedApi.getConnectionStatus();
        if (connectionStatus) {
          setIsWalletConnected(true);
          console.log('Connected to the wallet successfully');
          alert('Midnight wallet connected successfully!');
        } else {
          throw new Error('Connection status check failed');
        }
      } catch (connectError) {
        console.error('Connection failed:', connectError);
        throw connectError;
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
      alert(`Failed to connect Midnight wallet: ${error instanceof Error ? error.message : 'Unknown error'}. Please ensure:\n1. 1AM wallet extension is installed\n2. Wallet is unlocked\n3. You are using a supported browser (Brave, Chrome)\n4. Check browser console for more details`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl group-hover:animate-pulse">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ignition ZKPs
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Lock className="w-3 h-3" />
                <span>Privacy-First</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              Home
              {isActive('/') && <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-pulse" />}
            </Link>

            {/* ZK Proofs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsZKDropdownOpen(!isZKDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  zkProofItems.some(item => isActive(item.to))
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Shield className="w-4 h-4" />
                ZK Proofs
                <ChevronDown className="w-4 h-4" />
              </button>
              {isZKDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  {zkProofItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsZKDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive(item.to)
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Business Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsBusinessDropdownOpen(!isBusinessDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  businessItems.some(item => isActive(item.to))
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                Business
                <ChevronDown className="w-4 h-4" />
              </button>
              {isBusinessDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  {businessItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsBusinessDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive(item.to)
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Connect Wallet Button */}
            <button
              onClick={connectWallet}
              disabled={isConnecting || isWalletConnected}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isWalletConnected
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm'
                  : isConnecting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? 'Connecting...' : isWalletConnected ? 'Connected' : 'Connect Wallet'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Connect Wallet Button (Mobile) */}
            <button
              onClick={connectWallet}
              disabled={isConnecting || isWalletConnected}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isWalletConnected
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : isConnecting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              }`}
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? '...' : isWalletConnected ? '✓' : <Wallet className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-fade-in">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FileCheck className="w-5 h-5" />
              Home
              {isActive('/') && <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />}
            </Link>

            {/* Mobile ZK Proofs Section */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">ZK Proofs</div>
              {zkProofItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.to)
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                    {isActive(item.to) && <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Business Section */}
            <div className="px-4 py-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Business</div>
              {businessItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.to)
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                    {isActive(item.to) && <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
