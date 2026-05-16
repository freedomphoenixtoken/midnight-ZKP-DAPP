import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { HomePage } from './pages/HomePage';
import { CompliancePage } from './pages/CompliancePage';
import { RentalTrustPage } from './pages/RentalTrustPage';
import { VerificationPage } from './pages/VerificationPage';
import { AirdropEligibilityPage } from './pages/AirdropEligibilityPage';
import { RoyaltyCompliancePage } from './pages/RoyaltyCompliancePage';
import { GovernancePowerPage } from './pages/GovernancePowerPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/rental-trust" element={<RentalTrustPage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/airdrop-eligibility" element={<AirdropEligibilityPage />} />
            <Route path="/royalty-compliance" element={<RoyaltyCompliancePage />} />
            <Route path="/governance-power" element={<GovernancePowerPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
