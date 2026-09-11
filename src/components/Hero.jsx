import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Mail, MapPin, Sparkles, Terminal, Database, Phone } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';

export default function Hero() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { personal, socials, titles } = data;

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(90);

  useEffect(() => {
    const currentFullTitle = titles[currentTitleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullTitle.substring(0, displayText.length + 1));
        if (displayText === currentFullTitle) {
          setIsDeleting(true);
          setTypingSpeed(1800);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setDisplayText(currentFullTitle.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
          setTypingSpeed(300);
        } else {
          setTypingSpeed(40);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, typingSpeed, titles]);

  return (
    <section
      id="hero"
      className="min-h-screen relative pt-28 pb-20 flex items-center justify-center bg-grid-pattern overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-brand-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-brand-500/30 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{personal.status}</span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4">
              {lang === 'en' ? "Hi, I'm" : "Bonjour, je suis"}{' '}
              <span className="text-gradient">{personal.name}</span>
            </h1>

            {/* Typewriter Dynamic Title */}
            <div className="h-10 sm:h-12 flex items-center text-lg sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6 font-mono">
              <span className="text-brand-500 mr-2">&gt;</span>
              <span>{displayText}</span>
              <span className="inline-block w-2.5 h-6 bg-brand-500 ml-1 animate-pulse" />
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
              {personal.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{lang === 'en' ? 'View Case Studies' : 'Voir les Réalisations'}</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail size={18} />
                <span>{lang === 'en' ? "Let's Connect" : 'Me Contacter'}</span>
              </a>
            </div>

            {/* Socials, Phone and Location bar */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={16} className="text-brand-500 shrink-0" />
                <span>{personal.location}</span>
              </div>

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-3">
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LinkedinIcon size={20} />
                  </a>
                )}
                {socials.phone && (
                  <a
                    href={`tel:${socials.phone}`}
                    aria-label="Phone"
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Phone size={17} />
                    <span className="hidden sm:inline">{socials.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Profile & Code Summary */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>

              <div className="relative glass-card rounded-3xl p-6 sm:p-8 overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                    <Database size={14} />
                    <span>analyst_query.sql</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-md ring-2 ring-brand-500/50">
                    ZD
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      {personal.name}
                    </h3>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                      {personal.role}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Sparkles size={13} className="text-amber-500" />
                      <span>{lang === 'en' ? 'MSc Computer Science (Distinction)' : 'MSc Informatique (Distinction)'}</span>
                    </div>
                  </div>
                </div>

                {/* SQL Query Simulation */}
                <div className="bg-slate-950 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed shadow-inner overflow-x-auto">
                  <p><span className="text-purple-400">SELECT</span></p>
                  <p className="pl-4"><span className="text-brand-400">analyst_name</span> = <span className="text-emerald-400">'Zarifou Djibril'</span>,</p>
                  <p className="pl-4"><span className="text-brand-400">expertise</span> = <span className="text-emerald-400">['SQL', 'Power BI', 'Governance']</span>,</p>
                  <p className="pl-4"><span className="text-brand-400">countries_supported</span> = <span className="text-amber-400">60</span>,</p>
                  <p className="pl-4"><span className="text-brand-400">availability</span> = <span className="text-emerald-400">'Permanent / Waterloo, ON'</span></p>
                  <p><span className="text-purple-400">FROM</span> <span className="text-slate-400">global_talent_pool;</span></p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                    📊 Power BI Specialist
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                    🗄️ Relational SQL
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                    🌍 WMO (OMM) Geneva
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
