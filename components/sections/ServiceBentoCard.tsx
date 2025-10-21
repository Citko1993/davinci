'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceBentoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  size?: 'small' | 'large';
}

export default function ServiceBentoCard({
  icon: Icon,
  title,
  description,
  index,
  size = 'small'
}: ServiceBentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-white/20 transition-all duration-300 ${
        size === 'large' ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />

      <div className="relative">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-primary-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center border border-primary-500/20 mb-4 group-hover:scale-110 transition-transform duration-300"
          whileHover={{ rotate: 5 }}
        >
          <Icon className="w-6 h-6 text-primary-400" />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

