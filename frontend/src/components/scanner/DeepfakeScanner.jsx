import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import { api } from '../../services/api';
import ExplainableReport from './ExplainableReport';
import { UserCheck, ArrowRight, RotateCcw, AlertTriangle, Cpu, Radio } from 'lucide-react';

export default function DeepfakeScanner() {
  const { t } = useLanguage();
  const { addScanToHistory } = useSafety();

  const [mode, setMode] = useState('contextual'); // 'contextual' or 'simulation'
  const [mediaType, setMediaType] = useState('voice');
  const [impersonatedEntity, setImpersonatedEntity] = useState('Son studying abroad');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('50000');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const sampleDeepfakeScenarios = [
    {
      label: 'AI Voice Clone Kidnapping / Urgent Hospital (Audio)',
      type: 'voice',
      entity: 'Daughter in college hostel',
      amt: '85000',
      value: 'Received an audio call from a voice sounding exactly like my daughter crying. She said she had an accident in Pune, her phone broke, and the doctor needed ₹85,000 immediately for surgery. The caller told me not to call her phone because it was damaged and to immediately send the money via Google Pay to an unfamiliar UPI number.'
    },
    {
      label: 'Executive Video Call Fund Transfer (Video)',
      type: 'video',
      entity: 'Managing Director / CEO',
      amt: '450000',
      value: 'Joined a brief Microsoft Teams video meeting where the CEO instructed me to process an urgent confidential vendor invoice payment before market close. Video had slight unnatural blinking and collar artifacts.'
    }
  ];

  const handleScan = async (e) => {
    if (e) e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.scanDeepfake({
        mode,
        scenarioDescription: description,
        mediaType,
        impersonatedEntity,
        financialDemandAmount: amount
      });
      setResult(data);
      addScanToHistory(data, `AI Impersonation (${impersonatedEntity || mediaType})`);
    } catch (err) {
      setError(err.message || 'Failed to analyze scenario');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDescription('');
    setResult(null);
    setError('');
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-cyan-400" />
          Deepfake & AI-Persona Fraud Research Laboratory
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Investigates emerging generative-AI fraud threats: acoustic voice cloning, video face-swap pretexting, and distress coercion.
        </p>
      </div>

      {/* Dual Mode Switcher: Mode A vs Mode B */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => setMode('contextual')}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'contextual'
              ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400'
              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Mode A: Supported Contextual Analysis
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Active Engine
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Real algorithmic evaluation of distress triggers, out-of-band communication evasion, and diversion anomalies.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setMode('simulation')}
          className={`p-3 rounded-xl border text-left transition-all ${
            mode === 'simulation'
              ? 'border-indigo-400 bg-indigo-950/40 shadow-[0_0_15px_rgba(99,102,241,0.2)] ring-1 ring-indigo-400'
              : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-indigo-400" />
              Mode B: Research Simulation Pipeline
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Research Demo
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Demonstrates future planned ASVspoof neural acoustic spectral analysis and facial landmark jitter classification.
          </p>
        </button>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] font-mono text-slate-500">Preset Scenarios:</span>
        {sampleDeepfakeScenarios.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDescription(sample.value);
              setMediaType(sample.type);
              setImpersonatedEntity(sample.entity);
              setAmount(sample.amt);
            }}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 font-mono transition-all border border-slate-700/60"
          >
            {sample.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleScan} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Media Modality:</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="voice">Audio / Voice Call</option>
              <option value="video">Video Call / Stream</option>
              <option value="image">Identity Image / Photo</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Alleged Identity:</label>
            <input
              type="text"
              value={impersonatedEntity}
              onChange={(e) => setImpersonatedEntity(e.target.value)}
              placeholder="e.g. Son, Daughter, CEO, Police"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Demand Amount (₹):</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 50000"
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-mono text-slate-400 block mb-1">Incident Scenario Details:</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what occurred, what was said, any voice/video anomalies observed, and the requested payment route..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-sans resize-none"
          ></textarea>
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
            disabled={loading || !description.trim()}
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
