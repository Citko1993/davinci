'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Brain, TrendingUp, Rocket } from 'lucide-react';
import { useRef, useState } from 'react';
import Image from 'next/image';
import ProcessFlowCard from './ProcessFlowCard';
import MeshGradient from './MeshGradient';

// Magnetic button with enhanced effects
function MagneticButton({ 
  children, 
  variant = 'primary',
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative px-6 py-3.5 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full font-semibold text-sm sm:text-base lg:text-lg overflow-hidden shadow-2xl ${
        variant === 'primary'
          ? 'bg-white text-dark-950'
          : 'bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white'
      }`}
    >
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-400 via-cyan-400 to-primary-500"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
      {variant === 'secondary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-cyan-500/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <span className="relative flex items-center gap-3 justify-center">
        {children}
      </span>
    </motion.button>
  );
}

export default function SpatialHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 50);
    mouseY.set((clientY - innerHeight / 2) / 50);
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      {/* Background layers */}
      <MeshGradient />
      
      {/* Parallax background elements */}
      <motion.div 
        className="absolute inset-0"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />

      {/* Main content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-20 sm:py-32 z-10"
      >
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - 60% (3 columns) */}
          <div className="lg:col-span-3 space-y-8 sm:space-y-12">
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="inline-flex"
            >
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-1000" />
                <motion.div 
                  className="relative px-5 py-2.5 sm:px-6 sm:py-3 bg-dark-900/70 backdrop-blur-2xl rounded-full border border-white/20 flex items-center gap-3 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-primary-400"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide">
                    AI that actually works
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              >
                <span className="block text-white mb-2">
                  Stop wasting hours
                </span>
                <span 
                  className="block"
                  style={{
                    background: 'linear-gradient(to right, rgb(96, 165, 250), rgb(34, 211, 238), rgb(59, 130, 246))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  on tasks AI can do
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light"
              >
                We find what's draining your team's time, calculate the ROI, then build custom AI that actually saves you money.
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <MagneticButton 
                variant="primary"
                onClick={() => scrollToSection('#contact')}
              >
                <span className="hidden sm:inline">Show me what I'm wasting</span>
                <span className="inline sm:hidden">Show me</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </MagneticButton>
              
              <MagneticButton 
                variant="secondary"
                onClick={() => scrollToSection('#contact')}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                See the process
              </MagneticButton>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex items-center gap-2 text-sm text-gray-500"
            >
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-dark-950 overflow-hidden">
                  <Image
                    src="/testimonials/alex-avatar.png"
                    alt="Alex"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-dark-950 overflow-hidden">
                  <Image
                    src="/testimonials/robert-avatar.jpeg"
                    alt="Robert"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-dark-950 overflow-hidden">
                  <Image
                    src="/testimonials/d3c4e014-708f-4e23-9bc1-af0c18f9593e.jpg"
                    alt="MyTherapy"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span>Already saving hours for teams across Europe</span>
            </motion.div>
          </div>

          {/* RIGHT SIDE - 40% (2 columns) - PROCESS FLOW */}
          <div className="hidden lg:block lg:col-span-2 perspective-deep">
            <div className="space-y-6">
              <ProcessFlowCard
                number="01"
                title="Discovery"
                description="We map your workflows, interview your team, and identify where things break down."
                icon={Brain}
                delay={0.8}
                color="primary"
              />
              
              <ProcessFlowCard
                number="02"
                title="ROI Hunt"
                description="We find where AI adds real value—not where it's trendy or cool."
                icon={TrendingUp}
                delay={1}
                color="cyan"
              />
              
              <ProcessFlowCard
                number="03"
                title="Build & Deploy"
                description="Custom systems, integrations, training—everything working together."
                icon={Rocket}
                delay={1.2}
                color="primary"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-[2px] h-16 sm:h-20 bg-gradient-to-b from-transparent via-primary-400/70 to-transparent" />
          <span className="text-xs text-gray-500 tracking-[0.3em] uppercase font-medium">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

