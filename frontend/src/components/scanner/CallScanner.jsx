import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import { api } from '../../services/api';
import ExplainableReport from './ExplainableReport';
import { PhoneCall, ArrowRight, RotateCcw, AlertTriangle, Clock } from 'lucide-react';

export default function CallScanner() {
  const { t } = useLanguage();
  const { addScanToHistory } = useSafety();

  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const sampleCalls = [
    {
      label: 'Digital Arrest / Fake Police (High Risk)',
      value: 'Caller identified himself as Senior Inspector Sharma from Delhi Cyber Crime Branch. Said a FedEx parcel with 140 grams of MDMA drugs was seized in Mumbai registered under my Aadhaar. He placed me under "digital arrest" via Skype video, told me not to hang up or speak to family, and demanded I transfer ₹2,50,000 to an RBI verification account to clear my name.'
    },
    {
      label: 'Remote Desktop / AnyDesk Scam',
      value: 'Caller said my bank debit card was temporarily blocked due to pending KYC update. He told me to immediately download AnyDesk from Play Store and read out the 9 digit code so his system could remotely calibrate my bank app. He also asked me to read the incoming 6-digit OTP.'
    },
    {
      label: 'Legitimate Bank Call Pretext',
      value: 'Caller from bank asked if I recently performed an international transaction of ₹12,000 on my credit card. When I said no, she advised me to log in to my official mobile app and freeze the card myself, and did NOT ask for OTP or passwords.'
    }
  ];

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!transcript.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.scanCall(transcript);
      setResult(data);
      addScanToHistory(data, 'Call Transcript Analysis');
    } catch (err) {
      setError(err.message || 'Failed to analyze call scenario');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTranscript('');
    setResult(null);
    setError('');
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-cyan-400" />
          Scam Call / Vishing Scenario Evaluation & Coercion Timeline
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Evaluates reported conversations for digital arrest coercion, fake law enforcement pressure, AnyDesk/TeamViewer takeover, and live OTP extortion.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-slate-500">Preset Transcripts:</span>
        {sampleCalls.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setTranscript(sample.value)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 font-mono transition-all border border-slate-700/60"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleScan} className="space-y-3">
        <textarea
          rows={5}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Describe the phone call or paste transcript (e.g., 'Caller claimed my account is blocked unless I share OTP...')"
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans resize-none"
        ></textarea>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs font-mono transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('btn_clear', 'Clear Input')}
          </button>

          <button
            type="submit"
            disabled={loading || !transcript.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-xs hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all font-mono"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                {t('btn_scanning', 'Running Inference...')}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {t('btn_scan', 'Analyze Threat Context')}
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 rounded-lg border border-rose-500/40 bg-rose-950/30 text-rose-300 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Render Coercion Timeline if present in call scan */}
      {result && result.rawModuleOutput?.timeline?.length > 0 && (
        <div className="cyber-card p-5 mt-5 border-amber-500/30 bg-slate-950/80">
          <h4 className="text-xs font-mono uppercase text-amber-400 flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" />
            Detected Call Coercion Escalation Timeline:
          </h4>
          <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
            {result.rawModuleOutput.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 pl-1 relative">
                <span className="w-5 h-5 rounded-full bg-slate-900 border border-amber-500/50 text-amber-400 font-mono text-[10px] flex items-center justify-center shrink-0 z-10">
                  {step.step}
                </span>
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{step.stage}</span>
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-500/30">
                      {step.riskSeverity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{step.explanation}</p>
                  <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                    Trigger tokens: "{step.detectedTrigger}"
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && <ExplainableReport scanResult={result} />}
    </div>
  );
}
