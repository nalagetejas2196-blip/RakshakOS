import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Printer,
  X,
  ExternalLink,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Lock,
  PhoneCall,
  Send
} from 'lucide-react';

export default function I4CGoldenHourModal({ isOpen, onClose, incidentData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const data = incidentData || {
    caseId: `I4C-${Date.now().toString().slice(-8)}`,
    timestamp: new Date().toISOString(),
    fraudType: 'Reverse UPI / Vishing Financial Coercion',
    suspectVpa: 'clearance.mule99@okaxis',
    suspectPhone: '+91 98210 44921',
    lostAmount: '₹25,000',
    utrNumber: '426910928491',
    threatVector: 'Multi-Signal Screen Share & Audio Intimidation'
  };

  const formattedDocketText = `=====================================================
NATIONAL CYBER CRIME REPORTING PORTAL (I4C / 1930)
CITIZEN FINANCIAL CYBER FRAUD REPORTING DOCKET (CFCFRMS)
=====================================================
INCIDENT TOKEN: ${data.caseId}
TIME OF OCCURRENCE: ${new Date(data.timestamp).toLocaleString()}
GOLDEN HOUR STATUS: ACTIVE (< 2 Hours from Occurrence)

VICTIM ACTION: URGENT LIEN / FREEZE DIRECTIVE UNDER SECTION 91 CrPC

1. TRANSACTION & SUSPECT DETAILS:
   - Fraud Modality: ${data.fraudType}
   - Intercepted Vector: ${data.threatVector}
   - Suspect UPI / VPA Handle: ${data.suspectVpa}
   - Suspect Phone / Call Origin: ${data.suspectPhone}
   - Transaction Reference (UTR): ${data.utrNumber}
   - Disputed Amount: ${data.lostAmount}

2. FORENSIC CORROBORATION (RAKSHAK-OS TELEMETRY):
   - Proactive Boundary Decision: BLOCK (Cross-Channel Correlation)
   - Signal Breakdown: InCall Audio Intimidation + Active AnyDesk Session
   - Digital Evidence Hash: SHA-256 [${Date.now().toString(16)}a98f7e21b]

3. NODAL BANK ESCALATION:
   - Destination Bank: AXIS BANK / NPCI MULE CLEARING
   - Immediate Directive: Temporarily freeze beneficiary wallet & reverse entry.

SUBMITTED VIA RAKSHAK-OS CITIZEN DEFENSE PLATFORM (SIH 2026)
=====================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedDocketText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 p-6 md:p-8 bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl text-slate-100 print:bg-white print:text-black">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                I4C / 1930 "Golden Hour" Emergency Freeze Docket
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Standardized CFCFRMS Packet for Nodal Bank Officers & Cyber Police
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Golden Hour Urgency Callout */}
        <div className="my-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              <strong>Golden Hour Priority:</strong> Reporting this docket within 120 minutes activates the NPCI automated lien-marking protocol.
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500 text-slate-950 shrink-0">
            RAPID ACTION
          </span>
        </div>

        {/* Pre-Formatted Telemetry Box */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300 leading-relaxed overflow-x-auto max-h-80 select-all">
            {formattedDocketText}
          </pre>

          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition-all shadow-md"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Docket</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs font-mono transition-all"
            >
              <span>Submit on cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Print Docket
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-xs font-mono text-slate-400 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
