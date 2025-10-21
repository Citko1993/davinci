'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Search, Rocket, BrainCircuit, Code, Zap, BarChart3, Bot, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import TimelineStep from './TimelineStep';
import ServiceBentoCard from './ServiceBentoCard';

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 450; // Width of one card + gap
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;
    
    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollPosition();
    // Check on window resize
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timeline steps - używam PRAWDZIWYCH opisów z waszego procesu
  const timelineSteps = [
    {
      number: "01",
      title: "Discovery",
      description: "We spend time understanding how your business actually works. Where you lose time, where data gets stuck, where decisions slow down.",
      icon: Brain,
      color: 'primary' as const,
      activities: [
        "Interviews with your team across departments",
        "Workflow mapping and bottleneck identification",
        "Data audit - where it lives, how it flows",
        "Pain point prioritization"
      ]
    },
    {
      number: "02",
      title: "ROI Mapping",
      description: "We find where AI adds real value—not where it's trendy. We show you exactly what problems are worth solving and why.",
      icon: Search,
      color: 'cyan' as const,
      activities: [
        "Opportunity analysis - what can be automated",
        "Cost-benefit breakdown for each solution",
        "Timeline and resource planning",
        "Risk assessment and mitigation"
      ]
    },
    {
      number: "03",
      title: "Build & Deploy",
      description: "We build custom systems, handle all integrations, train your team, and provide ongoing support. No off-the-shelf software—just what you need.",
      icon: Rocket,
      color: 'purple' as const,
      activities: [
        "Custom development tailored to your needs",
        "Integration with existing tools (CRM, accounting, etc.)",
        "Team training and documentation",
        "Ongoing support and optimization"
      ]
    }
  ];

  // Service cards - używam PRAWDZIWYCH opisów usług
  const services = [
    {
      icon: BrainCircuit,
      title: 'We Map Your Workflows',
      description: 'We spend time understanding how your business actually works. Where you lose time, where data gets stuck, where decisions slow down.',
    },
    {
      icon: Code,
      title: 'We Build Custom Systems',
      description: 'No off-the-shelf software. We build exactly what you need. Automations, dashboards, integrations—whatever solves your specific problem.',
    },
    {
      icon: Zap,
      title: 'We Handle Integrations',
      description: 'Your CRM, your accounting software, your spreadsheets—we connect everything so data flows automatically.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Dashboards',
      description: 'You get dashboards that show what\'s happening right now. No more waiting for reports.',
    },
    {
      icon: Bot,
      title: 'We Train Your Team',
      description: 'We don\'t just hand you a system and leave. We make sure your team knows how to use it.',
    },
    {
      icon: ShieldCheck,
      title: 'Ongoing Support',
      description: 'When something breaks or needs to change, we\'re here. No tickets, no waiting weeks.',
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative py-20 sm:py-32 overflow-x-hidden bg-dark-950"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      {/* Subtle animated background */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary-400 mb-6"
          >
            Our Process
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]"
          >
            <span className="block text-white mb-3">
              How We Work
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
              With You
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            We understand first, build second. No generic solutions—just systems tailored to your specific bottlenecks.
          </motion.p>
        </div>

        {/* Timeline Steps */}
        <div className="mb-20 sm:mb-32">
          {/* Desktop: Horizontal Scroll with Navigation Arrows */}
          <div className="hidden lg:block relative group">
            {/* Timeline container - Desktop horizontal scroll */}
            <div 
              ref={scrollRef}
              onScroll={checkScrollPosition}
              className="overflow-x-auto overflow-y-visible pb-8 scrollbar-hide px-4"
            >
              <div className="flex gap-8 min-w-max">
                {timelineSteps.map((step, index) => (
                  <TimelineStep
                    key={step.number}
                    {...step}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Left Navigation Arrow - Subtle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: showLeftArrow ? 0.6 : 0,
              }}
              whileHover={{ opacity: 1, scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll('left')}
              className={`absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg transition-all duration-300 ${
                !showLeftArrow ? 'pointer-events-none !opacity-0' : ''
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <ChevronLeft className="w-5 h-5 text-white/80 relative z-10" />
            </motion.button>

            {/* Right Navigation Arrow - Subtle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: showRightArrow ? 0.6 : 0,
              }}
              whileHover={{ opacity: 1, scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll('right')}
              className={`absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg transition-all duration-300 ${
                !showRightArrow ? 'pointer-events-none !opacity-0' : ''
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-l from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <ChevronRight className="w-5 h-5 text-white/80 relative z-10" />
            </motion.button>

            {/* Subtle gradient fade edges */}
            <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-dark-950/80 to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-dark-950/80 to-transparent z-10" />
          </div>

          {/* Mobile: Stacked vertically */}
          <div className="lg:hidden space-y-8">
            {timelineSteps.map((step, index) => (
              <TimelineStep
                key={step.number}
                {...step}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bento Grid - What We Do */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What We Deliver
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to make AI work for your business
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceBentoCard
                key={service.title}
                {...service}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-lg text-gray-400 mb-8">
            Ready to see where AI fits in your business?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="relative group px-10 py-5 bg-white/5 backdrop-blur-sm border-2 border-primary-500/50 rounded-full font-semibold text-lg text-white overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-cyan-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center gap-2">
              Get a Process Review
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

