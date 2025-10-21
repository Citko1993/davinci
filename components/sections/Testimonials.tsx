'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Their expertise makes them a reliable innovation partner!",
    content: "The Davinci Agency demonstrated professionalism, supporting us in designing and implementing a process automation system for our corporate client. Their experience, understanding of business needs, and ability to identify optimal technological solutions make them a solid and trustworthy partner for companies seeking efficient collaborators in the field of innovation.",
    rating: 5,
    author: {
      name: "Robert Bojek",
      position: "Business Developer",
      company: "Sagiton",
      avatar: "/testimonials/robert-avatar.jpeg",
      logo: "/testimonials/sagiton-logo.png"
    }
  },
  {
    id: 2,
    quote: "Appreciating their knowledgeable, reliable, and comprehensive approach!",
    content: "I've had a rewarding experience with Davinci while developing my application, appreciating their knowledgeable, reliable, and comprehensive approach. Their ability to suggest solutions and provide updates has been impressive. I'm eager to collaborate with them on future projects.",
    rating: 5,
    author: {
      name: "Alex Lagios",
      position: "Founder",
      company: "Cloud Cook",
      avatar: "/testimonials/alex-avatar.png",
      logo: "/testimonials/cloude-cook.png"
    }
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32 overflow-hidden bg-dark-900">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

      {/* Animated background gradient */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-48 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"
      />

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
            Client Stories
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]"
          >
            <span className="block text-white mb-3">
              What Our Partners
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
              Say About Us
            </span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 hover:border-white/20 transition-all duration-500">
                {/* Glow effect on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-primary-500/20 to-cyan-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                
                <div className="relative">
                  {/* Quote Icon and Rating */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-2xl">
                      <Quote className="w-6 h-6 text-primary-400" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 text-yellow-400 fill-yellow-400" 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-400">5.0</span>
                    </div>
                  </div>

                  {/* Quote Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                    {testimonial.quote}
                  </h3>

                  {/* Content */}
                  <p className="text-gray-400 leading-relaxed mb-8">
                    {testimonial.content}
                  </p>

                  {/* Author Section */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/10">
                        <Image
                          src={testimonial.author.avatar}
                          alt={testimonial.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Author Info */}
                      <div>
                        <p className="text-white font-semibold">
                          {testimonial.author.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {testimonial.author.position}
                        </p>
                      </div>
                    </div>

                    {/* Company Logo */}
                    <div className={`relative ${testimonial.author.company === 'Cloud Cook' ? 'w-32 h-12' : 'w-20 h-8'} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                      <Image
                        src={testimonial.author.logo}
                        alt={testimonial.author.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

