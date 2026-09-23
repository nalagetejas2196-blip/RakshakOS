import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import { GraduationCap, Briefcase, HeartHandshake, Compass, ShieldCheck } from 'lucide-react';

export default function HumanArchetypes() {
  const { t } = useLanguage();
  const { selectedPersona, setSelectedPersona } = useSafety();

  const personas = [
    {
      id: 'student',
      title: t('persona_student', 'Student'),
      desc: t('persona_student_desc'),
      targetVectors: ['Task Scams', 'Internship Phishing', 'Exam Fee Fraud'],
      icon: GraduationCap,
      color: 'border-sky-500/30 text-sky-400 bg-sky-950/20'
    },
    {
      id: 'professional',
      title: t('persona_professional', 'Working Professional'),
      desc: t('persona_professional_desc'),
      targetVectors: ['CEO Spoofing', 'Payroll Update', 'LinkedIn Smishing'],
      icon: Briefcase,
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-950/20'
    },
    {
      id: 'senior',
      title: t('persona_senior', 'Senior Citizen'),
      desc: t('persona_senior_desc'),
      targetVectors: ['Digital Arrest Calls', 'Pension KYC Scams', 'AnyDesk Takeover'],
      icon: HeartHandshake,
      color: 'border-amber-500/30 text-amber-400 bg-amber-950/20'
    },
    {
      id: 'rural',
      title: t('persona_rural', 'First-Time Digital User'),
      desc: t('persona_rural_desc'),
      targetVectors: ['Reverse UPI QR', 'Power Cut Off SMS', 'Lottery Claims'],
      icon: Compass,
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20'
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase font-mono text-cyan-400">
            Contextual Threat Profiles by Citizen Persona
          </h3>
          <p className="text-xs text-slate-400">
            Real attacks exploit different vulnerabilities. Select a persona to view specialized protections.
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
          Interactive Defense Models
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {personas.map(p => {
          const Icon = p.icon;
          const isSelected = selectedPersona === p.id;

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? 'border-cyan-400/80 bg-slate-900/90 shadow-[0_0_20px_rgba(0,240,255,0.15)] ring-1 ring-cyan-400/50'
                  : 'border-slate-800/80 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                  isSelected ? 'bg-gradient-to-r from-cyan-400 to-indigo-500' : 'bg-transparent'
                }`}
              />

              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg border ${p.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/40 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Active
                  </span>
                )}
              </div>

              <h4 className="font-semibold text-sm text-slate-100 mb-1">{p.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {p.desc}
              </p>

              <div className="border-t border-slate-800/80 pt-2.5">
                <span className="text-[10px] font-mono text-slate-500 block mb-1.5 uppercase">
                  Primary Vectors:
                </span>
                <div className="flex flex-wrap gap-1">
                  {p.targetVectors.map(vec => (
                    <span
                      key={vec}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-300 border border-slate-700/50"
                    >
                      {vec}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
