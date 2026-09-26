import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ShieldAlert,
  ShieldCheck,
  Eye,
  Bell,
  PhoneCall,
  Clipboard,
  Cpu,
  Layers,
  Zap,
  Lock,
  AlertOctagon,
  CheckCircle2,
  Terminal,
  Play,
  RotateCcw,
  FileText
} from 'lucide-react';
import I4CGoldenHourModal from '../incident/I4CGoldenHourModal';

export default function OsBoundarySimulator() {
  // Toggleable OS boundary hooks
  const [screenShareActive, setScreenShareActive] = useState(false);
  const [inboundCallActive, setInboundCallActive] = useState(false);
  const [otpSmsReceived, setOtpSmsReceived] = useState(false);
  const [paymentAppOpen, setPaymentAppOpen] = useState(false);
  const [isDocketOpen, setIsDocketOpen] = useState(false);

  // Active attack scenario presets
  const [activeScenario, setActiveScenario] = useState(null);

  // Calculate composite threat score
  const calculateThreatState = () => {
    let score = 0;
    const activeHooks = [];

    if (screenShareActive) {
      score += 35;
      activeHooks.push('Accessibility: Remote Screen Share (AnyDesk/TeamViewer)');
    }
    if (inboundCallActive) {
      score += 30;
      activeHooks.push('Telephony: Unknown Inbound Call with Coercion Signals');
    }
    if (otpSmsReceived) {
      score += 25;
      activeHooks.push('Notification: Bank Debit OTP intercepted in notification stream');
    }
    if (paymentAppOpen) {
      score += 15;
      activeHooks.push('Foreground App: UPI Payment Gateway (PhonePe/GPay) active');
    }

    // Compound Cross-Channel Multiplier
    if (screenShareActive && paymentAppOpen) score += 25; // Fatal combination
    if (inboundCallActive && otpSmsReceived) score += 20; // Fatal vishing combination

    const finalScore = Math.min(100, score);

    let decision = 'ALLOW';
    let riskLevel = 'LOW';
    let alertBanner = null;

    if (finalScore >= 80) {
      decision = 'PROACTIVE BLOCK (OS LOCKDOWN)';
      riskLevel = 'CRITICAL';
      alertBanner = 'CRITICAL SECURITY THREAT: Remote screen sharing detected while banking credentials are being accessed. RakshakOS has shielded the screen and paused touch input.';
    } else if (finalScore >= 50) {
      decision = 'QUARANTINE / WARNING HUD';
      riskLevel = 'HIGH';
      alertBanner = 'ELEVATED RISK: Active telephone call correlates with incoming authentication OTP. Do not disclose numbers to the caller.';
    } else if (finalScore >= 25) {
      decision = 'HEIGHTENED SURVEILLANCE';
      riskLevel = 'MEDIUM';
      alertBanner = 'HEIGHTENED VIGILANCE: Device boundary hooks monitoring unusual background services.';
    }

    return { score: finalScore, riskLevel, decision, alertBanner, activeHooks };
  };

  const threatState = calculateThreatState();

  // Attack Presets for SIH Jury Demo
  const triggerPreset = (type) => {
    setActiveScenario(type);
    if (type === 'digital-arrest') {
      setInboundCallActive(true);
      setScreenShareActive(false);
      setOtpSmsReceived(true);
      setPaymentAppOpen(true);
    } else if (type === 'anydesk-takeover') {
      setScreenShareActive(true);
      setInboundCallActive(true);
      setPaymentAppOpen(true);
      setOtpSmsReceived(false);
    } else if (type === 'normal-banking') {
      setScreenShareActive(false);
      setInboundCallActive(false);
      setOtpSmsReceived(true);
      setPaymentAppOpen(true);
    } else if (type === 'safe-idle') {
      setScreenShareActive(false);
      setInboundCallActive(false);
      setOtpSmsReceived(false);
      setPaymentAppOpen(false);
    }
  };

  const resetAll = () => {
    setActiveScenario(null);
    setScreenShareActive(false);
    setInboundCallActive(false);
    setOtpSmsReceived(false);
    setPaymentAppOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Cpu className="w-3.5 h-3.5" />
            Novelty Core: OS-Integrated Device Boundary Telemetry
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-sans">
            OS Kernel & Boundary Hook Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Demonstrates why single-channel antivirus fails and how RakshakOS intercepts attacks by fusing mobile OS interaction hooks: <strong>Accessibility</strong>, <strong>Notification Streams</strong>, <strong>Telephony Audio</strong>, and <strong>Clipboard Intents</strong>.
          </p>
        </div>

        {/* Quick Jury Demo Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400">Jury Presets:</span>
          <button
            onClick={() => triggerPreset('digital-arrest')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              activeScenario === 'digital-arrest'
                ? 'bg-rose-500 text-slate-950 font-bold border-rose-400 shadow-[0_0_15px_#ef4444]'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            Digital Arrest
          </button>
          <button
            onClick={() => triggerPreset('anydesk-takeover')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              activeScenario === 'anydesk-takeover'
                ? 'bg-rose-500 text-slate-950 font-bold border-rose-400 shadow-[0_0_15px_#ef4444]'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            AnyDesk Hijack
          </button>
          <button
            onClick={() => triggerPreset('normal-banking')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              activeScenario === 'normal-banking'
                ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            Legit Banking
          </button>
          <button
            onClick={resetAll}
            title="Reset"
            className="p-1 rounded-lg border border-slate-700 text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive OS Boundary Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="cyber-card p-6 bg-slate-900/70 border-slate-800 space-y-4">
            <h3 className="text-sm font-mono uppercase font-bold text-slate-200 flex items-center justify-between">
              <span>Interactive Device Signal Inputs</span>
              <span className="text-[10px] font-normal text-cyan-400">
                Toggle signals to test cross-channel correlation
              </span>
            </h3>

            {/* Hook 1: Accessibility Remote Desktop */}
            <div
              onClick={() => {
                setActiveScenario(null);
                setScreenShareActive(prev => !prev);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                screenShareActive
                  ? 'border-rose-500/70 bg-rose-950/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border shrink-0 ${
                  screenShareActive
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Eye className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-100 flex items-center gap-2">
                    Hook 1: Accessibility & Window Overlay
                    <span className="text-[10px] font-mono text-cyan-400">(Android AccessibilityService)</span>
                  </h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      screenShareActive ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {screenShareActive ? 'ACTIVE HOOK TRIGGERED' : 'INACTIVE'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Detects background screen scraping tools (AnyDesk, TeamViewer, RustDesk) injecting synthetic touch events or capturing screen frames.
                </p>
              </div>
            </div>

            {/* Hook 2: In-Call Telephony Audio */}
            <div
              onClick={() => {
                setActiveScenario(null);
                setInboundCallActive(prev => !prev);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                inboundCallActive
                  ? 'border-amber-500/70 bg-amber-950/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border shrink-0 ${
                  inboundCallActive
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-100 flex items-center gap-2">
                    Hook 2: In-Call Telephony Safety HUD
                    <span className="text-[10px] font-mono text-cyan-400">(Telecom InCallService)</span>
                  </h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      inboundCallActive ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {inboundCallActive ? 'CALL IN PROGRESS' : 'IDLE'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Floating OS overlay listening for authority coercion keywords ("CBI Officer", "Digital Arrest", "Do not hang up") in real-time.
                </p>
              </div>
            </div>

            {/* Hook 3: Notification Stream Interceptor */}
            <div
              onClick={() => {
                setActiveScenario(null);
                setOtpSmsReceived(prev => !prev);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                otpSmsReceived
                  ? 'border-indigo-500/70 bg-indigo-950/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border shrink-0 ${
                  otpSmsReceived
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-100 flex items-center gap-2">
                    Hook 3: Notification Stream Interceptor
                    <span className="text-[10px] font-mono text-cyan-400">(NotificationListenerService)</span>
                  </h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      otpSmsReceived ? 'bg-indigo-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {otpSmsReceived ? 'OTP STREAM DETECTED' : 'QUIET'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Intercepts high-value debit authentication tokens and SMS headers (e.g. `BP-SBIINB`, `VM-HDFCBK`) before clipboard leakage.
                </p>
              </div>
            </div>

            {/* Hook 4: Payment Gateway Foreground State */}
            <div
              onClick={() => {
                setActiveScenario(null);
                setPaymentAppOpen(prev => !prev);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                paymentAppOpen
                  ? 'border-cyan-500/70 bg-cyan-950/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div
                className={`p-2.5 rounded-lg border shrink-0 ${
                  paymentAppOpen
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Zap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-slate-100 flex items-center gap-2">
                    Hook 4: Foreground Financial Application State
                    <span className="text-[10px] font-mono text-cyan-400">(UsageStats / ActivityManager)</span>
                  </h4>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      paymentAppOpen ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {paymentAppOpen ? 'UPI APP ACTIVE' : 'BACKGROUND'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Detects when a financial app (PhonePe, Google Pay, NetBanking) gains focus, initiating strict isolation rules.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Simulated Smartphone Screen & Proactive Intervention (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="cyber-card p-5 bg-slate-950 border-slate-800 flex flex-col items-center justify-center">
            {/* Smartphone Outer Bezel */}
            <div className="relative w-full max-w-[280px] h-[520px] rounded-[36px] border-4 border-slate-700 bg-slate-900 shadow-2xl p-3 flex flex-col overflow-hidden">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-950"></div>
              </div>

              {/* Status Bar */}
              <div className="flex justify-between items-center px-2 text-[10px] font-mono text-slate-400 mb-2">
                <span>09:41 AM</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <ShieldCheck className="w-3 h-3" /> RakshakOS Active
                </span>
                <span>5G 98%</span>
              </div>

              {/* Inner Simulated Screen Area */}
              <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800/80 p-3 relative overflow-hidden flex flex-col justify-between">
                {/* Foreground App Display */}
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400">
                      {paymentAppOpen ? '⚡ PhonePe / UPI Gateway' : '📱 Android Home Screen'}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>

                  {paymentAppOpen && (
                    <div className="mt-3 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-center">
                      <span className="text-[10px] font-mono text-indigo-300 block">
                        AUTHENTICATE PAYMENT: ₹25,000
                      </span>
                      <span className="text-[9px] text-slate-400 block mt-1">
                        To: clearance.mule99@okaxis
                      </span>
                    </div>
                  )}

                  {inboundCallActive && (
                    <div className="mt-3 p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-left animate-pulse">
                      <span className="text-[10px] font-mono text-amber-300 font-bold block flex items-center gap-1">
                        <PhoneCall className="w-3 h-3" /> CALL ACTIVE (14m 20s)
                      </span>
                      <span className="text-[9px] text-amber-200/90 block mt-0.5">
                        Caller: "CBI Narcotics Bureau • Officer Mishra"
                      </span>
                    </div>
                  )}

                  {otpSmsReceived && (
                    <div className="mt-2 p-2 rounded-lg bg-slate-900 border border-slate-700 text-left">
                      <span className="text-[9px] font-mono text-cyan-300 block">
                        📩 SMS: BP-SBIINB
                      </span>
                      <span className="text-[9px] text-slate-300 block">
                        OTP for ₹25,000 transaction is 482910. Do not share.
                      </span>
                    </div>
                  )}
                </div>

                {/* Proactive Intervention Overlay */}
                {threatState.score >= 50 && (
                  <div className="my-auto p-3 rounded-xl border border-rose-500 bg-rose-950/90 shadow-[0_0_20px_#ef4444] text-center z-20 animate-bounce">
                    <AlertOctagon className="w-7 h-7 text-rose-400 mx-auto mb-1 animate-pulse" />
                    <span className="text-[11px] font-mono font-extrabold text-white block">
                      RAKSHAK-OS INTERVENTION
                    </span>
                    <span className="text-[9px] text-rose-200 block mt-1 leading-snug">
                      {threatState.decision}
                    </span>
                    <span className="text-[8px] font-mono text-rose-300 bg-rose-900/60 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                      Touch Input Intercepted
                    </span>
                  </div>
                )}

                {/* Bottom Navigation Pill */}
                <div className="w-20 h-1 bg-slate-700 rounded-full mx-auto mt-2"></div>
              </div>

              {/* Threat Engine Status at Phone Bottom */}
              <div className="mt-2 text-center">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    threatState.riskLevel === 'CRITICAL'
                      ? 'text-rose-400 bg-rose-950/60 border border-rose-500/40'
                      : threatState.riskLevel === 'HIGH'
                      ? 'text-amber-400 bg-amber-950/60 border border-amber-500/40'
                      : 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/40'
                  }`}
                >
                  Score: {threatState.score}/100 • {threatState.riskLevel}
                </span>
              </div>
            </div>

            {/* Quick 1930 / I4C CFCFRMS Freeze Action */}
            <button
              onClick={() => setIsDocketOpen(true)}
              className="w-full max-w-[280px] mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              Generate 1930 / I4C CFCFRMS Docket
            </button>
          </div>
        </div>
      </div>

      {/* Simulated OS Kernel Log Stream */}
      <div className="cyber-card p-5 bg-slate-950 border-slate-800 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>RakshakOS Real-Time Device Daemon Logs</span>
          </div>
          <span className="text-[10px] text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded">
            Live Stream (PID 4091)
          </span>
        </div>

        <div className="space-y-1.5 text-[11px] text-slate-400 max-h-36 overflow-y-auto">
          <div><span className="text-slate-600">[09:41:01]</span> <span className="text-cyan-400">[DAEMON_INIT]</span> RakshakOS Mobile Boundary Interceptor active on /dev/socket/rakshakos_ipc</div>
          <div><span className="text-slate-600">[09:41:02]</span> <span className="text-emerald-400">[ACCESSIBILITY]</span> WindowManager event listener registered (Type: TYPE_WINDOW_STATE_CHANGED)</div>
          
          {screenShareActive && (
            <div><span className="text-slate-600">[09:41:08]</span> <span className="text-rose-400 font-bold">[ACCESSIBILITY_WARN]</span> Remote desktop service (AnyDesk/TeamViewer) streaming active screen buffer</div>
          )}
          {inboundCallActive && (
            <div><span className="text-slate-600">[09:41:12]</span> <span className="text-amber-400 font-bold">[TELEPHONY_NLP]</span> InCall audio stream pattern matched: "CBI" + "Digital Arrest" + "Warrant"</div>
          )}
          {otpSmsReceived && (
            <div><span className="text-slate-600">[09:41:16]</span> <span className="text-indigo-400 font-bold">[NOTIFICATION]</span> SMS payload matched 6-digit OTP regex from sender BP-SBIINB</div>
          )}
          {paymentAppOpen && (
            <div><span className="text-slate-600">[09:41:20]</span> <span className="text-sky-400 font-bold">[ACTIVITY_MANAGER]</span> Foreground task switched to net.one97.paytm / com.phonepe.app</div>
          )}

          {threatState.score >= 50 && (
            <div className="p-1 rounded bg-rose-950/40 text-rose-300 font-bold">
              [09:41:22] [ORCHESTRATOR_ACTION] MULTIMODAL CONTEXT BREACH! Cross-channel correlation score = {threatState.score}/100. Triggering {threatState.decision}.
            </div>
          )}
        </div>
      </div>

      {/* CFCFRMS Golden Hour Freeze Docket Modal */}
      <I4CGoldenHourModal
        isOpen={isDocketOpen}
        onClose={() => setIsDocketOpen(false)}
        incidentData={{
          caseId: `I4C-${Date.now().toString().slice(-8)}`,
          timestamp: new Date().toISOString(),
          fraudType: screenShareActive ? 'Remote Access Screen Takeover (AnyDesk/TeamViewer)' : inboundCallActive ? 'Digital Arrest / Vishing Coercion' : 'Reverse UPI / Financial Fraud',
          suspectVpa: 'clearance.mule99@okaxis',
          suspectPhone: inboundCallActive ? '+91 98210 44921 (Impersonating Law Enforcement)' : '+91 98210 44921',
          lostAmount: paymentAppOpen ? '₹25,000' : '₹0 (Intercepted Prior to Debit)',
          utrNumber: '426910928491',
          threatVector: threatState.activeHooks.join(' + ') || 'Device Boundary Telemetry Anomaly'
        }}
      />
    </div>
  );
}
