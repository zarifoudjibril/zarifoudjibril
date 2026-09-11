import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Quote, MessageSquareHeart } from 'lucide-react';

export default function Testimonials() {
  const { testimonials } = portfolioData;

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <MessageSquareHeart size={14} />
            <span>Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Teammates & <span className="text-gradient">Leaders Say</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between relative group hover:-translate-y-1 transition-all"
            >
              <Quote
                size={40}
                className="text-brand-500/20 absolute top-6 right-6 group-hover:text-brand-500/40 transition-colors"
              />
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed italic mb-6 relative z-10">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/40"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
