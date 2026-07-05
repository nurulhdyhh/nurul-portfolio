"use client";
import React from "react";
import { Database, BarChart3, Code, Wrench, Layers, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "database",
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL"],
  },
  {
    id: "bi",
    title: "Business Intelligence",
    icon: BarChart3,
    skills: ["Metabase", "Power BI", "Tableau"],
  },
  {
    id: "data",
    title: "Data Engineering",
    icon: BrainCircuit,
    skills: ["SQL", "ETL", "Data Warehouse", "OLAP"],
  },
  {
    id: "programming",
    title: "Programming",
    icon: Code,
    skills: ["Python", "Java", "PHP", "Dart"],
  },
  {
    id: "framework",
    title: "Frameworks",
    icon: Layers,
    skills: ["Laravel", "Next.js", "Flutter", "FastAPI"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: ["Pentaho Data Integration", "Docker", "Git", "Figma"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative z-10">
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
            Technical Stack
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Skills & Tools
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 mt-4 max-w-xl mx-auto text-sm sm:text-base"
          >
            A diverse toolkit spanning databases, business intelligence, data engineering, programming, frameworks, and design tools.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card glass-card-hover p-6 rounded-2xl relative group overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-brand-indigo group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {cat.title}
                  </h4>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs rounded-lg bg-white/70 border border-slate-200 text-slate-700 font-medium hover:border-brand-indigo/20 hover:text-slate-900 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
