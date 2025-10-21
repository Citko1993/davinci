'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Brain, 
  Search, 
  Rocket, 
  Code, 
  Zap, 
  BarChart3, 
  Bot, 
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ProcessTimelineAwwwards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
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
      description: "We build custom systems, handle integrations, and provide ongoing support. No off-the-shelf software—just what you need.",
      icon: Rocket,
      color: 'primary' as const,
      activities: [
        "Custom development tailored to your needs",
        "Integration with existing tools (CRM, accounting, etc.)",
        "Team training and documentation",
        "Ongoing support and optimization"
      ]
    }
  ];

  const serviceCards = [
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
      className="relative py-32 sm:py-48 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)
        `
      }}
    >
      {/* Floating 3D Elements */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-2xl blur-sm"
        style={{
          transform: 'perspective(1000px) rotateX(60deg)',
          boxShadow: '0 0 100px rgba(59, 130, 246, 0.1)'
        }}
      />
      
      <motion.div
        animate={{
          rotateY: [360, 0],
          rotateX: [0, -10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-primary-500/20 rounded-full blur-sm"
        style={{
          transform: 'perspective(1000px) rotateX(45deg)',
          boxShadow: '0 0 80px rgba(6, 182, 212, 0.1)'
        }}
      />

      {/* Glassmorphism Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary-500/10 to-cyan-500/10 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.05, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-l from-cyan-500/8 to-primary-500/8 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header - Awwwards Style */}
        <div className="mb-24 sm:mb-32 text-center relative">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-primary-400 text-sm font-medium mb-8 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Our Process
          </motion.div>
          
          {/* Main Title with Gradient Text */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.3)'
            }}
          >
            How We Work
            <br />
            <span className="text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
              With You
            </span>
          </motion.h2>
          
          {/* Subtitle with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              className="p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                We understand first, build second. No generic solutions—just systems tailored to your specific bottlenecks.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline Steps - Awwwards Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div 
                className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${step.color === 'primary' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(6, 182, 212, 0.1)'} 0%, transparent 100%)`
                  }}
                />
                
                {/* Number Badge */}
                <div className="relative z-10 mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 text-2xl font-bold text-white mb-4">
                    {step.number}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${step.color === 'primary' ? 'bg-primary-500/20' : 'bg-cyan-500/20'}`}>
                      <step.icon className={`w-6 h-6 ${step.color === 'primary' ? 'text-primary-400' : 'text-cyan-400'}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="relative z-10 text-gray-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Activities List */}
                <div className="relative z-10 space-y-3">
                  {step.activities.map((activity, activityIndex) => (
                    <motion.div
                      key={activityIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: activityIndex * 0.1 }}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${step.color === 'primary' ? 'bg-primary-400' : 'bg-cyan-400'}`} />
                      <span>{activity}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div 
                className="p-6 rounded-2xl backdrop-blur-xl border border-white/10 h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary-500/20">
                    <card.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div 
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/10 mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-white font-medium">Ready to transform your workflow?</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-2xl font-semibold text-lg text-white overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center gap-2">
              Get a Process Review
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
