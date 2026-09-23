import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

const KNOWLEDGE_BASE = {
  mr: [
    {
      keywords: ['लिंक', 'url', 'वेबसाईट', 'सुरक्षित', 'तपासा'],
      response: 'मी या लिंकचे विश्लेषण करू शकतो. कृपया ही लिंक वरील "यूआरएल स्कॅनर" मध्ये पेस्ट करा. अनोळखी किंवा संशयास्पद लिंकवर कधीही क्लिक करू नका.',
      actionType: 'NAV_URL'
    },
    {
      keywords: ['ओटीपी', 'पिन', 'सांगू का', 'पैसे'],
      response: 'सावधान! कोणताही बँक अधिकारी किंवा पोलीस फोनवर कधीही ओटीपी मागत नाहीत. पैसे मिळवण्यासाठी किंवा रिफंडसाठी ओटीपी लागत नाही. ओटीपी अजिबात सांगू नका.',
      actionType: 'WARN_OTP'
    },
    {
      keywords: ['कॉल', 'पोलीस', 'सीबीआय', 'अटक', 'डिजिटल अरेस्ट'],
      response: 'धोका! भारत सरकार किंवा पोलीस व्हिडिओ कॉलवर कोणालाही "डिजिटल अरेस्ट" करत नाहीत. हा १००% सायबर गुन्हा आहे. त्वरित कॉल कट करा आणि १९३० वर तक्रार करा.',
      actionType: 'WARN_CALL'
    },
    {
      keywords: ['क्युआर', 'स्कॅन', 'रिफंड', 'पैसे आले'],
      response: 'नियम लक्षात ठेवा: क्यूआर कोड स्कॅन केल्यावर आणि यूपीआय पिन टाकल्यावर पैसे खात्यातून कापले जातात, पैसे जमा होत नाहीत. रिफंडसाठी स्कॅन करू नका.',
      actionType: 'WARN_UPI'
    }
  ],
  hi: [
    {
      keywords: ['लिंक', 'url', 'वेबसाइट', 'सुरक्षित', 'चेक'],
      response: 'मैं इस लिंक का विश्लेषण कर सकता हूँ। कृपया इस लिंक को ऊपर "यूआरएल स्कैनर" में पेस्ट करें। किसी भी अनजान लिंक पर क्लिक न करें।',
      actionType: 'NAV_URL'
    },
    {
      keywords: ['ओटीपी', 'पिन', 'शेयर', 'पैसे'],
      response: 'सावधान! कोई भी बैंक अधिकारी या पुलिस कभी फोन पर ओटीपी नहीं मांगते। पैसे प्राप्त करने या रिफंड के लिए ओटीपी की आवश्यकता नहीं होती। ओटीपी कभी साझा न करें।',
      actionType: 'WARN_OTP'
    },
    {
      keywords: ['कॉल', 'पुलिस', 'सीबीआई', 'अरेस्ट', 'डिजिटल अरेस्ट'],
      response: 'खतरा! कानून प्रवर्तन या पुलिस वीडियो कॉल पर किसी को "डिजिटल अरेस्ट" नहीं करते। यह पूर्णतः फर्जी कॉल है। तुरंत फोन काटें और १९३० पर रिपोर्ट करें।',
      actionType: 'WARN_CALL'
    },
    {
      keywords: ['क्यूआर', 'स्कैन', 'रिफंड', 'पैसे मिले'],
      response: 'याद रखें: क्यूआर कोड स्कैन करने और यूपीआई पिन दर्ज करने से पैसे कटते हैं, पैसे आते नहीं हैं। रिफंड के लिए क्यूआर कोड कभी स्कैन न करें।',
      actionType: 'WARN_UPI'
    }
  ],
  en: [
    {
      keywords: ['link', 'url', 'website', 'safe', 'check', 'analyze'],
      response: 'I can analyze this link for you. Please paste the target link into our URL Scanner tab above. Avoid clicking unverified links.',
      actionType: 'NAV_URL'
    },
    {
      keywords: ['otp', 'pin', 'share', 'refund', 'money'],
      response: 'CRITICAL ALERT! Banks and authorities will NEVER ask for your OTP. You never need an OTP or UPI PIN to receive money. Do not disclose it.',
      actionType: 'WARN_OTP'
    },
    {
      keywords: ['call', 'police', 'cbi', 'arrest', 'digital arrest', 'customs'],
      response: 'DANGER! Indian law enforcement agencies NEVER place citizens under "digital arrest" over video calls. Hang up immediately and dial 1930.',
      actionType: 'WARN_CALL'
    },
    {
      keywords: ['qr', 'scan', 'payment', 'receive'],
      response: 'Security Principle: Scanning a QR code or entering your UPI PIN will DEBIT money from your account, never credit it. Refuse this transaction.',
      actionType: 'WARN_UPI'
    }
  ]
};

export default function RakshakAssistant() {
  const { lang, setLang, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [detectedAction, setDetectedAction] = useState(null);

  const recognitionRef = useRef(null);

  // Quick prompt chips
  const quickPrompts = {
    mr: [
      'हा लिंक सुरक्षित आहे का?',
      'मला रिफंडसाठी ओटीपी विचारत आहेत',
      'पोलीस बनून फोन आला, काय करू?',
      'क्यूआर कोड स्कॅन करून पैसे मिळतील का?'
    ],
    hi: [
      'क्या यह लिंक सुरक्षित है?',
      'मुझसे रिफंड के लिए ओटीपी मांगा जा रहा है',
      'पुलिस बनकर कॉल आया है, क्या करूं?',
      'क्या क्यूआर स्कैन करके पैसे प्राप्त होंगे?'
    ],
    en: [
      'Is this URL link safe to open?',
      'Someone is asking for OTP to send refund',
      'Received call from fake CBI officer',
      'Can I receive money by scanning QR code?'
    ]
  };

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);

          if (event.results[0].isFinal) {
            handleQuery(currentTranscript);
          }
        };

        recognition.onerror = (err) => {
          console.warn('[Rakshak Voice API Notice]', err.error);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn('SpeechRecognition initialization failed:', err);
        setSpeechSupported(false);
      }
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleQuery = (queryText) => {
    const text = queryText.toLowerCase();
    const kb = KNOWLEDGE_BASE[lang] || KNOWLEDGE_BASE.en;

    let matched = kb.find(entry =>
      entry.keywords.some(kw => text.includes(kw.toLowerCase()))
    );

    let reply = '';
    let action = null;

    if (matched) {
      reply = matched.response;
      action = matched.actionType;
    } else {
      if (lang === 'mr') {
        reply = 'मी तुमचा प्रश्न समजून घेत आहे. संशयास्पद संदेश किंवा लिंकचे सखोल विश्लेषण करण्यासाठी कृपया संबंधित स्कॅनर टॅब वापरा.';
      } else if (lang === 'hi') {
        reply = 'मैं आपकी बात समझ रहा हूँ। संदिग्ध लिंक, मैसेज या कॉल के विस्तृत विश्लेषण के लिए कृपया उपयुक्त थ्रेट स्कैनर टैब का उपयोग करें।';
      } else {
        reply = 'I am processing your security inquiry. For complete contextual threat analysis, please utilize the appropriate scanner tab above.';
      }
    }

    setAssistantReply(reply);
    setDetectedAction(action);
    speakText(reply);
  };

  const toggleListening = () => {
    if (!speechSupported) {
      alert('Browser speech recognition is not supported in this environment. You can click any of the safety prompt chips below!');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setAssistantReply('');
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn('Failed to start speech recognition', e);
      }
    }
  };

  return (
    <div className="cyber-card p-6 border-cyan-500/20 bg-slate-900/60">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              {t('assistant_title', 'Rakshak Assistant')}
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                Web Speech API
              </span>
            </h3>
            <p className="text-xs text-slate-400">{t('assistant_subtitle')}</p>
          </div>
        </div>

        {/* Language selector in assistant */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Language:</span>
          <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all ${
                lang === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all ${
                lang === 'hi' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('mr')}
              className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all ${
                lang === 'mr' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>

      {/* Main Assistant Interaction Body */}
      <div className="py-6 flex flex-col items-center justify-center text-center">
        {/* Animated Microphone Trigger */}
        <div className="relative mb-4">
          {/* Subtle Radar Ring when listening */}
          {isListening && (
            <div className="absolute -inset-3 rounded-full bg-cyan-400/20 animate-ping pointer-events-none"></div>
          )}

          <button
            onClick={toggleListening}
            className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-rose-500 text-white shadow-[0_0_30px_#ef4444]'
                : 'bg-gradient-to-br from-cyan-400 to-sky-600 text-slate-950 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]'
            }`}
          >
            {isListening ? <Mic className="w-8 h-8 animate-pulse" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="h-6 flex items-center gap-1 mb-3">
          {[40, 75, 95, 60, 30, 85, 100, 50, 20, 65, 90, 45].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isListening
                  ? 'bg-cyan-400 animate-wave-bar'
                  : isSpeaking
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-slate-700/60'
              }`}
              style={{
                height: isListening ? `${h}%` : isSpeaking ? '50%' : '20%',
                animationDelay: `${i * 0.08}s`
              }}
            ></span>
          ))}
        </div>

        <p className="text-xs font-mono text-slate-400">
          {isListening
            ? t('assistant_listening', 'Listening... Speak your security query')
            : isSpeaking
            ? t('assistant_speaking', 'Speaking response...')
            : t('assistant_idle', 'Tap microphone to begin voice safety check')}
        </p>

        {/* Live Transcript / Output Box */}
        {(transcript || assistantReply) && (
          <div className="mt-4 w-full max-w-xl p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-left">
            {transcript && (
              <div className="mb-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  You Spoke:
                </span>
                <p className="text-sm text-slate-200 font-medium">"{transcript}"</p>
              </div>
            )}

            {assistantReply && (
              <div className="border-t border-slate-800/80 pt-2 mt-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  Rakshak Defense:
                </span>
                <p className="text-sm text-emerald-200 leading-relaxed font-normal">
                  {assistantReply}
                </p>
              </div>
            )}

            {isSpeaking && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={stopSpeaking}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-mono bg-rose-950/40 border border-rose-500/30 px-3 py-1 rounded-lg"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  {t('assistant_stop', 'Stop Speaking')}
                </button>
              </div>
            )}
          </div>
        )}

        {!speechSupported && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400/90 font-mono bg-amber-950/30 border border-amber-500/20 px-3 py-1.5 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            Speech Recognition API not native in this browser. Use the interactive prompt chips below.
          </div>
        )}
      </div>

      {/* Quick Prompts Carousel */}
      <div className="pt-4 border-t border-slate-800">
        <span className="text-[11px] font-mono text-slate-500 block mb-2">
          Or try a rapid security scenario query:
        </span>
        <div className="flex flex-wrap gap-2">
          {(quickPrompts[lang] || quickPrompts.en).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTranscript(prompt);
                handleQuery(prompt);
              }}
              className="text-xs text-slate-300 hover:text-cyan-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg transition-all text-left"
            >
              💬 {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
