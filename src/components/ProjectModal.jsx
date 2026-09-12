import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle, BarChart3, Layers, Database } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  const { lang } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="rounded-2xl overflow-hidden mb-6 aspect-video max-h-80 w-full relative group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold">
            {project.category}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {project.title}
            </h3>
            <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mt-1">
              {project.category} — {lang === 'en' ? 'International System Implementation' : 'Déploiement Opérationnel International'}
            </p>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-brand-500/25 transition-all hover:scale-105 shrink-0"
            >
              <span>{lang === 'en' ? 'Open Live Dashboard' : 'Ouvrir le Tableau de Bord'}</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {lang === 'en' ? 'Overview & Architecture' : 'Vue d’Ensemble & Architecture'}
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {project.longDescription || project.description}
          </p>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <BarChart3 size={16} />
              <span>{lang === 'en' ? 'Key Impact & Metrics' : 'Impacts Clés & Résultats'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers size={16} />
            <span>{lang === 'en' ? 'Methodologies & Technologies' : 'Méthodologies & Outils'}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
