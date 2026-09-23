import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import { api } from '../../services/api';
import ExplainableReport from './ExplainableReport';
import { QrCode, ArrowRight, RotateCcw, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function PaymentScanner() {
  const { t } = useLanguage();
  const { addScanToHistory } = useSafety();

  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const sampleScenarios = [
    {
      label: 'Reverse QR Scam ("Scan to Receive")',
      value: 'A buyer on OLX sent me a QR code and said: "Scan this QR code and enter your UPI PIN to receive the ₹7,500 advance payment into your Google Pay account."'
    },
    {
      label: 'OTP for Refund',
      value: 'Someone called claiming to be from customer care and said they are issuing my refund of ₹1,800. They told me they just sent a 6-digit OTP to my phone and I must read it out so the refund can be credited.'
    },
    {
      label: 'Screen Share During Payment',
      value: 'Customer support executive on phone asked me to start screen sharing via AnyDesk while I open my PhonePe app to authorize a pending cashback.'
    }
  ];

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!scenario.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.scanPayment(scenario);
      setResult(data);
      addScanToHistory(data, 'Payment & OTP Scenario Analysis');
    } catch (err) {
      setError(err.message || 'Failed to analyze payment scenario');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setScenario('');
    setResult(null);
    setError('');
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <QrCode className="w-5 h-5 text-cyan-400" />
          Reverse UPI QR & Coerced OTP Scam Engine
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Analyzes structural financial contradictions (e.g. entering UPI PIN / sharing OTP to "receive" funds).
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-slate-500">Preset Scenarios:</span>
        {sampleScenarios.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setScenario(sample.value)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 font-mono transition-all border border-slate-700/60"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleScan} className="space-y-3">
        <textarea
          rows={4}
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Describe the payment or OTP scenario (e.g., 'Buyer told me to scan QR to get money...')"
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
            disabled={loading || !scenario.trim()}
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

      {/* Immediate Golden Rules Banner if Critical */}
      {result && result.riskLevel === 'CRITICAL' && (
        <div className="mt-5 p-4 rounded-xl border border-rose-500/50 bg-rose-950/40">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2 mb-2">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            Immutable Financial Rule Alert:
          </h4>
          <ul className="text-xs text-rose-200 space-y-1 list-disc list-inside">
            <li>You <strong>NEVER</strong> enter your UPI PIN to receive money. PIN is solely for debiting your account.</li>
            <li>You <strong>NEVER</strong> scan a QR code to receive a refund. QR scanning initiates an outgoing payment.</li>
            <li>Banks and reputable payment apps will <strong>NEVER</strong> ask for your OTP over phone or chat.</li>
          </ul>
        </div>
      )}

      {result && <ExplainableReport scanResult={result} />}
    </div>
  );
}
