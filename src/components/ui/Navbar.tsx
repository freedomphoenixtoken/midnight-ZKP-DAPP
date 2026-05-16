import { Link, useLocation } from 'react-router-dom';
import { Shield, ShieldCheck, FileCheck } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Midnight ZKP DApp</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <FileCheck className="w-4 h-4" />
              Home
            </Link>
            <Link
              to="/compliance"
              className={`flex items-center gap-2 text-sm font-medium ${isActive('/compliance') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Shield className="w-4 h-4" />
              Compliance
            </Link>
            <Link
              to="/rental-trust"
              className={`flex items-center gap-2 text-sm font-medium ${isActive('/rental-trust') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              Rental Trust
            </Link>
            <Link
              to="/verify"
              className={`flex items-center gap-2 text-sm font-medium ${isActive('/verify') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <FileCheck className="w-4 h-4" />
              Verify
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
