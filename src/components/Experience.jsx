import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';

export default function Experience() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { experience, education } = data;
  const [tab, setTab] = useState('experience');

  return (
    <section id="experience" className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Award size={14} />
            <span>{lang === 'en' ? 'Track Record' : 'Parcours'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? (
              <>Work Experience & <span className="text-gradient">Education</span></>
            ) : (
              <>Expérience & <span className="text-gradient">Formation</span></>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
            {lang === 'en'
              ? 'International consulting roles at the World Meteorological Organization (WMO) and dual Master’s degrees.'
              : 'Missions internationales à l’Organisation Météorologique Mondiale (OMM) et double formation de Master.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="glass-panel p-1.5 rounded-2xl flex gap-1">
            <button
              onClick={() => setTab('experience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                tab === 'experience'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase size={16} />
              <span>{lang === 'en' ? 'Professional Experience' : 'Expérience Professionnelle'}</span>
            </button>
            <button
              onClick={() => setTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                tab === 'education'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap size={16} />
              <span>{lang === 'en' ? 'Degrees & Education' : 'Diplômes & Formation'}</span>
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-10">
          {tab === 'experience' &&
            experience.map((item, index) => (
              <div key={index} className="relative pl-6 sm:pl-10 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-950 group-hover:scale-125 transition-transform" />

                <div className="glass-card rounded-3xl p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <div className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                        {item.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 font-mono">
                        <Calendar size={13} />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={13} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Key Achievements */}
                  {item.achievements && (
                    <div className="space-y-2 mb-5">
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skill Badges */}
                  {item.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

          {tab === 'education' &&
            education.map((item, index) => (
              <div key={index} className="relative pl-6 sm:pl-10 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-white dark:ring-slate-950 group-hover:scale-125 transition-transform" />

                <div className="glass-card rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.degree}
                      </h3>
                      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                        {item.institution}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1 font-mono">
                        <Calendar size={13} />
                        <span>{item.period}</span>
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={13} />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
