import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, ExternalLink, Award, FileCode } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Identity & Motto */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-extrabold text-sm text-slate-100 font-mono">
                Rakshak<span className="text-cyan-400">OS</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-cyan-400/90 font-semibold mb-2">
              "{t('research_motto', "DON'T JUST DETECT THE SIGNAL. UNDERSTAND THE CONTEXT.")}"
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Smart India Hackathon (SIH 2026) • Category: Student Innovation • Proposed Context-Aware OS-Integrated Cyber Defense Framework.
            </p>
          </div>

          {/* Academic Scope Notice */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
              Research Prototype Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t('scope_notice', 'Proposed OS/device-level intelligent security layer for mobile and web interactions. Not an OS kernel replacement.')}
            </p>
            <p className="text-[10px] text-slate-500 mt-2">
              Zero fabricated empirical metrics; experimental values reported only from controlled prototype evaluation.
            </p>
          </div>

          {/* Standards & Official Escalation */}
          <div>
            <h4 className="text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
              Standards & Official Portals
            </h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p>• NIST AI Risk Management Framework (AI RMF 1.0)</p>
              <p>• NIST Cybersecurity Framework 2.0 (NIST CSF 2.0)</p>
              <p>• OWASP Mobile Top 10 Security Verification</p>
              <p className="pt-1 text-cyan-400">
                National Cyber Crime Helpline: <strong>1930</strong> (cybercrime.gov.in)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 RakshakOS Research Initiative • Free & Open-Source Defense Architecture
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Empirical ML Ensemble Active
            </span>
            <span>Apache-2.0 License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
