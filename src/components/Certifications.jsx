import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Award, CheckCircle, Clock, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { certifications } = data;

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Award size={14} />
            <span>{lang === 'en' ? 'Verified Credentials' : 'Certifications & Accréditations'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? (
              <>Professional <span className="text-gradient">Certifications</span></>
            ) : (
              <>Certifications <span className="text-gradient">Professionnelles</span></>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {lang === 'en'
              ? 'Continuous learning and verified technical proficiency in Business Intelligence, SQL, and Data Science.'
              : 'Perfectionnement continu et compétences certifiées en Business Intelligence, SQL et Data Science.'}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, index) => {
            const isInProgress = cert.badge.toLowerCase().includes('progress') || cert.badge.toLowerCase().includes('cours');
            return (
              <div
                key={index}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <Award size={20} />
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        isInProgress
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {isInProgress ? <Clock size={12} /> : <CheckCircle size={12} />}
                      <span>{cert.badge}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {cert.name}
                  </h3>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{cert.issuer}</span>
                  <span className="font-mono">{cert.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
