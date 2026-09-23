import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ThreatRadar from '../components/common/ThreatRadar';
import HumanArchetypes from '../components/common/HumanArchetypes';
import DemoScenarioBar from '../components/demo/DemoScenarioBar';
import RakshakAssistant from '../components/voice/RakshakAssistant';
import {
  ShieldCheck,
  ArrowRight,
  ShieldAlert,
  Zap,
  Lock,
  Cpu,
  Layers,
  FileCheck,
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleDemoSelect = (scenario) => {
    navigate('/scanner');
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              {t('scope_label', 'Research Prototype / AI Cyber-Fraud Defense Demonstrator')}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              {t('hero_title', 'Your Digital Safety Layer')}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('hero_subtitle', 'AI-assisted protection against phishing, social engineering and emerging cyber-fraud across mobile and web interaction boundaries.')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/scanner')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-bold text-sm shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all font-mono"
              >
                {t('hero_check_threat', 'Check a Threat')}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/security-center')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold transition-all font-mono"
              >
                {t('hero_open_dashboard', 'Open Security Center')}
              </button>

              <button
                onClick={() => navigate('/research')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-950/40 text-xs font-mono transition-all"
              >
                {t('hero_view_research', 'View Aavishkar Research')}
              </button>
            </div>

            {/* Core Research Paradigm Quote */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs font-mono text-cyan-400/90 font-semibold tracking-wide">
                CORE PARADIGM: Interaction → Context → Multimodal Intelligence → Proactive Prevention
              </div>
            </div>
          </div>

          {/* Right Hero Central Visual: Protected Digital Identity Radar */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="cyber-card p-6 border-cyan-500/20 bg-slate-900/50 w-full max-w-sm text-center">
              <ThreatRadar threatLevel="Protected" />
              <div className="mt-8 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Device Interaction Boundary</span>
                  <span className="text-emerald-400 font-bold">Encrypted</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-cyan-400 h-full w-4/5 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Minute Live Jury Presentation Bar */}
      <section>
        <DemoScenarioBar onSelectDemo={handleDemoSelect} />
      </section>

      {/* Human Archetypes: Student, Professional, Senior, Rural Citizen */}
      <section>
        <HumanArchetypes />
      </section>

      {/* Real-time Voice Assistant */}
      <section>
        <RakshakAssistant />
      </section>

      {/* System Architecture Highlights */}
      <section className="cyber-card p-8 bg-slate-900/60 border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
            Engineering Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-100 mt-3 font-sans">
            How RakshakOS Solves the Multi-Channel Threat Gap
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            A real-world attack does not happen one channel at a time. Traditional antivirus checks only files; browser filters check only URLs. RakshakOS correlates signals across channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="p-2.5 w-fit rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200 mb-1">1. Multimodal Evidence Fusion</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fuses 10 threat vectors: PhishNet URL features, SMS lexical cues, email sender headers, live vishing transcripts, reverse UPI QR codes, and synthetic voice signals.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="p-2.5 w-fit rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200 mb-1">2. Contextual Risk Reasoning</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates temporal correlation (e.g. OTP received right while a suspicious call is active, or screen-sharing enabled during payment application launch).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-950/60">
            <div className="p-2.5 w-fit rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
              <FileCheck className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-slate-200 mb-1">3. Explainable Proactive Intervention</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Produces actionable human-readable explanations ("Why Flagged?") and triggers OS decisions: <code>ALLOW</code>, <code>WARN</code>, <code>VERIFY</code>, <code>QUARANTINE</code>, or <code>BLOCK</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
