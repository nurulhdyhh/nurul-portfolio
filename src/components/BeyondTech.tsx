"use client";
import React from "react";
import { Palette, Sparkles, Camera, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const interests = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive and beautiful user interfaces with design thinking methodology.",
  },
  {
    icon: CalendarDays,
    title: "Creative Event",
    description: "Coordinating and managing creative events, from ideation to flawless execution.",
  },
  {
    icon: Sparkles,
    title: "Content Design",
    description: "Designing visual content that communicates ideas clearly and creatively.",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capturing moments and telling stories through the lens.",
  },
];

export default function BeyondTech() {
  return (
    <section id="beyond" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-indigo mb-3"
          >
            Creative Side
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Beyond Technology
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 mt-4 max-w-xl mx-auto text-sm sm:text-base"
          >
            Besides technology, I enjoy exploring creativity through digital design, content creation, and event management.
          </motion.p>
        </div>

        {/* Interest Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {interests.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card glass-card-hover p-6 rounded-2xl text-center group"
              >
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-brand-violet group-hover:text-brand-indigo group-hover:scale-110 transition-all duration-300 w-max mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
