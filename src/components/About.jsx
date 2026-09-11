import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Database, BarChart3, ShieldCheck, Cpu, CheckCircle2, Flame, Compass } from 'lucide-react';

export default function About() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { personal, stats, highlights } = data;

  const icons = [
    <Database className="text-brand-500" size={24} />,
    <BarChart3 className="text-indigo-500" size={24} />,
    <ShieldCheck className="text-emerald-500" size={24} />,
    <Cpu className="text-purple-500" size={24} />,
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Compass size={14} />
            <span>{lang === 'en' ? 'Professional Profile' : 'Profil Professionnel'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? (
              <>Turning Complex Data Into <span className="text-gradient">Actionable Intelligence</span></>
            ) : (
              <>Transformer la Donnée en <span className="text-gradient">Décisions Stratégiques</span></>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {lang === 'en'
              ? 'Over 3 years of international data analytics and database management experience across global programmes.'
              : "Plus de 3 ans d'expérience internationale en analyse de données et gestion de bases de données pour des programmes mondiaux."}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Story Card (8 cols) */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>{lang === 'en' ? 'Executive Bio' : 'Parcours & Expertise'}</span>
                <Flame className="text-amber-500" size={22} />
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {personal.bioParagraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                <span>{lang === 'en' ? 'Relational Architecture' : 'Architecture Relationnelle'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                <span>{lang === 'en' ? 'Data Governance Standard' : 'Gouvernance & Conformité'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
                <span>{lang === 'en' ? 'Decision-Ready BI' : 'Décisionnel & Power BI'}</span>
              </div>
            </div>
          </div>

          {/* Stats Matrix Card (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-3xl p-6 flex flex-col justify-center items-center text-center group hover:scale-[1.02] transition-transform"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 flex flex-col justify-start group hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {icons[idx] || <Database size={24} />}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
