'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Layers, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  results: Record<string, string>;
  image: string;
  tags: string[];
  expertise: string[];
  platform: string;
}

export default function CaseStudies() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // REAL DATA - NO HALLUCINATIONS
  const caseStudies: CaseStudy[] = [
    {
      id: 'pos-management',
      title: 'POS Management Process Digitalization',
      subtitle: 'Across a Network of 1000+ Retail Stores',
      industry: 'Cosmetics',
      duration: '10 weeks',
      description: 'Our client – a leading European retailer in the cosmetics industry with over 1000+ retail stores across Europe – faced the challenge of increasing efficiency and personalizing their offline marketing activities.',
      challenge: 'Implementation of an advanced POS (Point of Sale) management system that would facilitate the process of launching new campaigns, controlling the process, and minimizing errors.',
      solution: 'Utilizing the no-code platform Bubble.io, the Davinci Agency team created a complex management system that enables the digitalization of the ordering and management process for POS materials.',
      results: {
        status: 'Currently being tested in one European country',
        future: 'Paving the way for deployment across the entire European Union',
        savings: 'Several hundred thousand euros saved'
      },
      image: 'https://cdn.prod.website-files.com/65cfc8532ce53267d57e7c23/65ef69abd8b8972abace3f54_dawiddavinci.agency_retailer_in_the_cosmetics_industry_a1c34416-7d64-4919-abb2-9dcbbc87740e.png',
      tags: ['Enterprise', 'Retail', 'Bubble.io'],
      expertise: ['Development'],
      platform: 'Web',
    },
    {
      id: 'mytherapy',
      title: 'MyTherapy',
      subtitle: 'Digital Transformation in Medical Sector',
      industry: 'Healthcare',
      duration: '11 months',
      description: 'MyTherapy is a case study of successful digital transformation in a medical company that was struggling with scattered processes relying on multiple tools and manual procedures, creating operational burden and numerous errors.',
      challenge: 'Data fragmentation across multiple sources, high cost of manual processes, lack of scalability, and the need to integrate with national healthcare systems while implementing a secure permissions system.',
      solution: 'We designed and implemented a comprehensive system using Xano (backend/API) and WeWeb (frontend) that centralized all key aspects of the client\'s operations with modules for operational management, data management, and administration.',
      results: {
        efficiency: 'AI-powered call handling system - significantly reducing reception workload',
        security: 'Granular permissions system with over 100 different access levels for precise data management',
        performance: 'Architecture with 130+ API endpoints delivering response times of just 0.01 seconds'
      },
      image: '/mytherapy-screenshot.png',
      tags: ['Healthcare', 'AI Integration', 'Digital Transformation'],
      expertise: ['Development', 'UX/UI Design', 'System Architecture'],
      platform: 'Web',
    },
    {
      id: 'cloudcook',
      title: 'CloudCook',
      subtitle: 'Revolutionizing Summer Camp Food Delivery',
      industry: 'Kitchen management',
      duration: '8 weeks',
      description: 'CloudCook is a comprehensive kitchen management solution designed to streamline food service operations in summer camps.',
      challenge: 'Creating an application aimed at optimizing the food ordering and delivery process for summer camps throughout the USA. Primary goal was to create a system that, based on forecasts of expected guests and predetermined menu, would automatically calculate required product quantities.',
      solution: 'After thorough analysis, built application from scratch in Bubble.io. Conducted workshops to refine specifications and ensure full understanding of client requirements.',
      results: {
        conclusion: 'Delivered a comprehensive tool that not only streamlines the kitchen management process but also automates the ordering process. Despite short execution time, exceeded client\'s expectations.',
        testimonial: 'I\'ve had a rewarding experience with Davinci while developing my application, appreciating their knowledgeable, reliable, and comprehensive approach.',
        author: 'Alex Lagios, Founder & Strategist, Cloud Cook'
      },
      image: 'https://cdn.prod.website-files.com/65cfc8532ce53267d57e7c23/65d1f5d4eafc1e4b591704b2_CloudCook.jpg',
      tags: ['SaaS', 'Food Service', 'Bubble.io'],
      expertise: ['Analysis', 'Development'],
      platform: 'Web',
    },
    {
      id: 'skag',
      title: 'Skag.AI',
      subtitle: 'Streamlining SEM with AI',
      industry: 'SEM',
      duration: '2 weeks',
      description: 'Skag.AI is an innovative SaaS platform designed to revolutionize Search Engine Marketing (SEM) by automating and optimizing ad creation and keyword research.',
      challenge: 'Skag.AI was developed to address complexities faced by entrepreneurs and SEM agencies in ad creation, particularly using SKAG (Single Keyword Ad Groups) and STAG (Single Theme Ad Groups) methodologies.',
      solution: 'Built with Bubble.io, Rowy backend, Webflow landing page, and OpenAI (versions 3.5 to 4.0) integration.',
      results: {
        launch: '4 weeks',
        impact: 'Swift market entry and customer acquisition demonstrated immediate value and impact in SEM space',
        customer: 'First customer soon after launch'
      },
      image: 'https://cdn.prod.website-files.com/65cfc8532ce53267d57e7c23/65ef1655d408945691d774b6_Skag.jpg',
      tags: ['SaaS', 'AI', 'Marketing'],
      expertise: ['UX/UI Design', 'Analysis', 'Development'],
      platform: 'Web',
    },
    {
      id: 'topgeek',
      title: 'TopGeek',
      subtitle: 'Revolutionizing Content Creation with AI',
      industry: 'SEO',
      duration: '2 weeks',
      description: 'TopGeek analyzes keywords on Google\'s top two pages, extracts key info, forms a content blueprint, and writes blog posts based on its web findings.',
      challenge: 'Challenge was to develop tool that could automate creation of high-quality content at scale, specifically tailored to improve Google search rankings.',
      solution: 'Built with Bubble.io platform, Rowy backend, Webflow landing page, and OpenAI 3.5 integration. System configured to produce ten SEO-optimized blog posts in just three minutes.',
      results: {
        output: '10 SEO-optimized blog posts in 3 minutes',
        impact: 'Fully automated content generation',
        conclusion: 'By automating and optimizing content creation process, project demonstrated substantial improvement in search engine rankings'
      },
      image: 'https://cdn.prod.website-files.com/65cfc8532ce53267d57e7c23/65d1f60e01dd4f836a8b2ab1_TopGeek.png',
      tags: ['MVP', 'AI', 'SEO'],
      expertise: ['UX/UI Design', 'Analysis', 'Development'],
      platform: 'Web',
    },
  ];

  const expanded = caseStudies.find(c => c.id === expandedId);

  return (
    <section id="case-studies" className="relative py-20 sm:py-32 overflow-hidden bg-dark-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-primary-400 mb-6"
          >
            Proof
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]"
          >
            <span className="block text-white mb-3">
              Real Companies.
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
              Real Results.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            From 1000+ store retailers to AI SaaS startups—systems that handle real users, real transactions, real revenue.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
            >
              <motion.div
                whileHover={{ y: -4 }}
                onClick={() => setExpandedId(study.id)}
                className="group relative h-full min-h-[400px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-auto">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-medium border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Meta */}
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-primary-400" />
                        {study.industry}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary-400" />
                        {study.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {study.subtitle}
                    </p>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-sm text-primary-400 font-medium">
                      <span>Read Case Study</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center pt-12 border-t border-white/5"
        >
          <p className="text-lg text-gray-400 mb-8">
            Ready to build something amazing together?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative group px-10 py-5 bg-white text-dark-950 rounded-full font-semibold text-lg overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-400"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center gap-2">
              Let's Talk About Your Project
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
            className="fixed inset-0 bg-dark-950/95 backdrop-blur-xl z-50 overflow-y-auto"
          >
            <div className="min-h-screen flex items-center justify-center p-6">
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setExpandedId(null)}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Image Header */}
                <div className="relative h-80">
                  <Image
                    src={expanded.image}
                    alt={expanded.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />
                  
                  {/* Tags on image */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {expanded.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-12">
                  {/* Meta */}
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary-400" />
                      {expanded.industry}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-400" />
                      {expanded.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">
                    {expanded.title}
                  </h2>
                  <p className="text-xl text-primary-400 font-medium mb-8">
                    {expanded.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-12">
                    {expanded.description}
                  </p>

                  {/* Challenge & Solution */}
                  <div className="grid sm:grid-cols-2 gap-8 mb-12">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Challenge
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {expanded.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Solution
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {expanded.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                      Key Highlights
                    </h3>
                    <ul className="space-y-4">
                      {Object.entries(expanded.results).map(([key, value]) => (
                        <li key={key} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary-400 mt-2 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

