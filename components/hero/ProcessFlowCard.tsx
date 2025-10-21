'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface ProcessFlowCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  color?: 'primary' | 'cyan';
}

export default function ProcessFlowCard({
  number,
  title,
  description,
  icon: Icon,
  delay = 0,
  color = 'primary'
}: ProcessFlowCardProps) {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  useEffect(() => {
    const touchDevice = window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(touchDevice);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouchDevice) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => scrollToSection('#contact')}
      style={!isTouchDevice ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } : {}}
      className="relative group cursor-pointer"
    >
      {/* Glow effect on hover */}
      <motion.div 
        className={`absolute -inset-4 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500 ${
          color === 'primary' 
            ? 'bg-gradient-to-r from-primary-500/30 to-cyan-500/30' 
            : 'bg-gradient-to-r from-cyan-500/30 to-primary-500/30'
        }`}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      <motion.div
        className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 overflow-hidden group-hover:border-white/20 transition-all duration-500"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            color === 'primary'
              ? 'bg-gradient-to-br from-primary-500/10 to-cyan-500/10'
              : 'bg-gradient-to-br from-cyan-500/10 to-primary-500/10'
          }`}
        />

        {/* Content */}
        <div className="relative" style={{ transform: "translateZ(50px)" }}>
          {/* Number badge */}
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className={`text-6xl sm:text-7xl font-bold bg-gradient-to-br ${
                color === 'primary'
                  ? 'from-white/40 to-white/20'
                  : 'from-cyan-400/40 to-cyan-400/20'
              } bg-clip-text text-transparent`}
              animate={{ 
                opacity: isHovered ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              {number}
            </motion.div>

            {/* Icon */}
            <motion.div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${
                color === 'primary'
                  ? 'bg-primary-500/10 border border-primary-500/20'
                  : 'bg-cyan-500/10 border border-cyan-500/20'
              } flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${
                color === 'primary' ? 'text-primary-400' : 'text-cyan-400'
              }`} />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>

          {/* Hover indicator */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className={color === 'primary' ? 'text-primary-400' : 'text-cyan-400'}>
              Learn More
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

