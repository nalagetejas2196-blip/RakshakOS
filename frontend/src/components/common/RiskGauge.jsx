import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, ShieldAlert } from 'lucide-react';

export default function RiskGauge({ score = 0, riskLevel = 'LOW', decision = 'ALLOW', decisionLabel = '' }) {
  const getTheme = () => {
    switch (riskLevel) {
      case 'CRITICAL':
        return {
          barColor: 'bg-rose-500 shadow-[0_0_15px_#ef4444]',
          textColor: 'text-rose-400',
          borderColor: 'border-rose-500/40',
          bgColor: 'bg-rose-950/20',
          icon: AlertOctagon,
          badge: 'bg-rose-500/10 border-rose-500/40 text-rose-300'
        };
      case 'HIGH':
        return {
          barColor: 'bg-orange-500 shadow-[0_0_15px_#f97316]',
          textColor: 'text-orange-400',
          borderColor: 'border-orange-500/40',
          bgColor: 'bg-orange-950/20',
          icon: ShieldAlert,
          badge: 'bg-orange-500/10 border-orange-500/40 text-orange-300'
        };
      case 'MEDIUM':
        return {
          barColor: 'bg-amber-400 shadow-[0_0_15px_#f59e0b]',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-amber-950/20',
          icon: AlertTriangle,
          badge: 'bg-amber-500/10 border-amber-500/40 text-amber-300'
        };
      default:
        return {
          barColor: 'bg-emerald-400 shadow-[0_0_15px_#10b981]',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-emerald-950/20',
          icon: ShieldCheck,
          badge: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div className={`p-4 rounded-xl border ${theme.borderColor} ${theme.bgColor} backdrop-blur-md`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconComponent className={`w-5 h-5 ${theme.textColor}`} />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Unified Risk Assessment
          </span>
        </div>
        <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${theme.badge}`}>
          {riskLevel} RISK
        </span>
      </div>

      <div className="flex items-baseline justify-between mb-2">
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-extrabold font-mono ${theme.textColor}`}>
            {score}
          </span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Proactive Decision</span>
          <span className={`text-xs font-mono font-bold tracking-wide ${theme.textColor}`}>
            [{decision}] {decisionLabel || ''}
          </span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${theme.barColor}`}
          style={{ width: `${Math.max(4, Math.min(100, score))}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-slate-500">
        <span>0 (VERIFIED SAFE)</span>
        <span>50 (ELEVATED)</span>
        <span>100 (CRITICAL THREAT)</span>
      </div>
    </div>
  );
}
