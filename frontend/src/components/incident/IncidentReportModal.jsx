import React from 'react';
import { useSafety } from '../../context/SafetyContext';
import {
  FileText,
  Printer,
  X,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Download,
  Calendar,
  Hash
} from 'lucide-react';

export default function IncidentReportModal() {
  const { reportModalData, closeReportModal, saveIncidentReport } = useSafety();

  if (!reportModalData) return null;

  const {
    scanId = `inc-${Date.now().toString(36)}`,
    timestamp = new Date().toISOString(),
    threatVector = 'URL / MULTIMODAL',
    riskLevel = 'CRITICAL',
    riskScore = 88,
    decision = 'BLOCK',
    indicators = [],
    reasons = [],
    recommendation = '',
    engineMeta = {},
    rawModuleOutput = {}
  } = reportModalData;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveIncident = () => {
    saveIncidentReport({
      id: scanId,
      created: timestamp,
      vector: threatVector,
      riskLevel,
      score: riskScore,
      summary: reasons[0] || 'Flagged cyber-fraud interaction'
    });
    alert('Incident report archived to local safety profile.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 p-6 md:p-8 bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:border-black">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 print:text-black print:border-black">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold print:text-xl">
                Digital Forensic Incident Report
              </h3>
              <p className="text-xs text-slate-400 print:text-gray-600 font-mono">
                RakshakOS Automated Triage Docket • For Cyber Crime Cell / Bank Grievance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>
            <button
              onClick={closeReportModal}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Forensic Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono print:bg-gray-100 print:border-gray-300">
          <div>
            <span className="text-slate-500 block text-[10px]">CASE ID / HASH:</span>
            <span className="text-cyan-400 font-bold print:text-black">{scanId}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">RECORDED AT:</span>
            <span>{new Date(timestamp).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">THREAT VECTOR:</span>
            <span className="text-slate-200 font-semibold">{threatVector}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">RISK STATUS:</span>
            <span className="text-rose-400 font-bold print:text-red-700">[{riskLevel}] {decision}</span>
          </div>
        </div>

        {/* Summary of Incident */}
        <div className="space-y-4 my-4">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 print:text-black font-bold mb-1.5">
              1. Incident Context & Evidence Summary:
            </h4>
            <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-200 print:bg-white print:border-gray-300">
              <ul className="space-y-1.5 list-disc list-inside">
                {reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Feature Indicators */}
          {indicators.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 print:text-black font-bold mb-1.5">
                2. Corroborated Forensic Indicators:
              </h4>
              <div className="space-y-1.5">
                {indicators.map((ind, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-950/30 border border-slate-800/60 text-xs flex justify-between items-center print:border-gray-300"
                  >
                    <div>
                      <strong className="text-slate-200 print:text-black">{ind.title}</strong>
                      {ind.description && (
                        <p className="text-[11px] text-slate-400 print:text-gray-600 mt-0.5">{ind.description}</p>
                      )}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 shrink-0 print:border-gray-400 print:text-black">
                      {ind.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Remediation & Official Escalation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-green-800 font-bold mb-1.5">
              3. Recommended Mitigation Actions & Official Filings:
            </h4>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 print:bg-green-50 print:text-black print:border-green-300">
              <p className="mb-2"><strong>Remediation:</strong> {recommendation}</p>
              <div className="text-[11px] text-slate-300 print:text-gray-700 space-y-1">
                <p>• <strong>National Cybercrime Helpline:</strong> Dial <strong>1930</strong> immediately to request transaction stop-payment.</p>
                <p>• <strong>Official Filing Portal:</strong> Submit evidence screenshots and transaction UTR at <strong>https://cybercrime.gov.in</strong>.</p>
                <p>• <strong>Banking Grievance:</strong> Lodge formal fraud dispute letter referencing this forensic incident token within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Signature Block */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 print:border-gray-300">
          <div>
            Generated by RakshakOS Contextual Forensic Pipeline • Ver. 2.4
          </div>
          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handleSaveIncident}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono transition-all"
            >
              Save to My Safety History
            </button>
            <button
              onClick={closeReportModal}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-xs text-slate-950 font-bold font-mono transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
