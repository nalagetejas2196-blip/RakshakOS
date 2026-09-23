import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import UrlScanner from './UrlScanner';
import MessageScanner from './MessageScanner';
import EmailScanner from './EmailScanner';
import CallScanner from './CallScanner';
import PaymentScanner from './PaymentScanner';
import DeepfakeScanner from './DeepfakeScanner';
import {
  Globe,
  MessageSquare,
  Mail,
  PhoneCall,
  QrCode,
  UserCheck,
  Shield,
  Layers
} from 'lucide-react';

export default function UnifiedScanner({ defaultTab = 'url' }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = [
    { id: 'url', label: t('tab_url', 'URL / Phishing'), icon: Globe, count: 'PhishNet' },
    { id: 'message', label: t('tab_message', 'Message / SMS'), icon: MessageSquare, count: 'SMS/Chat' },
    { id: 'email', label: t('tab_email', 'Email Fraud'), icon: Mail, count: 'Header/Body' },
    { id: 'call', label: t('tab_call', 'Scam Call'), icon: PhoneCall, count: 'Vishing/Arrest' },
    { id: 'payment', label: t('tab_payment', 'OTP / Payment'), icon: QrCode, count: 'Reverse QR' },
    { id: 'deepfake', label: t('tab_deepfake', 'Deepfake / AI Voice'), icon: UserCheck, count: 'Synthetic' }
  ];

  return (
    <div className="w-full">
      {/* Title Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Shield className="w-5 h-5" />
            </span>
            {t('scanner_heading', 'Unified Threat Investigation Workstation')}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {t('scanner_subheading', 'Select threat modality to initiate contextual feature extraction and cross-channel risk analysis.')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg">
          <Layers className="w-4 h-4" />
          <span>6 Active Multimodal Vectors</span>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 mb-6 border-b border-slate-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-b-2 font-mono ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-slate-900/90 shadow-[0_-4px_12px_rgba(0,240,255,0.08)]'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Container */}
      <div className="cyber-card p-6 md:p-8 bg-slate-900/70 border-slate-700/60 shadow-xl">
        {activeTab === 'url' && <UrlScanner />}
        {activeTab === 'message' && <MessageScanner />}
        {activeTab === 'email' && <EmailScanner />}
        {activeTab === 'call' && <CallScanner />}
        {activeTab === 'payment' && <PaymentScanner />}
        {activeTab === 'deepfake' && <DeepfakeScanner />}
      </div>
    </div>
  );
}
