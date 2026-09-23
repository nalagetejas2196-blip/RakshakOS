import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import RiskGauge from '../common/RiskGauge';
import {
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Info,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';

export default function ExplainableReport({ scanResult }) {
  const { t } = useLanguage();
  const { openReportModal, openEmergencyModal } = useSafety();
  const [isExpanded, setIsExpanded] = useState(true);

  if (!scanResult) return null;

  const {
    riskScore = 0,
    riskLevel = 'LOW',
    decision = 'ALLOW',
    decisionLabel = '',
    reasons = [],
    indicators = [],
    recommendation = '',
    engineMeta = {},
    processingTimeMs = 12,
    threatVector = 'URL'
  } = scanResult;

  const isDangerous = riskLevel === 'CRITICAL' || riskLevel === 'HIGH';

  return (
    <div className="cyber-card p-6 mt-6 border-slate-700/60 bg-slate-900/80 animate-fadeIn">
      {/* Top Risk Gauge Banner */}
      <RiskGauge
        score={riskScore}
        riskLevel={riskLevel}
        decision={decision}
        decisionLabel={decisionLabel}
      />

      {/* Engine & Processing Metadata Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 px-3 py-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-400">
        <div>
          <span className="text-slate-500">Module: </span>
          <span className="text-cyan-400 font-semibold">{engineMeta.primaryModule || 'PhishNet / Multimodal Engine'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Inference: <strong className="text-slate-200">{processingTimeMs} ms</strong></span>
          <span>Standards: <strong className="text-slate-200">NIST AI RMF 1.0</strong></span>
        </div>
      </div>

      {/* Expandable "Why Was This Flagged?" Section */}
      <div className="mt-5 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-all border-b border-slate-800/80"
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-1.5 rounded-md ${isDangerous ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {isDangerous ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                {t('xai_title', 'Why Was This Flagged?')}
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  (Explainable AI Attribution)
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                {t('xai_subtitle', 'Human-readable feature attribution and risk breakdown')}
              </p>
            </div>
          </div>
          <div className="p-1 rounded bg-slate-800 text-slate-300">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isExpanded && (
          <div className="p-5 space-y-4">
            {/* Primary Natural Language Reasons */}
            <div>
              <h5 className="text-xs font-mono uppercase text-slate-400 mb-2">
                Primary Corroborating Evidence:
              </h5>
              <ul className="space-y-2">
                {reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold text-cyan-400 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extracted Specific Threat Indicators with Weights */}
            {indicators.length > 0 && (
              <div className="border-t border-slate-800 pt-3">
                <h5 className="text-xs font-mono uppercase text-slate-400 mb-2.5">
                  Extracted Indicators & Severity Weights:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {indicators.map((ind, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg border border-slate-800/80 bg-slate-900/60 flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              ind.severity === 'CRITICAL'
                                ? 'bg-rose-500'
                                : ind.severity === 'HIGH'
                                ? 'bg-orange-500'
                                : ind.severity === 'MEDIUM'
                                ? 'bg-amber-400'
                                : 'bg-cyan-400'
                            }`}
                          />
                          <span className="text-xs font-semibold text-slate-200">{ind.title}</span>
                        </div>
                        {ind.description && (
                          <p className="text-[11px] text-slate-400 leading-snug">{ind.description}</p>
                        )}
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 shrink-0 border border-slate-700/50">
                        +{ind.weight || 15} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Proactive Actions */}
            <div className="border-t border-slate-800 pt-3">
              <h5 className="text-xs font-mono uppercase text-emerald-400 mb-1.5">
                {t('xai_recommendations', 'Proactive Defensive Actions')}:
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/90 border border-emerald-500/20 p-3 rounded-lg">
                🛡️ {recommendation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons: Generate Incident Report & Emergency Mode */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={() => openReportModal(scanResult)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 text-xs font-semibold font-mono transition-all"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          {t('btn_create_report', 'Create Incident Report')}
        </button>

        {isDangerous && (
          <button
            onClick={openEmergencyModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 text-xs font-semibold font-mono transition-all"
          >
            <LifeBuoy className="w-4 h-4 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
            {t('btn_emergency_help', 'Emergency Containment Protocol')}
          </button>
        )}
      </div>
    </div>
  );
}
