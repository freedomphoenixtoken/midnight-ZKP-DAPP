import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { HomePage } from './pages/HomePage';
import { CompliancePage } from './pages/CompliancePage';
import { RentalTrustPage } from './pages/RentalTrustPage';
import { VerificationPage } from './pages/VerificationPage';
import { AirdropEligibilityPage } from './pages/AirdropEligibilityPage';
import { RoyaltyCompliancePage } from './pages/RoyaltyCompliancePage';
import { GovernancePowerPage } from './pages/GovernancePowerPage';
import { WidgetsPage } from './pages/WidgetsPage';
import { MarketplaceDemoPage } from './pages/MarketplaceDemoPage';
import { DashboardPage } from './pages/DashboardPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { BusinessPage } from './pages/BusinessPage';
import { ComparisonPage } from './pages/ComparisonPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { UseCasesPage } from './pages/UseCasesPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
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
              <Route path="/widgets" element={<WidgetsPage />} />
              <Route path="/marketplace-demo" element={<MarketplaceDemoPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/business" element={<BusinessPage />} />
              <Route path="/comparison" element={<ComparisonPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/use-cases" element={<UseCasesPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
