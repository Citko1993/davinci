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

export default function ProcessTimeline() {
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
      className="relative py-32 sm:py-48 overflow-hidden bg-dark-950"
    >
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-dark-950" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern" />
      
      {/* Single floating element - minimal */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header - Clean & Simple */}
        <div className="mb-20 text-center">
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
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white mb-3">
              How We Work
            </span>
            <span className="block text-primary-400">
              With You
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            We understand first, build second. No generic solutions—just systems tailored to your specific bottlenecks.
          </motion.p>
        </div>

        {/* Timeline Steps - Clean Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                {/* Number Badge */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/20 text-xl font-bold text-primary-400 mb-4">
                    {step.number}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${step.color === 'primary' ? 'bg-primary-500/20' : 'bg-cyan-500/20'}`}>
                      <step.icon className={`w-5 h-5 ${step.color === 'primary' ? 'text-primary-400' : 'text-cyan-400'}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Activities List */}
                <div className="space-y-2">
                  {step.activities.map((activity, activityIndex) => (
                    <div
                      key={activityIndex}
                      className="flex items-center gap-3 text-sm text-gray-400"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${step.color === 'primary' ? 'bg-primary-400' : 'bg-cyan-400'}`} />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {serviceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary-500/20">
                    <card.icon className="w-5 h-5 text-primary-400" />
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-xl font-semibold text-lg text-white transition-colors duration-300"
          >
            Get a Process Review
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}