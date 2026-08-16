import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check, Copy } from 'lucide-react';
import { BrandSocialButton, GithubLogo, LinkedinLogo, GmailLogo, VercelLogo, XLogo, InstagramLogo } from './ui/BrandLogos';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const emailAddress = 'altafkhan122105@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    window.open(`mailto:${emailAddress}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Let's Discuss Data Analyst &amp; Science Opportunities
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Whether you have an internship or full-time role opening, an analytical problem, or want to discuss machine learning projects, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Direct Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            <div className="p-8 rounded-3xl glass-panel-ultra glass-shimmer space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Direct Contact &amp; Profiles
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Click any official brand logo to connect directly.
                </p>
              </div>

              {/* Email Card (Clickable Gmail Mailto & Copy) */}
              <div className="p-4 rounded-2xl bg-neutral-100/70 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <a
                  href={`mailto:${emailAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 overflow-hidden group hover:opacity-80 transition-opacity"
                >
                  <div className="p-2.5 rounded-xl bg-[#EA4335] text-white shadow-md shadow-red-500/20">
                    <GmailLogo className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Primary Gmail</div>
                    <div className="text-xs font-mono font-medium text-neutral-900 dark:text-white truncate group-hover:text-red-500 transition-colors">
                      {emailAddress}
                    </div>
                  </div>
                </a>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location — opens Google Maps on click */}
              <motion.a
                href="https://www.google.com/maps/search/Gurugram,+Haryana,+India"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Gurugram on Google Maps"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex items-center gap-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 cursor-pointer rounded-xl px-3 py-2.5 -mx-3 hover:bg-red-50 dark:hover:bg-red-950/30 border border-transparent hover:border-red-200/60 dark:hover:border-red-800/40"
              >
                <motion.span
                  whileHover={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.4 }}
                  className="flex-shrink-0"
                >
                  <MapPin className="w-4 h-4 text-red-500 group-hover:text-red-600 transition-colors" />
                </motion.span>
                <span>Gurugram, Haryana, India</span>
                <span className="ml-auto text-[10px] font-mono text-red-400 dark:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  View on Maps →
                </span>
              </motion.a>

              {/* Official Brand Logo Links Grid */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-3">
                <div className="text-[11px] font-mono text-neutral-500">Official Clickable Profiles</div>
                <div className="grid grid-cols-2 gap-2.5">
                  <BrandSocialButton type="github" url="https://github.com/ialtaf14" label="GitHub" />
                  <BrandSocialButton type="linkedin" url="https://www.linkedin.com/in/ialtaf14/" label="LinkedIn" />
                  <BrandSocialButton type="portfolio" url="https://ialtaf14.vercel.app" label="Portfolio" />
                  <BrandSocialButton type="gmail" url={`mailto:${emailAddress}`} label="Gmail" />
                  <BrandSocialButton type="x" url="https://x.com/ialtaf14" label="X (Twitter)" />
                  <BrandSocialButton type="instagram" url="https://www.instagram.com/ialtaf.14" label="Instagram" />
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-5 sm:p-8 rounded-3xl glass-panel-ultra glass-shimmer">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6">
                Send a Direct Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-center space-y-2"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
                    <Check className="w-5 h-5" />
                  </div>
                  <div className="text-base font-bold">Message Drafted &amp; Mailto Triggered!</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Your default email client opened with the pre-filled inquiry. Thanks for reaching out!
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl text-base sm:text-xs bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 rounded-xl text-base sm:text-xs bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Data Analyst Opportunity / Project Inquiry"
                      className="w-full px-4 py-2.5 rounded-xl text-base sm:text-xs bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Altaf, I'd like to discuss an opportunity..."
                      className="w-full px-4 py-2.5 rounded-xl text-base sm:text-xs bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>Send Inquiry Message</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;