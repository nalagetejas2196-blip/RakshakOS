import React, { useState } from 'react';
import { useSafety } from '../../context/SafetyContext';
import { api } from '../../services/api';
import { Play, Sparkles, ChevronRight, Zap } from 'lucide-react';

export default function DemoScenarioBar({ onSelectDemo }) {
  const { addScanToHistory, setCurrentScan } = useSafety();
  const [runningDemoId, setRunningDemoId] = useState(null);

  const demoScenarios = [
    {
      id: 'demo-1',
      title: '1. Safe Gov Portal',
      type: 'url',
      tag: 'URL',
      payload: { url: 'https://incometax.gov.in/iec/foportal/' },
      expected: 'LOW / ALLOW'
    },
    {
      id: 'demo-2',
      title: '2. Phishing Domain',
      type: 'url',
      tag: 'URL',
      payload: { url: 'http://sbi-online-kyc-verification.com/login.php' },
      expected: 'CRITICAL / BLOCK'
    },
    {
      id: 'demo-3',
      title: '3. Fake Bank SMS',
      type: 'message',
      tag: 'SMS',
      payload: { text: 'Your SBI account will be blocked today within 24 hours. Update PAN immediately: bit.ly/sbi-pan-kyc' },
      expected: 'CRITICAL / BLOCK'
    },
    {
      id: 'demo-4',
      title: '4. Reverse UPI QR Scam',
      type: 'payment',
      tag: 'UPI',
      payload: { scenario: 'Buyer said: "Scan this QR code and enter your UPI PIN to receive ₹5,000 refund in PhonePe."' },
      expected: 'CRITICAL / BLOCK'
    },
    {
      id: 'demo-5',
      title: '5. Telegram Job Bait',
      type: 'message',
      tag: 'JOB',
      payload: { text: 'Congratulations! Earn ₹3,500 daily by liking YouTube videos from home. Immediate joining bonus. Contact @parttime_vip on Telegram.' },
      expected: 'HIGH / QUARANTINE'
    },
    {
      id: 'demo-6',
      title: '6. Digital Arrest Vishing',
      type: 'call',
      tag: 'CALL',
      payload: { transcript: 'Caller claimed to be CBI Officer Mishra. Said a parcel seized in Mumbai has narcotics linked to my Aadhaar. Placed me under digital arrest on video and told me to transfer ₹2,00,000 to RBI verification account.' },
      expected: 'CRITICAL / BLOCK'
    },
    {
      id: 'demo-7',
      title: '7. Spoofed Salary Email',
      type: 'email',
      tag: 'EMAIL',
      payload: {
        sender: 'Payroll Department <hr.payroll91@gmail.com>',
        subject: 'URGENT: March Salary Revision & Tax Deductions Review',
        body: 'Please review your salary increment details immediately by logging in below:',
        links: ['http://corporate-salary-update.xyz/login.html']
      },
      expected: 'CRITICAL / BLOCK'
    },
    {
      id: 'demo-8',
      title: '8. AI Voice Clone Distress',
      type: 'deepfake',
      tag: 'AI VOICE',
      payload: {
        mode: 'contextual',
        scenarioDescription: 'Voice sounding exactly like my son called crying, saying he had an accident abroad, police detained him, and asked to wire ₹90,000 to an unknown UPI without calling his regular phone number.',
        mediaType: 'voice',
        impersonatedEntity: 'Son in college',
        financialDemandAmount: '90000'
      },
      expected: 'CRITICAL / BLOCK'
    }
  ];

  const executeScenario = async (scenario) => {
    setRunningDemoId(scenario.id);
    try {
      let data = null;
      if (scenario.type === 'url') data = await api.scanUrl(scenario.payload.url);
      else if (scenario.type === 'message') data = await api.scanMessage(scenario.payload.text);
      else if (scenario.type === 'email') data = await api.scanEmail(scenario.payload);
      else if (scenario.type === 'call') data = await api.scanCall(scenario.payload.transcript);
      else if (scenario.type === 'payment') data = await api.scanPayment(scenario.payload.scenario);
      else if (scenario.type === 'deepfake') data = await api.scanDeepfake(scenario.payload);

      if (data) {
        addScanToHistory(data, scenario.title);
        setCurrentScan(data);
        if (onSelectDemo) onSelectDemo(scenario, data);
      }
    } catch (err) {
      console.error('Demo execution failed:', err);
    } finally {
      setRunningDemoId(null);
    }
  };

  return (
    <div className="cyber-card p-4 bg-slate-950/80 border-cyan-500/30">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-100 flex items-center gap-2">
              Smart India Hackathon (SIH 2026) Live Jury Presentation Bar
              <span className="text-[10px] text-cyan-400 font-normal">
                (Click any preset to trigger instant end-to-end pipeline)
              </span>
            </h4>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
          8 Pre-Calibrated Scenarios
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {demoScenarios.map((demo) => {
          const isRunning = runningDemoId === demo.id;
          return (
            <button
              key={demo.id}
              onClick={() => executeScenario(demo)}
              disabled={Boolean(runningDemoId)}
              className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-cyan-500/50 text-left transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-1 py-0.2 rounded border border-cyan-500/30">
                  {demo.tag}
                </span>
                {isRunning ? (
                  <span className="w-2.5 h-2.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Play className="w-2.5 h-2.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>
              <div className="text-[11px] font-bold text-slate-200 truncate group-hover:text-cyan-300">
                {demo.title}
              </div>
              <div className="text-[9px] font-mono text-slate-500 mt-1 truncate">
                {demo.expected}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
