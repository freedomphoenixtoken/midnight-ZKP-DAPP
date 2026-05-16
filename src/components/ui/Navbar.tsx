import { Link, useLocation } from 'react-router-dom';
import { Shield, ShieldCheck, FileCheck, Lock, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: '/', icon: FileCheck, label: 'Home' },
    { to: '/compliance', icon: Shield, label: 'Compliance' },
    { to: '/rental-trust', icon: ShieldCheck, label: 'Rental Trust' },
    { to: '/verify', icon: FileCheck, label: 'Verify' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl group-hover:animate-pulse">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Midnight ZKP
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Privacy-First</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.to)
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive(item.to) && <Sparkles className="w-3 h-3 text-blue-600 animate-pulse" />}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.to)
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  {isActive(item.to) && <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
