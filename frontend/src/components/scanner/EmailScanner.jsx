import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import { api } from '../../services/api';
import ExplainableReport from './ExplainableReport';
import { Mail, ArrowRight, RotateCcw } from 'lucide-react';

export default function EmailScanner() {
  const { t } = useLanguage();
  const { addScanToHistory } = useSafety();

  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [link, setLink] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const sampleEmail = () => {
    setSender('State Bank of India <sbi.security.update91@gmail.com>');
    setSubject('URGENT: Mandatory NetBanking KYC re-authentication required');
    setBody('Dear Valued Customer,\n\nWe have detected irregular login attempts on your SBI savings account. Per RBI mandate 2026, your internet banking access will be permanently suspended within 24 hours.\n\nPlease click below to re-verify your KYC credentials and avoid account lock.');
    setLink('http://secure-sbi-portal.xyz/verify-login.html');
  };

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!sender.trim() && !subject.trim() && !body.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.scanEmail({
        sender,
        subject,
        body,
        links: link ? [link] : []
      });
      setResult(data);
      addScanToHistory(data, subject || sender || 'Email Analysis');
    } catch (err) {
      setError(err.message || 'Failed to scan email');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSender('');
    setSubject('');
    setBody('');
    setLink('');
    setResult(null);
    setError('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyan-400" />
            Email Header Spoofing & Credential Harvesting Analyzer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Detects free provider spoofing, high-urgency subject vectors, and embedded malicious landing pages.
          </p>
        </div>
        <button
          type="button"
          onClick={sampleEmail}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono border border-slate-700 transition-all shrink-0"
        >
          Load Spoofed Email Preset
        </button>
      </div>

      <form onSubmit={handleScan} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Sender (From Header):</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="e.g. HDFC Support <hdfc.alert@gmail.com>"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Subject Line:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. URGENT: Salary revision / Account locked"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1">Email Body Content:</label>
          <textarea
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Paste the full email text here..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans resize-none"
          ></textarea>
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1">Embedded Link (Optional):</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Paste call-to-action link from email if any..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
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
            disabled={loading || (!sender.trim() && !subject.trim() && !body.trim())}
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
