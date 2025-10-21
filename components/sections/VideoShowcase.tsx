'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, TrendingUp, Users, DollarSign, FileText, Settings, Database } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function VideoShowcase() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setHasPlayed(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [hasPlayed]);

  const handlePlayClick = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      if (!currentSrc.includes('autoplay=true')) {
        iframeRef.current.src = currentSrc.replace('autoplay=false', 'autoplay=true');
      }
      setIsPlaying(true);
    }
  };

  const departments = [
    { icon: TrendingUp, dept: 'Marketing', benefit: 'AI-powered campaigns with automated tracking and optimization' },
    { icon: Users, dept: 'Customer Service', benefit: 'Enhanced support with AI-driven responses and automation' },
    { icon: Settings, dept: 'Operations', benefit: 'Automated internal processes for peak efficiency' },
    { icon: Database, dept: 'Data & Analytics', benefit: 'Redefine data interaction with AI insights' },
    { icon: DollarSign, dept: 'Finance', benefit: 'Automated reporting and intelligent forecasting' },
    { icon: FileText, dept: 'Process Automation', benefit: 'Transform challenges into automated workflows' }
  ];

  return (
    <section 
      ref={sectionRef}
      id="video" 
      className="relative py-20 sm:py-32 overflow-hidden bg-dark-900"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      {/* Animated background gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"
      />

      <motion.div 
        style={{ opacity, y }}
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary-400 mb-6"
          >
            Our Approach
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]"
          >
            <span className="block text-white mb-3">
              We Build 5x Faster.
            </span>
            <span 
              className="block"
              style={{
                background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              You Evolve Ahead.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            No-code development meets AI innovation. We transform your challenges into automated processes, your ideas into dedicated solutions—five times faster than traditional methods.
          </motion.p>
        </div>

        {/* Video Player - Cinematic */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group max-w-6xl mx-auto mb-20 sm:mb-32"
        >
          {/* Glow effect */}
          <div className="absolute -inset-6 bg-gradient-to-r from-primary-500/20 via-cyan-500/20 to-primary-500/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Video wrapper */}
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video w-full">
              <iframe
                ref={iframeRef}
                src="https://iframe.mediadelivery.net/embed/227688/830c65b2-17b6-4b32-a890-e682f3368d20?autoplay=false&preload=true&loop=false"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Custom play button overlay - shows before playing */}
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-dark-950/60 backdrop-blur-sm z-10 cursor-pointer group/play"
                >
                  <div className="relative">
                    <div className="absolute -inset-8 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover/play:opacity-70 transition-opacity" />
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 flex items-center justify-center shadow-2xl group-hover/play:shadow-primary-500/50 transition-shadow">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </motion.button>
              )}
            </div>

            {/* Video info bar */}
            <div className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Custom solutions. AI-powered automation. Total digital transformation.
                  </h3>
                  <p className="text-sm text-gray-400">
                    Watch how we help businesses evolve, innovate, and lead
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20 w-fit">
                  <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  <span className="text-sm font-medium text-primary-400">No-Code Power</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Departments Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              AI-Powered Solutions For Every Team
            </h3>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              We redefine your interaction with data, enhance customer service, automate internal operations—reaching new heights of business efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative"
              >
                <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden group-hover:border-white/20 transition-all duration-300 h-full">
                  <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                  
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/10 to-cyan-500/10 flex items-center justify-center border border-primary-500/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.dept}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.benefit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

