import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import {
  ShieldAlert,
  Search,
  Filter,
  ExternalLink,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export default function ThreatIntelPage() {
  const { t } = useLanguage();
  const [intelData, setIntelData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const categories = [
    'ALL',
    'Banking Phishing',
    'Utility Smishing',
    'SMS Sender Header',
    'Reverse QR',
    'Digital Arrest'
  ];

  const fetchIntel = async () => {
    setLoading(true);
    try {
      const res = await api.getThreatIntel(query, category);
      setIntelData(res.indicators || []);
      setMeta(res.meta || null);
    } catch (err) {
      console.warn('Threat intel fetch fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIntel();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchIntel();
  };

  return (
    <div className="space-y-6">
      {/* Title & Academic Transparency Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Regional Threat Intelligence Feed
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
            Indicators of Compromise (IOCs)
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Correlated cyber-fraud telemetry from CERT-In advisories, TRAI SMS scrutiny, and the PhishNet ML repository.
          </p>
        </div>

        {/* Clear Demonstration Labeling (Section 15 Compliance) */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-right">
          <span className="text-[11px] font-mono text-amber-300 font-bold block">
            ⚠️ Demonstration Threat Intelligence
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            Seeded regional campaign signatures. Extensible to live MISP / OTX feeds.
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="cyber-card p-4 bg-slate-900/60 border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search indicator, domain, brand (e.g. sbi, electricity, telegram)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* IOC Grid / Table */}
      <div className="cyber-card bg-slate-900/60 border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Active Indicators Tracked: <strong className="text-cyan-400">{intelData.length}</strong>
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Updated Hourly • Automated Blocklist Feed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="p-3.5">Threat Indicator (IOC)</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Threat Vector & Campaign</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">Confidence</th>
                <th className="p-3.5">First Observed</th>
                <th className="p-3.5 text-right">Policy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    <span className="inline-block w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-2"></span>
                    Loading threat intelligence database...
                  </td>
                </tr>
              ) : intelData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No threat indicators match the selected search query or category filter.
                  </td>
                </tr>
              ) : (
                intelData.map((ioc) => (
                  <tr key={ioc.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-bold text-slate-100">
                      <span className="text-cyan-300 hover:underline">{ioc.indicator}</span>
                      <div className="flex gap-1 mt-1">
                        {ioc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-400">{ioc.type}</td>
                    <td className="p-3.5 text-slate-300 max-w-[220px]">
                      {ioc.category}
                      <span className="text-[10px] text-slate-500 block truncate">
                        Src: {ioc.source}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          ioc.severity === 'CRITICAL'
                            ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                            : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        }`}
                      >
                        {ioc.severity}
                      </span>
                    </td>
                    <td className="p-3.5 text-emerald-400 font-semibold">{ioc.confidence}</td>
                    <td className="p-3.5 text-slate-500">
                      {new Date(ioc.firstSeen).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                        {ioc.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
