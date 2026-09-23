import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSafety } from '../context/SafetyContext';
import { useTheme } from '../context/ThemeContext';
import {
  UserCheck,
  Clock,
  FileText,
  Sliders,
  Trash2,
  Download,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Eye,
  Volume2
} from 'lucide-react';

export default function MySafetyPage() {
  const { lang, setLang, t } = useLanguage();
  const { history, incidentReports, clearHistory, openReportModal } = useSafety();
  const { theme, toggleTheme } = useTheme();

  const [filterVector, setFilterVector] = useState('ALL');
  const [highContrast, setHighContrast] = useState(false);
  const [autoVoiceAlerts, setAutoVoiceAlerts] = useState(true);

  const filteredHistory = history.filter(
    (item) => filterVector === 'ALL' || item.threatVector === filterVector
  );

  const exportHistoryJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `rakshakos-safety-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
          <UserCheck className="w-3.5 h-3.5" />
          Personal Safety Profile
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
          My Safety: Client Telemetry & History
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Zero personal data harvesting. All scan records and forensic dockets reside in your private client-side browser sandbox.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scan History & Archived Incidents (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Scan History Card */}
          <div className="cyber-card p-6 bg-slate-900/60 border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100 font-mono uppercase">
                  Local Inspection History ({filteredHistory.length})
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterVector}
                  onChange={(e) => setFilterVector(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 font-mono"
                >
                  <option value="ALL">All Threat Types</option>
                  <option value="URL">URL / PhishNet</option>
                  <option value="MESSAGE">SMS / WhatsApp</option>
                  <option value="EMAIL">Email</option>
                  <option value="CALL">Call / Vishing</option>
                  <option value="PAYMENT">OTP / Payment</option>
                  <option value="DEEPFAKE">Deepfake</option>
                </select>

                <button
                  onClick={exportHistoryJSON}
                  title="Export to JSON"
                  className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={clearHistory}
                  title="Clear Local History"
                  className="p-1.5 rounded-lg border border-rose-500/30 bg-rose-950/30 hover:bg-rose-900 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-slate-500">
                No scan records found in local memory.
              </div>
            ) : (
              <div className="space-y-2">
                {filteredHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-800 bg-slate-950/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-300 font-bold">
                          {item.threatVector}
                        </span>
                        <span
                          className={`font-bold ${
                            item.riskLevel === 'CRITICAL'
                              ? 'text-rose-400'
                              : item.riskLevel === 'HIGH'
                              ? 'text-orange-400'
                              : item.riskLevel === 'MEDIUM'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          [{item.riskLevel}]
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-slate-200 truncate max-w-md">{item.target}</p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => openReportModal(item.fullResult || item)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px]"
                      >
                        Inspect Docket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Archived Forensic Reports Card */}
          <div className="cyber-card p-6 bg-slate-900/60 border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-cyan-400" />
              Saved Incident Dockets ({incidentReports.length})
            </h3>
            {incidentReports.length === 0 ? (
              <p className="text-xs font-mono text-slate-500">
                No formal incident reports saved yet. Click "Create Incident Report" after running any high-risk threat scan.
              </p>
            ) : (
              <div className="space-y-2">
                {incidentReports.map((inc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-slate-800 bg-slate-950 flex justify-between items-center text-xs font-mono"
                  >
                    <div>
                      <span className="text-cyan-400 font-bold">Docket #{inc.id}</span>
                      <p className="text-slate-400 mt-0.5">{inc.summary}</p>
                    </div>
                    <span className="text-slate-500">{new Date(inc.created).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preferences & Accessibility (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="cyber-card p-6 bg-slate-900/60 border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-slate-100 font-mono uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Safety & Accessibility Controls
            </h3>

            {/* Language Preference */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1.5">
                Interface & Voice Language:
              </label>
              <div className="grid grid-cols-3 gap-1 font-mono text-xs">
                {['en', 'hi', 'mr'].map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${
                      lang === code
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {code === 'en' ? 'English' : code === 'hi' ? 'हिन्दी' : 'मराठी'}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-200 block">Dark / Light Mode</span>
                <span className="text-[10px] text-slate-500">Current: {theme.toUpperCase()}</span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-cyan-300"
              >
                Switch
              </button>
            </div>

            {/* High Contrast Mode */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-200 block">High Contrast</span>
                <span className="text-[10px] text-slate-500">Enhance low-vision readability</span>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
            </div>

            {/* Voice Audio Guidance */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-200 block">Audio Voice Alerts</span>
                <span className="text-[10px] text-slate-500">Speak critical fraud warnings</span>
              </div>
              <input
                type="checkbox"
                checked={autoVoiceAlerts}
                onChange={(e) => setAutoVoiceAlerts(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
            </div>
          </div>

          {/* Quick Safety Hygiene Tips */}
          <div className="cyber-card p-5 bg-slate-900/60 border-slate-800">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Golden Rules for 2026
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p>1. No police or government body issues "digital arrest" via video call.</p>
              <p>2. Entering UPI PIN or scanning QR code always pays money, never receives.</p>
              <p>3. Do not trust bank customer care numbers from Google Search advertisements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
