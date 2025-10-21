'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setIsVisible(scrollPosition > windowHeight * 0.8);
      
      // Hide when contact section is visible
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        setIsContactVisible(contactRect.top < windowHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on mobile and hide when contact is visible
  const shouldShow = isVisible && !isContactVisible;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="p-4 bg-dark-950/90 backdrop-blur-lg border-t border-white/10">
            <div className="flex justify-between items-center gap-4">
              <div className="text-sm font-medium">
                <span className="block text-gray-400">Ready to talk?</span>
                <span className="block text-white">Free consultation</span>
              </div>
              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-full font-semibold text-sm shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-shadow flex-shrink-0"
              >
                <Phone className="w-4 h-4" />
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

