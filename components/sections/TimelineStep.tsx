'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface TimelineStepProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  activities: string[];
  index: number;
  color: 'primary' | 'cyan' | 'purple';
}

export default function TimelineStep({
  number,
  title,
  description,
  icon: Icon,
  activities,
  index,
  color
}: TimelineStepProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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

  const colorClasses = {
    primary: {
      bg: 'from-primary-500/10 to-cyan-500/10',
      border: 'border-primary-500/20',
      icon: 'text-primary-400',
      iconBg: 'bg-primary-500/10',
      glow: 'from-primary-500/20 to-cyan-500/20',
      text: 'text-primary-400'
    },
    cyan: {
      bg: 'from-cyan-500/10 to-primary-500/10',
      border: 'border-cyan-500/20',
      icon: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10',
      glow: 'from-cyan-500/20 to-primary-500/20',
      text: 'text-cyan-400'
    },
    purple: {
      bg: 'from-purple-500/10 to-primary-500/10',
      border: 'border-purple-500/20',
      icon: 'text-purple-400',
      iconBg: 'bg-purple-500/10',
      glow: 'from-purple-500/20 to-primary-500/20',
      text: 'text-purple-400'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={!isTouchDevice ? {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      } : {}}
      className="relative w-full lg:flex-shrink-0 lg:w-[420px] group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div 
        className={`absolute -inset-4 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500 bg-gradient-to-br ${colors.glow}`}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />

      {/* Main card */}
      <motion.div
        className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} rounded-3xl p-8 overflow-hidden min-h-[500px] flex flex-col`}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Number badge */}
        <div className="mb-6">
          <motion.div 
            className="text-8xl font-bold bg-gradient-to-br from-white/30 to-white/10 bg-clip-text text-transparent"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
          >
            {number}
          </motion.div>
        </div>

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-2xl ${colors.iconBg} border ${colors.border} flex items-center justify-center mb-6`}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className={`w-8 h-8 ${colors.icon}`} />
        </motion.div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-white mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Activities list */}
        <div className="space-y-3">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${colors.iconBg} mt-2 flex-shrink-0`} />
              <span className="text-sm text-gray-400">{activity}</span>
            </motion.div>
          ))}
        </div>


        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.div>
  );
}

