import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { SafetyProvider } from './context/SafetyContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import IncidentReportModal from './components/incident/IncidentReportModal';
import EmergencyModal from './components/incident/EmergencyModal';

import LandingPage from './pages/LandingPage';
import SecurityCenter from './pages/SecurityCenter';
import UnifiedScanner from './components/scanner/UnifiedScanner';
import ThreatIntelPage from './pages/ThreatIntelPage';
import EducationPage from './pages/EducationPage';
import ResearchDashboard from './pages/ResearchDashboard';
import MySafetyPage from './pages/MySafetyPage';
import OsBoundarySimulator from './components/simulator/OsBoundarySimulator';
import SihInnovationPage from './pages/SihInnovationPage';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SafetyProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-[#050811] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 font-sans">
              <Navbar />

              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/security-center" element={<SecurityCenter />} />
                  <Route path="/scanner" element={<UnifiedScanner />} />
                  <Route path="/threat-intel" element={<ThreatIntelPage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/research" element={<ResearchDashboard />} />
                  <Route path="/my-safety" element={<MySafetyPage />} />
                  <Route path="/simulator" element={<OsBoundarySimulator />} />
                  <Route path="/sih-innovation" element={<SihInnovationPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />

              {/* Global Modals */}
              <IncidentReportModal />
              <EmergencyModal />
            </div>
          </Router>
        </SafetyProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
