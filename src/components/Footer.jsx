import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Clock, Database, Phone, Mail } from 'lucide-react';
import { LinkedinIcon } from './Icons';

export default function Footer() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { personal, socials } = data;
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info & Live Time */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <a
              href="#hero"
              className="flex items-center gap-2 group text-lg font-bold text-slate-900 dark:text-white"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Database size={17} />
              </div>
              <span>{personal.name}</span>
            </a>

            <div className="hidden sm:block h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

            {/* Live Clock */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-xs font-mono text-slate-600 dark:text-slate-300">
              <Clock size={13} className="text-brand-500" />
              <span>{currentTime || '12:00:00 PM'}</span>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </a>
              )}
              {socials.email && (
                <a
                  href={`mailto:${socials.email}`}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              )}
              {socials.phone && (
                <a
                  href={`tel:${socials.phone}`}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Phone"
                >
                  <Phone size={18} />
                </a>
              )}
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl glass-panel text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 hover:scale-105 transition-all shadow-sm"
              title={lang === 'en' ? 'Back to top' : 'Haut de page'}
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {personal.name}. {lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
          <p className="flex items-center gap-1 text-slate-400">
            {lang === 'en'
              ? 'Database Analyst | Power BI & Relational Architecture Portfolio'
              : 'Database Analyst | Portfolio Power BI & Architecture de Données'}
          </p>
        </div>
      </div>
    </footer>
  );
}
