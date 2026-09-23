import React from 'react';

export default function ThreatRadar({ activeCount = 3, threatLevel = 'Elevated' }) {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Outer circular bezel */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/20 bg-slate-950/40 backdrop-blur-md"></div>
      <div className="absolute inset-4 rounded-full border border-cyan-500/15"></div>
      <div className="absolute inset-12 rounded-full border border-cyan-500/10"></div>
      <div className="absolute inset-20 rounded-full border border-cyan-500/10"></div>

      {/* Crosshairs */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/15"></div>
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/15"></div>

      {/* Rotating Radar Sweep */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none animate-radar-sweep">
        <div
          className="w-1/2 h-1/2 origin-bottom-right"
          style={{
            background: 'conic-gradient(from 0deg at 100% 100%, rgba(0, 240, 255, 0.45) 0deg, rgba(0, 240, 255, 0.1) 45deg, transparent 90deg)'
          }}
        ></div>
      </div>

      {/* Center Reticle */}
      <div className="relative z-10 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f0ff] animate-ping opacity-75"></div>
      <div className="absolute z-10 w-2 h-2 rounded-full bg-cyan-200"></div>

      {/* Blinking Threat Indicators */}
      <div className="absolute top-10 right-14 flex items-center gap-1">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
        <span className="text-[10px] font-mono text-rose-400/90 bg-slate-950/80 px-1 rounded border border-rose-500/30">Typosquat</span>
      </div>

      <div className="absolute bottom-12 left-10 flex items-center gap-1">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <span className="text-[10px] font-mono text-amber-400/90 bg-slate-950/80 px-1 rounded border border-amber-500/30">Rev-UPI</span>
      </div>

      <div className="absolute top-28 left-8 flex items-center gap-1">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        <span className="text-[9px] font-mono text-cyan-400/90 bg-slate-950/80 px-1 rounded border border-cyan-500/30">Auth SSL</span>
      </div>

      {/* Radar Status Badge */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
          Active Surveillance • {threatLevel}
        </span>
      </div>
    </div>
  );
}
