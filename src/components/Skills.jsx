import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Database, 
  Layers, 
  CheckCircle2, 
  HardDrive, 
  Sparkles, 
  Layout, 
  FileCode2, 
  Network, 
  Terminal, 
  Palette, 
  Code2, 
  Cpu, 
  Box, 
  Globe, 
  Cloud,
  Wrench,
  Languages as LanguagesIcon
} from 'lucide-react';
import { FigmaIcon } from './Icons';

const iconMap = {
  Database,
  Layers,
  CheckCircle2,
  HardDrive,
  Sparkles,
  Layout,
  FileCode2,
  Network,
  Terminal,
  Palette,
  Code2,
  Cpu,
  Box,
  Globe,
  Cloud,
  Figma: FigmaIcon,
};

export default function Skills() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { skills, languages } = data;

  const allLabel = lang === 'en' ? 'All' : 'Tous';
  const categories = [allLabel, ...skills.map((s) => s.category)];
  const [activeCategory, setActiveCategory] = useState(allLabel);

  const filteredCategories =
    activeCategory === allLabel
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Wrench size={14} />
            <span>{lang === 'en' ? 'Technical Competencies' : 'Compétences Techniques'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? (
              <>Core Skills & <span className="text-gradient">Data Stack</span></>
            ) : (
              <>Stack Technique & <span className="text-gradient">Expertise</span></>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {lang === 'en'
              ? 'Relational database administration, advanced business intelligence dashboards, statistical computing, and data governance.'
              : 'Administration de bases de données relationnelles, création de tableaux de bord Power BI, statistiques et gouvernance des données.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 scale-105'
                    : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {group.items.length} {lang === 'en' ? 'skills' : 'compétences'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {group.items.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || Database;
                  return (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-brand-500/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs group-hover:scale-110 transition-transform">
                          <IconComponent size={18} />
                        </div>
                        <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate">
                          {skill.name}
                        </span>
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-brand-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1 text-[11px] text-slate-400">
                        <span>{lang === 'en' ? 'Proficiency' : 'Niveau'}</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">{skill.level}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Spoken Languages Section */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <LanguagesIcon size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'en' ? 'Language Proficiencies' : 'Langues Pratiquées'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'en' ? 'International communication capabilities' : 'Communication en environnement international'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((l, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {l.language}
                </div>
                <div className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                  {l.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
