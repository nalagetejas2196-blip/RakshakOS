import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useSafety } from '../../context/SafetyContext';
import {
  Shield,
  Sun,
  Moon,
  Globe,
  LifeBuoy,
  Menu,
  X,
  Radar,
  Activity,
  Layers,
  BookOpen,
  UserCheck,
  Award
} from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { openEmergencyModal } = useSafety();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav_home', 'Home') },
    { path: '/security-center', label: t('nav_security_center', 'Security Center') },
    { path: '/scanner', label: t('nav_scanner', 'Threat Scanner') },
    { path: '/simulator', label: t('nav_simulator', 'OS Simulator') },
    { path: '/threat-intel', label: t('nav_intel', 'Threat Intel') },
    { path: '/education', label: t('nav_education', 'Education') },
    { path: '/sih-innovation', label: t('nav_sih', 'SIH 2026 Innovation') },
    { path: '/my-safety', label: t('nav_my_safety', 'My Safety') }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Research Label */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white font-mono">
                Rakshak<span className="text-cyan-400">OS</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-cyan-950/90 text-cyan-400 border border-cyan-500/30 hidden sm:inline-block">
                SIH 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden md:block">
              Unified AI Cyber-Fraud Defense
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  isActive
                    ? 'text-cyan-300 bg-slate-900 border border-cyan-500/30 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Utility Controls: Language Switcher, Theme, Emergency */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Selector */}
          <div className="relative flex items-center rounded-lg border border-slate-800 bg-slate-900/70 p-0.5 text-xs font-mono">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 rounded-md transition-all ${
                  lang === l.code
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Dark / Light Mode"
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Emergency Containment Action Button */}
          <button
            onClick={openEmergencyModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 text-xs font-bold font-mono transition-all animate-pulse"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden xl:inline">{t('nav_emergency', "I've Been Scammed")}</span>
            <span className="xl:hidden">1930 Help</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={openEmergencyModal}
            className="p-1.5 rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-400"
          >
            <LifeBuoy className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 p-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-medium ${
                  location.pathname === link.path
                    ? 'text-cyan-300 bg-slate-900 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex gap-1 text-xs font-mono">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded ${
                    lang === l.code ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 text-slate-400"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
