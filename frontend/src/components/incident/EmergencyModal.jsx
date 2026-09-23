import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSafety } from '../../context/SafetyContext';
import {
  LifeBuoy,
  X,
  PhoneOff,
  CreditCard,
  PhoneCall,
  Camera,
  ExternalLink,
  CheckSquare,
  Square,
  AlertOctagon,
  ShieldCheck
} from 'lucide-react';

export default function EmergencyModal() {
  const { t } = useLanguage();
  const { isEmergencyOpen, closeEmergencyModal } = useSafety();

  const [checkedSteps, setCheckedSteps] = useState({});

  if (!isEmergencyOpen) return null;

  const toggleStep = (step) => {
    setCheckedSteps(prev => ({ ...prev, [step]: !prev[step] }));
  };

  const steps = [
    {
      id: 'step1',
      title: t('emergency_step1', '1. Immediately Terminate All Communication'),
      desc: t('emergency_step1_desc'),
      icon: PhoneOff,
      urgent: true
    },
    {
      id: 'step2',
      title: t('emergency_step2', '2. Freeze Banking & UPI Services'),
      desc: t('emergency_step2_desc'),
      icon: CreditCard,
      urgent: true
    },
    {
      id: 'step3',
      title: t('emergency_step3', '3. Dial 1930 National Cyber Helpline'),
      desc: t('emergency_step3_desc'),
      icon: PhoneCall,
      highlight: 'Toll-free 1930 (MHA Citizen Financial Cyber Fraud Reporting System)'
    },
    {
      id: 'step4',
      title: t('emergency_step4', '4. Preserve Digital Evidence'),
      desc: t('emergency_step4_desc'),
      icon: Camera,
      highlight: 'Save SMS headers, call recordings, UPI transaction reference (UTR)'
    },
    {
      id: 'step5',
      title: t('emergency_step5', '5. File Official Complaint at cybercrime.gov.in'),
      desc: t('emergency_step5_desc'),
      icon: ExternalLink,
      link: 'https://cybercrime.gov.in'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 p-6 md:p-8 bg-slate-900 border border-rose-500/40 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.2)] text-slate-100">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <LifeBuoy className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-300">
                {t('emergency_title', 'Immediate Scam Containment Protocol')}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                5-Step Containment Procedure • Act within the "Golden Hour"
              </p>
            </div>
          </div>
          <button
            onClick={closeEmergencyModal}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Callout */}
        <div className="my-4 p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-200">
            <strong>Time-Sensitive Action:</strong> In financial fraud cases, dialling <strong>1930</strong> within the first two hours dramatically increases the probability that banks can freeze funds before cash-out.
          </div>
        </div>

        {/* Interactive Steps Checklist */}
        <div className="space-y-3 my-5">
          {steps.map((st) => {
            const Icon = st.icon;
            const isDone = Boolean(checkedSteps[st.id]);

            return (
              <div
                key={st.id}
                onClick={() => toggleStep(st.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                  isDone
                    ? 'border-emerald-500/40 bg-emerald-950/20'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-cyan-400"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`text-sm font-semibold flex items-center gap-2 ${
                        isDone ? 'text-emerald-300 line-through' : 'text-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      {st.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {st.desc}
                  </p>
                  {st.highlight && (
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30 mt-2 inline-block">
                      {st.highlight}
                    </span>
                  )}
                  {st.link && (
                    <a
                      href={st.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1 mt-2 inline-flex"
                    >
                      Open Official National Portal ({st.link})
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom CTA */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Completed:{' '}
            <strong className="text-emerald-400">
              {Object.values(checkedSteps).filter(Boolean).length} / {steps.length}
            </strong>
          </span>
          <button
            onClick={closeEmergencyModal}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200"
          >
            Close Emergency Protocol
          </button>
        </div>
      </div>
    </div>
  );
}
