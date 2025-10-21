'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Brain, 
  Search, 
  Rocket, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const processSteps = [
    {
      number: "01",
      title: "Find the pain",
      description: "We map your workflows, find where hours disappear, and pinpoint what's actually costing you money.",
      icon: Brain,
      gradient: "from-blue-500 to-cyan-500",
      color: "primary",
      features: [
        "Interview your team (not executives)",
        "Map real workflows (not ideal ones)",
        "Audit where data gets stuck",
        "Find the biggest time wasters"
      ]
    },
    {
      number: "02",
      title: "Calculate ROI",
      description: "No guessing. We show you exactly how much time and money you'll save—before we build anything.",
      icon: Search,
      gradient: "from-cyan-500 to-teal-500",
      color: "cyan",
      features: [
        "Hours saved per week",
        "Cost vs. benefit breakdown",
        "Expected payback timeline",
        "Risk analysis (what could go wrong)"
      ]
    },
    {
      number: "03",
      title: "Build it right",
      description: "Custom AI that fits your process. Not some off-the-shelf tool you'll stop using in 3 months.",
      icon: Rocket,
      gradient: "from-teal-500 to-blue-500",
      color: "primary",
      features: [
        "Built for your specific workflow",
        "Integrates with your tools",
        "Train your team properly",
        "Support when things break"
      ]
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative py-24 sm:py-32 lg:py-40 bg-dark-950 overflow-hidden"
    >
      {/* Animated background elements with parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
      />

      <motion.div 
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header - Premium Typography */}
        <div className="max-w-4xl mx-auto mb-20 sm:mb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-gray-400 tracking-wider uppercase">Our Process</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]"
          >
            <span className="block text-white mb-2">From bottleneck</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-400 bg-[length:200%_auto] animate-gradient">
              to breakthrough
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
          >
            Three steps. Zero fluff. Just AI that actually saves you time and money.
          </motion.p>
        </div>

        {/* Process Steps - Premium Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className="relative h-full p-6 sm:p-8 bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20">
                {/* Animated gradient overlay */}
                <motion.div 
                  animate={{
                    opacity: hoveredCard === index ? 0.08 : 0,
                    scale: hoveredCard === index ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-2xl`}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Number & Icon */}
                  <div className="flex items-start justify-between mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={`p-3 sm:p-4 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                    >
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </motion.div>
                    <span className="text-6xl sm:text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 transition-all duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.08 }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 group/item cursor-default"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                        <span className="text-sm sm:text-base text-gray-500 group-hover/item:text-gray-300 transition-colors">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom gradient line with animation */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.gradient} origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA - Magnetic Button Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <span className="text-sm font-medium text-primary-400 tracking-wide">Stop wasting time</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                See where your money goes
              </h3>
              <p className="text-gray-400 mt-2">Free 30-min process audit. No pitch, just insights.</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-8 py-4 bg-white text-dark-950 rounded-full font-semibold text-lg overflow-hidden shadow-2xl shadow-white/10 hover:shadow-white/30 transition-all duration-300 whitespace-nowrap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                Book your audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}