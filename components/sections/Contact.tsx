'use client';

import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 overflow-hidden bg-dark-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary-400 mb-6"
            >
              Let&apos;s Talk
            </motion.span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
              <span className="block text-white mb-3">Ready to Make</span>
              <span 
                className="block"
                style={{
                  background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Smarter Decisions?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 mb-12 leading-relaxed">
              No sales pitch. No long proposals. Just a conversation about where your team loses time and where you need better information to compete.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <motion.a
                href="mailto:apps@davinci.agency"
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-primary-500/50 transition-all flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email us at</div>
                  <div className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                    apps@davinci.agency
                  </div>
                </div>
              </motion.a>

            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-primary-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
            <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="peer w-full px-6 pt-6 pb-2 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all"
                    placeholder="Your name"
                    required
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute top-2 left-6 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-400"
                  >
                    Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="peer w-full px-6 pt-6 pb-2 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute top-2 left-6 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-400"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="peer w-full px-6 pt-6 pb-2 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all resize-y min-h-[120px]"
                    placeholder="What decisions do you wish you could make faster or better?"
                    required
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute top-2 left-6 text-xs text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-5 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary-400"
                  >
                    Message
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group w-full px-8 py-5 bg-white text-dark-950 rounded-full font-semibold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400"
                    initial={{ x: '100%' }}
                    whileHover={{ x: isSubmitting ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="w-5 h-5" />}
                  </span>
                </motion.button>
              </form>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center">
                  Message sent! We&apos;ll respond within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
                  An error occurred while sending. Please try again.
                </div>
              )}

              {/* Trust badge */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-sm text-gray-400">
                  We&apos;ll get back to you within 24 hours ⚡
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

