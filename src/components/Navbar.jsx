import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Menu, X, Download, Database, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const currentData = portfolioData[lang] || portfolioData.en;
  const nav = currentData.nav;

  const navLinks = [
    { name: nav.about, href: '#about' },
    { name: nav.skills, href: '#skills' },
    { name: nav.projects, href: '#projects' },
    { name: nav.experience, href: '#experience' },
    { name: nav.certifications, href: '#certifications' },
    { name: nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Database size={19} />
          </div>
          <span className="font-extrabold tracking-tight">
            {currentData.personal.name.split(' ')[0]}
            <span className="text-brand-600 dark:text-brand-400">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right actions: Language Switcher + Theme Toggle + Contact CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher Pill */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-xs"
            title={lang === 'en' ? 'Passer en Français' : 'Switch to English'}
            aria-label="Toggle language"
          >
            <Globe size={14} className="text-brand-500" />
            <span className="uppercase tracking-wider">{lang === 'en' ? 'FR 🇫🇷' : 'EN 🇬🇧'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl glass-panel text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 hover:scale-105 transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href={currentData.personal.resumeUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-md shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Download size={15} />
            <span>{lang === 'en' ? 'Get in Touch' : 'Me Contacter'}</span>
          </a>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl glass-panel text-xs font-bold text-slate-700 dark:text-slate-200"
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'FR 🇫🇷' : 'EN 🇬🇧'}
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-xl glass-panel text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel mt-2 mx-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'bg-brand-500 text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-600 text-white text-center shadow-md"
            >
              <Download size={16} />
              <span>{lang === 'en' ? 'Get In Touch' : 'Me Contacter'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
