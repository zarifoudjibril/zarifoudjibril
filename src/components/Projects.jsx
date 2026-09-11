import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from './ProjectModal';
import { ExternalLink, Search, Sparkles, FolderGit2 } from 'lucide-react';
import { LinkedinIcon } from './Icons';

export default function Projects() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { projects } = data;

  const allLabel = lang === 'en' ? 'All' : 'Tous';
  const categories = [allLabel, ...new Set(projects.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState(allLabel);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === allLabel || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <FolderGit2 size={14} />
            <span>{lang === 'en' ? 'Key Projects & Case Studies' : 'Études de Cas & Projets'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? (
              <>Global Data Systems & <span className="text-gradient">Case Studies</span></>
            ) : (
              <>Systèmes de Données & <span className="text-gradient">Réalisations</span></>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            {lang === 'en'
              ? 'International tracking databases, multi-country compliance tools, and executive Power BI dashboards.'
              : 'Bases de données de suivi international, outils de conformité multi-pays et tableaux de bord de pilotage Power BI.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                    : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search by keyword, SQL, Power BI...' : 'Recherche par mot-clé, SQL, BI...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-panel text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {lang === 'en' ? 'No projects found matching your search filter.' : 'Aucun projet trouvé avec ces critères.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory(allLabel);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
            >
              {lang === 'en' ? 'Reset Filters' : 'Réinitialiser'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-3xl overflow-hidden flex flex-col group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 max-h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Sparkles size={12} />
                      <span>{lang === 'en' ? 'Featured System' : 'Système Clé'}</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer Action Links */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                      >
                        <span>{lang === 'en' ? 'Read Full Case Study' : "Lire l'Étude de Cas"}</span>
                        <ExternalLink size={13} />
                      </button>

                      <span className="text-xs text-slate-400 font-medium">
                        WMO / OMM Programme
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
