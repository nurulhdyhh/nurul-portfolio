"use client";
import React from "react";
import { GraduationCap, Brain, Compass, BookOpen, Award } from "lucide-react";
import { motion } from "framer-motion";

const coursework = [
  "Business Intelligence",
  "Data Analytics",
  "Web Development",
  "UI/UX Design",
];

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
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
            About Me
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Passionate about data-driven solutions
          </motion.h3>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: About Text & Personal Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center gap-6"
          >
            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
              I am an Information Systems undergraduate student at{" "}
              <span className="text-slate-900 font-semibold">UPN Veteran Jawa Timur</span> with a strong interest
              in Business Intelligence, Data Analytics, and Software Development.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
              I have hands-on experience in designing Data Warehouses, developing ETL pipelines, creating
              SQL-based analysis, and building interactive dashboards. I enjoy combining analytical thinking
              and creativity to create impactful technology solutions.
            </p>

            {/* Quick credentials blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl glass-card flex flex-col gap-2 hover:border-brand-indigo/20 transition-colors group">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-brand-indigo group-hover:bg-brand-indigo/8 group-hover:border-brand-indigo/20 transition-all w-max">
                  <Brain className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-1">Mindset</span>
                <span className="text-[11px] text-slate-500 leading-snug">Analytical & Creative</span>
                <span className="text-[9px] text-slate-500 leading-tight">Combining logic with design thinking</span>
              </div>
              <div className="p-4 rounded-xl glass-card flex flex-col gap-2 hover:border-brand-indigo/20 transition-colors group">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-brand-indigo group-hover:bg-brand-indigo/8 group-hover:border-brand-indigo/20 transition-all w-max">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-1">Target Roles</span>
                <span className="text-[11px] text-slate-500 leading-snug">Data & BI</span>
                <span className="text-[9px] text-slate-500 leading-tight">Versatile across dev & data</span>
              </div>
              <div className="p-4 rounded-xl glass-card flex flex-col gap-2 hover:border-brand-indigo/20 transition-colors group">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-brand-indigo group-hover:bg-brand-indigo/8 group-hover:border-brand-indigo/20 transition-all w-max">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-900 mt-1">Strengths</span>
                <span className="text-[11px] text-slate-500 leading-snug">BI + Software + Design</span>
                <span className="text-[9px] text-slate-500 leading-tight">A unique multidisciplinary blend</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education Highlight Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 w-full"
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Education Header */}
              <div className="bg-white/65 px-6 py-4 border-b border-slate-200/70 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-indigo/8 border border-brand-indigo/15 text-brand-indigo">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Education</span>
                  <span className="text-[10px] text-slate-500 font-mono">2022 - Present</span>
                </div>
              </div>

              {/* Education Details */}
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-base font-bold text-slate-900">UPN Veteran Jawa Timur</h4>
                  <p className="text-xs text-slate-500 mt-1">Bachelor of Information Systems</p>
                </div>

                {/* GPA Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-slate-200">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-brand-indigo to-sky-400 text-slate-900">
                    <span className="text-xl font-bold leading-none">3.88</span>
                    <span className="text-[8px] font-mono opacity-75">/4.00</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">Grade Point Average</span>
                    <span className="text-[10px] text-slate-500">Excellent academic standing</span>
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-brand-indigo" />
                    <span className="text-xs font-semibold text-slate-900">Relevant Coursework</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 text-[10px] rounded-lg bg-white border border-slate-200 text-slate-500 font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
