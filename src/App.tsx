import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { HomePage } from './pages/HomePage';
import { CompliancePage } from './pages/CompliancePage';
import { RentalTrustPage } from './pages/RentalTrustPage';
import { VerificationPage } from './pages/VerificationPage';
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
