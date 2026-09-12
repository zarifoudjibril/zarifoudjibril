import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  Phone,
  CheckCircle2,
  AlertCircle,
  MapPin
} from 'lucide-react';
import { LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';

const WEB3FORMS_ACCESS_KEY = "ebcf6c63-e82f-4781-a907-5047d1a6e432";

export default function Contact() {
  const { lang } = useLanguage();
  const data = portfolioData[lang] || portfolioData.en;
  const { personal, socials, contact } = data;

  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socials.email || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Submission from Portfolio',
          message: formData.message,
          from_name: 'Zarifou Djibril Portfolio Website',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        triggerConfetti();
      } else {
        setFormStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage(
        lang === 'en'
          ? 'Network error. Please try again or email me directly at ' + socials.email
          : 'Erreur réseau. Veuillez réessayer ou m’écrire directement à ' + socials.email
      );
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#6366f1', '#a855f7', '#10b981'],
      });
    } catch (err) {
      // Fallback
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-3">
            <MessageSquare size={14} />
            <span>{contact.heading}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {lang === 'en' ? (
              <>Let's Discuss Opportunities & <span className="text-gradient">Data Solutions</span></>
            ) : (
              <>Échangeons sur vos <span className="text-gradient">Projets & Opportunités</span></>
            )}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
            {contact.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info & Quick Copy */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {contact.quickContact}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                {contact.quickDesc}
              </p>

              {/* Copy Email Box */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 mb-4">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail size={18} className="text-brand-500 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate">
                    {socials.email}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-brand-500 transition-all shrink-0 shadow-xs"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-emerald-500 font-semibold mb-4 text-center animate-in fade-in">
                  {contact.copied}
                </p>
              )}

              {/* Direct Info list */}
              <div className="space-y-3 pt-2">
                {socials.phone && (
                  <a
                    href={`tel:${socials.phone}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-500/10 hover:border-brand-500/30 border border-slate-200/60 dark:border-slate-700/60 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Phone' : 'Téléphone'}</div>
                      <div>{socials.phone}</div>
                    </div>
                  </a>
                )}

                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-brand-500/10 hover:border-brand-500/30 border border-slate-200/60 dark:border-slate-700/60 transition-all text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs">
                      <LinkedinIcon size={16} />
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-wider">LinkedIn</div>
                      <div>linkedin.com/in/zarifou-djibril</div>
                    </div>
                  </a>
                )}

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">{lang === 'en' ? 'Availability' : 'Disponibilité'}</div>
                    <div>{personal.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8">
              {formStatus === 'success' ? (
                <div className="text-center py-10 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {contact.successTitle}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto mb-6">
                    {contact.successDesc}
                  </p>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    {contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formStatus === 'error' && (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-in fade-in">
                      <AlertCircle size={18} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        {contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={lang === 'en' ? 'John Doe' : 'Jean Dupont'}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        {contact.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="recruiter@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      {contact.subjectLabel}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={lang === 'en' ? 'Database Analyst Opportunity / Project Inquiry' : 'Opportunité Data Analyst / Proposition de Projet'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                      {contact.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={lang === 'en' ? 'Hello Zarifou, I would like to discuss...' : 'Bonjour Zarifou, nous souhaiterions échanger avec vous concernant...'}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>{contact.sendingButton}</span>
                      </span>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>{contact.sendButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
