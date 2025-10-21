'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, 
  Search, 
  Rocket, 
  Code, 
  Zap, 
  BarChart3, 
  Bot, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function ProcessTimelineV1() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="relative py-32 sm:py-48 bg-dark-950"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
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
            <span className="block text-white mb-3">How We Work</span>
            <span className="block text-primary-400">With You</span>
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

        {/* Timeline with connecting lines */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-500 via-cyan-500 to-primary-500 rounded-full" />
          
          {/* Timeline steps */}
          <div className="space-y-20">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${step.color === 'primary' ? 'bg-primary-500/20' : 'bg-cyan-500/20'}`}>
                        <step.icon className={`w-6 h-6 ${step.color === 'primary' ? 'text-primary-400' : 'text-cyan-400'}`} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-primary-400">Step {step.number}</span>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step.activities.map((activity, activityIndex) => (
                        <div key={activityIndex} className="flex items-center gap-3 text-sm text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full ${step.color === 'primary' ? 'bg-primary-400' : 'bg-cyan-400'}`} />
                          <span>{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-dark-950 border-4 border-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-400">{step.number}</span>
                </div>
                
                {/* Spacer */}
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
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
