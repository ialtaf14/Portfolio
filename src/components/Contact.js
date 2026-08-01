import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Copy, Github, Linkedin, MessageSquare } from 'lucide-react';

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

    // Build mailto fallback link to ensure message reaches Altaf
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open user's email client with pre-filled content
    window.open(`mailto:${emailAddress}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Let's Discuss Data Analyst & Science Opportunities
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Whether you have an internship or full-time role opening, an analytical problem, or want to discuss machine learning projects, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Direct Contact Information
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Prompt response within 24 hours guaranteed.
                </p>
              </div>

              {/* Email Copy Card */}
              <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Primary Email</div>
                    <div className="text-xs font-mono font-medium text-neutral-900 dark:text-white truncate">
                      {emailAddress}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone — opens dialer on click */}
              <motion.a
                href="tel:+918053821088"
                aria-label="Call Altaf Khan"
                whileHover={{ x: 4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="group flex items-center gap-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer rounded-xl px-3 py-2.5 -mx-3 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-transparent hover:border-blue-200/60 dark:hover:border-blue-800/40"
              >
                <motion.span
                  whileHover={{ rotate: [0, -15, 15, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0"
                >
                  <Phone className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
                </motion.span>
                <span>+91 8053821088</span>
                <span className="ml-auto text-[10px] font-mono text-blue-400 dark:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Tap to call →
                </span>
              </motion.a>

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

              {/* Social Links */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex gap-3">
                <a
                  href="https://github.com/ialtaf14"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/altaf-khan-7a544b256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl glass-card border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Send a Direct Message
                </h3>
              </div>

              {submitted && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>Thank you! Your message client was opened. I will respond to your email shortly.</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono uppercase text-neutral-500">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono uppercase text-neutral-500">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono uppercase text-neutral-500">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. Data Analyst Role / Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono uppercase text-neutral-500">Message</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  required
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;