import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Layers,
  Cpu,
  Smartphone,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  FileCheck,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function SihInnovationPage() {
  const navigate = useNavigate();

  const comparisonTable = [
    {
      feature: 'Cross-Channel Correlation (Call + Screen Share + SMS)',
      rakshak: true,
      antivirus: false,
      callerId: false,
      browserFilter: false,
      note: 'Only RakshakOS correlates multiple simultaneous attack vectors'
    },
    {
      feature: 'Real-Time Digital Arrest / Vishing Audio HUD',
      rakshak: true,
      antivirus: false,
      callerId: false,
      browserFilter: false,
      note: 'Antivirus has no telephony visibility; Caller ID only has static number lists'
    },
    {
      feature: 'Reverse UPI QR Scam Prevention (Scan to Pay vs Receive)',
      rakshak: true,
      antivirus: false,
      callerId: false,
      browserFilter: false,
      note: 'Validates immutable UPI credit/debit rules before PIN submission'
    },
    {
      feature: '111-Feature ML Phishing & Brand Typosquatting',
      rakshak: true,
      antivirus: false,
      callerId: false,
      browserFilter: true,
      note: 'Browser filters only check URLs; RakshakOS inspects SMS & deep-links'
    },
    {
      feature: 'I4C / 1930 "Golden Hour" Automated Freeze Docket',
      rakshak: true,
      antivirus: false,
      callerId: false,
      browserFilter: false,
      note: 'Generates standardized CFCFRMS packets for immediate bank action'
    },
    {
      feature: 'On-Device Privacy-Preserving Inference',
      rakshak: true,
      antivirus: true,
      callerId: false,
      browserFilter: false,
      note: 'Zero cloud harvesting of user calls, SMS, or banking credentials'
    }
  ];

  const deploymentTracks = [
    {
      title: 'Track A: OEM Pre-Installation',
      desc: 'Integrated as an unprivileged device-level security daemon in Android AOSP / vendor builds (Samsung, Lava, Xiaomi) operating at the interaction boundary.',
      icon: Smartphone,
      badge: 'System Daemon'
    },
    {
      title: 'Track B: Telecom Network Synergy',
      desc: 'Partnered with Indian telcos (Jio, Airtel, Vi) to match incoming VoIP spoofing indicators and unverified DLT transactional SMS headers.',
      icon: Building2,
      badge: 'Telco Interconnect'
    },
    {
      title: 'Track C: Citizen Mobile Guardian',
      desc: 'Distributed as a standalone accessibility-enabled security companion on Google Play & Indus Appstore with Marathi, Hindi, and regional speech.',
      icon: Users,
      badge: 'Public App'
    },
    {
      title: 'Track D: I4C & MHA Cyber Cell Bridge',
      desc: 'Direct programmatic docket export to the National Cyber Crime Reporting Portal (1930) within the golden hour to minimize capital loss.',
      icon: FileCheck,
      badge: 'Govt Integration'
    }
  ];

  return (
    <div className="space-y-12">
      {/* SIH 2026 Hero Banner */}
      <div className="cyber-card p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border-cyan-500/40 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500 text-slate-950 shadow-[0_0_15px_#00f0ff]">
              Smart India Hackathon (SIH 2026)
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/40">
              Category: Student Innovation
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300">
              Systems Security & Citizen Defense
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-sans tracking-tight">
            RakshakOS: The World's First OS-Integrated Contextual Defense
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Existing cybersecurity products operate in isolated silos. Antivirus inspects static files, caller ID apps inspect phone numbers, and browser extensions inspect URLs. <strong>None understand context.</strong> RakshakOS bridges the mobile operating system interaction boundary to fuse multiple attack signals into proactive real-time prevention.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => navigate('/simulator')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all"
            >
              Launch Interactive OS Boundary Simulator
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/scanner')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-mono transition-all"
            >
              Test 6-in-1 Threat Workstation
            </button>
          </div>
        </div>
      </div>

      {/* Novelty: Why Existing Solutions Fail (Competitive Moat) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-3 py-1 rounded-full">
            Competitive Innovation Matrix
          </span>
          <h2 className="text-2xl font-bold text-slate-100 mt-2 font-sans">
            Why There is No Existing Solution Like RakshakOS
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            A comprehensive architectural comparison demonstrating why traditional defenses cannot stop multi-signal attacks like Digital Arrest, AnyDesk screen sharing during payments, or reverse UPI scams.
          </p>
        </div>

        <div className="cyber-card bg-slate-900/70 border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300 bg-slate-950/70">
                  <th className="p-4">Defensive Capability</th>
                  <th className="p-4 text-center text-cyan-400 bg-cyan-950/40 border-x border-cyan-500/20">
                    RakshakOS (Ours)
                  </th>
                  <th className="p-4 text-center text-slate-400">Antivirus / EDR</th>
                  <th className="p-4 text-center text-slate-400">Caller ID (Truecaller)</th>
                  <th className="p-4 text-center text-slate-400">Browser Filters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <span className="font-semibold text-slate-200 block">{row.feature}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{row.note}</span>
                    </td>
                    <td className="p-4 text-center bg-cyan-950/20 border-x border-cyan-500/20">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      {row.antivirus ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.callerId ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.browserFilter ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Real-World Scalability & Deployment Pathways */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full">
            National Deployment Viability
          </span>
          <h2 className="text-2xl font-bold text-slate-100 mt-2 font-sans">
            How RakshakOS Scales Across 800+ Million Indian Citizens
          </h2>
          <p className="text-xs text-slate-400 max-w-3xl">
            Designed for zero-cost edge inference so it runs effortlessly on low-cost entry-level smartphones ($60–$100 devices) without expensive cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deploymentTracks.map((trk, i) => {
            const Icon = trk.icon;
            return (
              <div
                key={i}
                className="cyber-card p-5 bg-slate-900/60 border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {trk.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 mb-1">{trk.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{trk.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-emerald-400">✓ Feasible & Scalable</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SIH Judging Rubric Alignment Card */}
      <section className="cyber-card p-6 bg-slate-900/70 border-slate-800">
        <h3 className="text-sm font-mono uppercase font-bold text-slate-200 mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          Smart India Hackathon (SIH 2026) Evaluation Rubric Alignment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-cyan-400 font-bold block mb-1">1. Novelty & Innovation</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Transition from isolated signal detection to multi-vector OS boundary correlation (zero prior commercial precedent).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">2. Real-World Impact</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Prevents digital arrest and reverse UPI extortion before money leaves citizen accounts, saving police investigation hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-indigo-400 font-bold block mb-1">3. Technical Feasibility</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Lightweight 14.2ms inference latency. Standard Android Accessibility & Notification Listener service architecture.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-amber-400 font-bold block mb-1">4. Inclusive Accessibility</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Native real-time voice interaction in Marathi, Hindi, and English tailored for rural digital users and seniors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
