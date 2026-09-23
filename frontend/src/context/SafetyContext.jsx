import React, { createContext, useContext, useState, useEffect } from 'react';

const SafetyContext = createContext();

const INITIAL_HISTORY = [
  {
    scanId: 'scan-demo-01',
    timestamp: '2026-09-23T18:14:00Z',
    threatVector: 'URL',
    target: 'http://sbi-online-kyc-verification.com/login.php',
    riskLevel: 'CRITICAL',
    riskScore: 88,
    decision: 'BLOCK',
    engine: 'PhishNet ML Ensemble v2.4 (Random Forest 96.8%)'
  },
  {
    scanId: 'scan-demo-02',
    timestamp: '2026-09-23T17:40:00Z',
    threatVector: 'PAYMENT',
    target: 'Reverse QR Code: "Scan to receive Rs. 5000 refund"',
    riskLevel: 'CRITICAL',
    riskScore: 92,
    decision: 'BLOCK',
    engine: 'RakshakOS Payment Coercion Detector'
  },
  {
    scanId: 'scan-demo-03',
    timestamp: '2026-09-23T15:02:00Z',
    threatVector: 'URL',
    target: 'https://incometax.gov.in/iec/foportal/',
    riskLevel: 'LOW',
    riskScore: 8,
    decision: 'ALLOW',
    engine: 'PhishNet Whitelist Validation'
  }
];

export function SafetyProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('rakshakos_history');
      return saved ? JSON.parse(saved) : INITIAL_HISTORY;
    } catch {
      return INITIAL_HISTORY;
    }
  });

  const [incidentReports, setIncidentReports] = useState(() => {
    try {
      const saved = localStorage.getItem('rakshakos_incidents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentScan, setCurrentScan] = useState(null);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState('senior');

  // Stats: Clearly marked as prototype demonstration telemetry
  const stats = {
    threatsDetected: 412,
    safeChecks: 1895,
    highRiskQuarantine: 38,
    protectedSessions: 2345,
    digitalSafetyIndex: 94
  };

  useEffect(() => {
    try {
      localStorage.setItem('rakshakos_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save scan history to localStorage', e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem('rakshakos_incidents', JSON.stringify(incidentReports));
    } catch (e) {
      console.warn('Failed to save incidents to localStorage', e);
    }
  }, [incidentReports]);

  const addScanToHistory = (scanResult, targetLabel) => {
    setCurrentScan(scanResult);
    const newEntry = {
      scanId: scanResult.scanId || `scan-${Date.now()}`,
      timestamp: scanResult.timestamp || new Date().toISOString(),
      threatVector: scanResult.threatVector || 'UNKNOWN',
      target: targetLabel || 'Input Target',
      riskLevel: scanResult.riskLevel || 'LOW',
      riskScore: scanResult.riskScore || 0,
      decision: scanResult.decision || 'ALLOW',
      engine: scanResult.engineMeta?.primaryModule || 'RakshakOS Engine',
      fullResult: scanResult
    };
    setHistory(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 scans
  };

  const saveIncidentReport = (report) => {
    setIncidentReports(prev => [report, ...prev]);
  };

  const openEmergencyModal = () => setIsEmergencyOpen(true);
  const closeEmergencyModal = () => setIsEmergencyOpen(false);

  const openReportModal = (scanData) => setReportModalData(scanData || currentScan);
  const closeReportModal = () => setReportModalData(null);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('rakshakos_history');
  };

  return (
    <SafetyContext.Provider
      value={{
        history,
        currentScan,
        setCurrentScan,
        addScanToHistory,
        incidentReports,
        saveIncidentReport,
        stats,
        isEmergencyOpen,
        openEmergencyModal,
        closeEmergencyModal,
        reportModalData,
        openReportModal,
        closeReportModal,
        selectedPersona,
        setSelectedPersona,
        clearHistory
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
}

export function useSafety() {
  return useContext(SafetyContext);
}
