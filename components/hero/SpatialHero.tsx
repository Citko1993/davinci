'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Brain, TrendingUp, Rocket } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* LEFT SIDE - TEXT CONTENT (7 columns) */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12">
            
            {/* Premium floating badge with micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex"
            >
              <div className="relative group cursor-pointer">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-cyan-500 to-primary-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-all duration-700"
                  animate={{ 
                    background: [
                      'linear-gradient(45deg, rgb(59, 130, 246), rgb(34, 211, 238))',
                      'linear-gradient(45deg, rgb(34, 211, 238), rgb(59, 130, 246))',
                      'linear-gradient(45deg, rgb(59, 130, 246), rgb(34, 211, 238))'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="relative px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl rounded-full border border-white/20 flex items-center gap-3 shadow-2xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary-400 to-cyan-400"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.4)',
                        '0 0 0 8px rgba(59, 130, 246, 0)',
                        '0 0 0 0 rgba(59, 130, 246, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-sm font-medium text-white tracking-wide">
                    AI that actually works
                  </span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

             {/* Headline - consistent with site typography */}
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

               {/* Subheadline - consistent with site */}
               <motion.p
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 1, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                 className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light"
               >
                 We find what&apos;s draining your team&apos;s time, calculate the ROI, then build custom AI that actually saves you money.
               </motion.p>
             </div>

            {/* CTA buttons - consistent with site */}
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
                <span className="hidden sm:inline">Show me what I&apos;m wasting</span>
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

            
          </div>

          {/* RIGHT SIDE - PREMIUM VIDEO SECTION (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
             {/* Video container */}
             <div className="relative">
               {isMounted && (
                 <video
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-auto rounded-3xl"
                 >
                   <source src="/make_new_hero_animation.webm" type="video/webm" />
                   Your browser does not support the video tag.
                 </video>
               )}
             </div>
            
          </motion.div>
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

