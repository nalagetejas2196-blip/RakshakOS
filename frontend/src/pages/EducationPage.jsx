import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const SAFETY_CARDS = [
  {
    id: 'otp-scams',
    title: 'OTP & Two-Factor Authentication Extortion',
    tag: 'Authentication',
    whatHappens: 'Fraudsters call or message claiming your bank account, SIM card, or delivery order is suspended and convince you to disclose the incoming 6-digit SMS verification code.',
    warningSigns: [
      'Caller creates extreme panic ("your account will freeze in 10 minutes")',
      'Caller claims the OTP is needed to "cancel" a fraudulent charge',
      'Caller asks you to read numbers backwards or forward the SMS'
    ],
    whatToDo: [
      'Hang up immediately when asked for an OTP',
      'Read the SMS text carefully — it explicitly states "Do not share with anyone"',
      'Contact your bank directly via the number on the back of your debit card'
    ],
    whatNotToDo: [
      'NEVER read out or forward an OTP to anyone, including bank managers',
      'NEVER enter an OTP into an unverified link received via SMS/WhatsApp'
    ]
  },
  {
    id: 'qr-scams',
    title: 'Reverse UPI QR Scam ("Scan to Receive Money")',
    tag: 'Payment / UPI',
    whatHappens: 'A buyer on OLX/Facebook Marketplace claims to pay an advance. They send a QR code and claim scanning it will deposit money into your account.',
    warningSigns: [
      'Buyer is too eager and agrees to purchase without negotiation',
      'Sends a QR code stamped with "Receive ₹5000" or similar logos',
      'Insists that you must enter your UPI PIN to "accept" the transfer'
    ],
    whatToDo: [
      'Remember the immutable rule: Receiving money requires ZERO actions from you',
      'Share only your UPI ID or mobile number to receive legitimate payments'
    ],
    whatNotToDo: [
      'NEVER scan a QR code to receive money',
      'NEVER enter your secret UPI PIN to receive money'
    ]
  },
  {
    id: 'fake-customer-care',
    title: 'Fake Customer Care & Search Engine Ad Traps',
    tag: 'Search Phishing',
    whatHappens: 'Scammers buy sponsored Google Ads for airline, courier, or refund helplines. When victims call the top search result, a scammer answers posing as official support.',
    warningSigns: [
      'Helpline numbers with ordinary 10-digit mobile numbers rather than 1800 toll-free',
      'Executive insists on remote desktop installation (AnyDesk, TeamViewer)',
      'Demands a token payment of ₹5 or ₹10 to "initiate ticket"'
    ],
    whatToDo: [
      'Find support numbers only inside the official installed mobile app',
      'Always look for verified domain badges on search results'
    ],
    whatNotToDo: [
      'NEVER trust phone numbers found in unverified Google Search ad snippets',
      'NEVER pay token fees to activate customer support'
    ]
  },
  {
    id: 'investment-scams',
    title: 'High-Yield Investment & Fake Crypto Trading Groups',
    tag: 'Financial Fraud',
    whatHappens: 'Victims are added to WhatsApp/Telegram groups where fake members post forged screenshots of massive daily profits in institutional stock or crypto trading.',
    warningSigns: [
      'Unsolicited addition to VIP investment groups',
      'Promises of guaranteed 20% to 50% weekly returns with zero risk',
      'Custom investment app download via direct APK link rather than Google Play'
    ],
    whatToDo: [
      'Verify brokers with SEBI (Securities and Exchange Board of India) registry',
      'Report and exit unknown investment channels immediately'
    ],
    whatNotToDo: [
      'NEVER transfer funds to private individual bank accounts for stock trading',
      'NEVER install trading apps from third-party APK links'
    ]
  },
  {
    id: 'phishing',
    title: 'Typosquatting & Banking Portal Phishing',
    tag: 'Web / URL',
    whatHappens: 'Attackers create identical replicas of legitimate bank login pages (e.g. `sbi-online-kyc-verification.com`) to harvest internet banking usernames and passwords.',
    warningSigns: [
      'Domain name has subtle misspellings, hyphens, or strange TLDs (`.top`, `.xyz`)',
      'The address bar lacks the official registered domain (e.g. `onlinesbi.sbi`)',
      'Login page asks for both NetBanking password AND ATM PIN simultaneously'
    ],
    whatToDo: [
      'Type official banking URLs directly into browser address bar',
      'Bookmark verified portals rather than clicking links in messages'
    ],
    whatNotToDo: [
      'NEVER click banking links sent via SMS, email, or WhatsApp',
      'NEVER enter personal passwords on pages with security certificate warnings'
    ]
  },
  {
    id: 'upi-fraud',
    title: 'UPI Collect-Request Exploits',
    tag: 'Payment / UPI',
    whatHappens: 'Fraudsters send a "Collect Request" via PhonePe or Google Pay with a deceptive message like "Refund of ₹3,000 APPROVED - Tap to Claim".',
    warningSigns: [
      'Incoming payment notification asks for PIN approval',
      'Message text says "Click Pay to Receive"',
      'Urgent calls urging you to open your payment app immediately'
    ],
    whatToDo: [
      'Decline all unfamiliar collect requests immediately',
      'Report fraudulent VPA handles directly inside your payment app'
    ],
    whatNotToDo: [
      'NEVER click "Pay" or enter PIN when expecting to receive money',
      'NEVER approve requests from unknown merchant handles'
    ]
  },
  {
    id: 'impersonation',
    title: 'Digital Arrest & Law Enforcement Impersonation',
    tag: 'Social Engineering',
    whatHappens: 'Scammers pose as CBI, Mumbai Police, or Customs officers on video calls claiming an illegal narcotics courier or money-laundering case has been registered under your Aadhaar.',
    warningSigns: [
      'Caller demands you stay on Skype/WhatsApp video in a closed room',
      'Threatens immediate arrest warrant unless you transfer "clearance funds"',
      'Shows forged letterheads, fake police badges, or courtroom backdrops'
    ],
    whatToDo: [
      'Remember: Real police NEVER conduct interrogations or arrest on Skype/video',
      'Immediately disconnect and report the phone number to 1930',
      'Visit your nearest local police station to verify any alleged notice'
    ],
    whatNotToDo: [
      'NEVER transfer money to "RBI verification accounts" or escrow deposits',
      'NEVER panic when threatened with "digital arrest" — it has no legal existence'
    ]
  },
  {
    id: 'deepfake-scams',
    title: 'AI Voice Cloning & Deepfake Video Family Emergencies',
    tag: 'Emerging AI',
    whatHappens: 'Scammers use 3-second audio clips scraped from social media to clone the voice of a family member, then call claiming an urgent car accident, arrest, or medical emergency.',
    warningSigns: [
      'Caller sounds distressed and claims their regular phone is broken/lost',
      'Demands urgent money transfer to an unfamiliar third-party account',
      'Urges you not to contact other family members'
    ],
    whatToDo: [
      'Hang up and call your family member back on their known, registered phone line',
      'Establish a secret family "safe-word" to verify genuine distress calls',
      'Contact their workplace, school, or close friends to confirm whereabouts'
    ],
    whatNotToDo: [
      'NEVER send emergency money without independent out-of-band verification',
      'NEVER assume voice alone is foolproof proof of identity in the generative-AI era'
    ]
  },
  {
    id: 'fake-job-offers',
    title: 'Part-Time Task & Telegram Recruitment Scams',
    tag: 'Employment Fraud',
    whatHappens: 'Offers lucrative work-from-home compensation (₹3,000–₹5,000/day) for rating hotels or liking YouTube videos. After paying initial small rewards, they trap victims into prepaid crypto tasks.',
    warningSigns: [
      'Job offer received via unsolicited WhatsApp message from international number',
      'High daily compensation for trivial automated tasks',
      'Requires you to deposit your own money to "unlock" higher tier tasks'
    ],
    whatToDo: [
      'Apply only through verified corporate career pages or official LinkedIn listings',
      'Block and report recruitment handles demanding upfront security deposits'
    ],
    whatNotToDo: [
      'NEVER pay registration fees or deposit money to receive a job or task payout',
      'NEVER join Telegram task groups promising guaranteed multipliers'
    ]
  },
  {
    id: 'social-engineering',
    title: 'Electricity & Utility Disconnection Threats',
    tag: 'Smishing',
    whatHappens: 'SMS warns that your power supply will be cut off at 9:30 PM due to an unpaid bill and gives a personal mobile number for "immediate resolution".',
    warningSigns: [
      'Message sent from personal 10-digit mobile number instead of official utility sender ID',
      'Strict night-time deadline designed to induce immediate panic',
      'Operator asks you to install an APK file or make a ₹10 recharge via remote link'
    ],
    whatToDo: [
      'Check your actual bill status directly on your official state electricity board app',
      'Notice the official electricity board consumer number format'
    ],
    whatNotToDo: [
      'NEVER call the phone number provided inside an SMS alert',
      'NEVER install APK files sent by alleged utility agents'
    ]
  }
];

export default function EducationPage() {
  const { t } = useLanguage();
  const [activeCardId, setActiveCardId] = useState(SAFETY_CARDS[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = SAFETY_CARDS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.whatHappens.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          Interactive Cyber Safety Knowledge Base
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
          Learn to Stay Safe: Fraud Vector Playbooks
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Comprehensive behavioral defense guides for the 10 most common Indian and regional cyber-fraud vectors.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter fraud vectors (e.g. upi, electricity, job, deepfake)..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
        />
      </div>

      {/* Grid of 10 Safety Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card) => {
          const isOpen = activeCardId === card.id;

          return (
            <div
              key={card.id}
              className={`cyber-card p-6 bg-slate-900/70 border transition-all ${
                isOpen ? 'border-cyan-500/50 shadow-[0_0_25px_rgba(0,240,255,0.08)]' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                    {card.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 mt-1.5">{card.title}</h3>
                </div>
                <button
                  onClick={() => setActiveCardId(isOpen ? null : card.id)}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                >
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* What Happens */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                <strong>What happens:</strong> {card.whatHappens}
              </p>

              {isOpen && (
                <div className="space-y-4 pt-2 border-t border-slate-800">
                  {/* Warning Signs */}
                  <div>
                    <h4 className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Warning Signs:
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {card.warningSigns.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold shrink-0">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What to Do */}
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5 mb-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      What TO Do:
                    </h4>
                    <ul className="space-y-1 text-xs text-emerald-200">
                      {card.whatToDo.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What NOT to Do */}
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/20">
                    <h4 className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5 mb-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      What NOT To Do:
                    </h4>
                    <ul className="space-y-1 text-xs text-rose-200">
                      {card.whatNotToDo.map((nd, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold shrink-0">✗</span>
                          <span>{nd}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {!isOpen && (
                <button
                  onClick={() => setActiveCardId(card.id)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mt-2"
                >
                  View Full Safety Protocol <ChevronDown className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
