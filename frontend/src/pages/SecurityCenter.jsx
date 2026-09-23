import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSafety } from '../context/SafetyContext';
import ThreatRadar from '../components/common/ThreatRadar';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock,
  ExternalLink,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';

export default function SecurityCenter() {
  const { t } = useLanguage();
  const { history, stats, openReportModal, openEmergencyModal } = useSafety();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Top Banner: Digital Safety Status */}
      <div className="cyber-card p-6 md:p-8 bg-slate-900/80 border-slate-700/60 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Protection Status: ACTIVE & ENFORCING
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
              Digital Safety Status
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Real-time monitoring across mobile interaction boundaries. All inbound links, messages, and calls are pre-screened before credential exposure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/scanner')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
            >
              Scan a Suspicious Target
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openEmergencyModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 text-xs font-mono transition-all"
            >
              Emergency Helpline (1930)
            </button>
          </div>
        </div>

        {/* Status Indicators Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">CURRENT THREAT LEVEL:</span>
            <span className="text-amber-400 font-bold">ELEVATED (MONITORED)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">SAFETY INDEX:</span>
            <span className="text-emerald-400 font-bold">{stats.digitalSafetyIndex} / 100 (HIGH)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ACTIVE QUARANTINES:</span>
            <span className="text-rose-400 font-bold">2 TARGETS ISOLATED</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">INSPECTION ENGINE:</span>
            <span className="text-cyan-400 font-bold">PhishNet ML 2.4</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Telemetry Cards & Active Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metric Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Disclosure notice for statistics */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
            <span>Core Telemetry Metrics</span>
            <span className="text-amber-400/90 bg-amber-950/30 border border-amber-500/20 px-2 py-0.5 rounded">
              ⚠️ {t('demo_notice', 'Prototype demonstration data')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="cyber-card p-4 bg-slate-900/60 border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                {t('stat_threats_detected', 'Threats Blocked')}
              </span>
              <div className="text-2xl font-extrabold font-mono text-rose-400">
                {stats.threatsDetected}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">99.2% auto-quarantine</span>
            </div>

            <div className="cyber-card p-4 bg-slate-900/60 border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                {t('stat_safe_checks', 'Safe Interactions')}
              </span>
              <div className="text-2xl font-extrabold font-mono text-emerald-400">
                {stats.safeChecks}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Zero false positives</span>
            </div>

            <div className="cyber-card p-4 bg-slate-900/60 border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                {t('stat_high_risk', 'Active Quarantine')}
              </span>
              <div className="text-2xl font-extrabold font-mono text-amber-400">
                {stats.highRiskQuarantine}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Under inspection</span>
            </div>

            <div className="cyber-card p-4 bg-slate-900/60 border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                {t('stat_protected_sessions', 'Monitored Sessions')}
              </span>
              <div className="text-2xl font-extrabold font-mono text-cyan-400">
                {stats.protectedSessions}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Continuous defense</span>
            </div>
          </div>

          {/* Recent Scans Table */}
          <div className="cyber-card p-6 bg-slate-900/60 border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono uppercase">
                <Clock className="w-4 h-4 text-cyan-400" />
                Recent Automated Scans
              </h3>
              <button
                onClick={() => navigate('/my-safety')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                View Full Logs <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Vector</th>
                    <th className="pb-2">Target / Pretext</th>
                    <th className="pb-2">Risk</th>
                    <th className="pb-2">Decision</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {history.slice(0, 5).map((scan, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="py-2.5 text-slate-500">
                        {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2.5">
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {scan.threatVector}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-200 max-w-[200px] truncate" title={scan.target}>
                        {scan.target}
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`font-semibold ${
                            scan.riskLevel === 'CRITICAL'
                              ? 'text-rose-400'
                              : scan.riskLevel === 'HIGH'
                              ? 'text-orange-400'
                              : scan.riskLevel === 'MEDIUM'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {scan.riskLevel}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-300">[{scan.decision}]</td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => openReportModal(scan.fullResult || scan)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                        >
                          Docket
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Live Radar Visual & Quick Defense Protocols */}
        <div className="lg:col-span-4 space-y-6">
          <div className="cyber-card p-6 bg-slate-900/60 border-slate-800 text-center">
            <h3 className="text-xs font-mono uppercase text-slate-400 mb-4">
              Real-Time Signal Radar
            </h3>
            <ThreatRadar activeCount={4} threatLevel="Active Shield" />
            <p className="text-[11px] text-slate-400 mt-6 leading-relaxed">
              Detecting cross-channel anomalies across SMS gateways, incoming call audio heuristics, and browser navigation sockets.
            </p>
          </div>

          <div className="cyber-card p-5 bg-slate-900/60 border-slate-800">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              Active System Protections
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>PhishNet 111-Feature Classifier</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Reverse UPI QR Anti-Debit Guard</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Digital Arrest Vishing Pattern Filter</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Contextual Distress & Synthetic Voice Hook</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
