import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import { api } from '../../services/api';
import ExplainableReport from './ExplainableReport';
import { MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';

export default function MessageScanner() {
  const { t } = useLanguage();
  const { addScanToHistory } = useSafety();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const sampleMessages = [
    {
      label: 'Fake Electricity Cut (Marathi)',
      value: 'प्रिय ग्राहक, तुमची वीज आज रात्री ९:३० वाजता खंडित होईल कारण मागील महिन्याचे बिल अपडेट नाही. तात्काळ संपर्क साधा: bit.ly/mseb-bill-update'
    },
    {
      label: 'Urgent SBI Block (English)',
      value: 'Dear Customer, your SBI netbanking access has been suspended today due to missing KYC. Update PAN immediately to avoid fine: http://sbi-pan-update.xyz'
    },
    {
      label: 'YouTube Task Scam (Hindi)',
      value: 'बधाई हो! आपको यूट्यूब वीडियो लाइक करने के लिए चुना गया है। रोजाना ₹३००० कमाएं। तुरंत टेलीग्राम पर संपर्क करें और कार्य शुरू करें।'
    }
  ];

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.scanMessage(text);
      setResult(data);
      addScanToHistory(data, text.slice(0, 45) + '...');
    } catch (err) {
      setError(err.message || 'Failed to scan message');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setError('');
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          SMS / WhatsApp Social Engineering Scanner
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Analyzes psychological urgency triggers, OTP extortion patterns, financial baiting, and embedded shortlinks.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-slate-500">Preset Scenarios:</span>
        {sampleMessages.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setText(sample.value)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 font-mono transition-all border border-slate-700/60"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleScan} className="space-y-3">
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste SMS text, WhatsApp forward, or suspicious message..."
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans resize-none"
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
            disabled={loading || !text.trim()}
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

      {result && <ExplainableReport scanResult={result} />}
    </div>
  );
}
