"use client";
import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const timelineData = [
  {
    type: "work",
    role: "Data Engineering / Data Warehouse Intern",
    company: "UPA TIK",
    duration: "2025",
    location: "Indonesia",
    description: "Developed an end-to-end Data Engineering / Data Warehouse solution to support analytical decision-making.",
    details: [
      "Designed Data Warehouse architecture using Kimball methodology",
      "Created fact and dimension table models",
      "Developed ETL pipelines using Pentaho Data Integration",
      "Built interactive analytics dashboards",
      "Implemented OLAP for multidimensional data analysis",
    ],
    tech: ["PostgreSQL", "Pentaho", "Metabase", "Laravel", "Next.js", "Docker"],
  },
  {
    type: "work",
    role: "Administrative Staff",
    company: "Packindo.id",
    duration: "2025",
    location: "Indonesia",
    description: "Supported daily business operations through accurate data management and reporting.",
    details: [
      "Managed operational transaction data",
      "Created delivery orders and invoices",
      "Maintained inventory data accuracy",
      "Prepared reports using Microsoft Excel",
    ],
    tech: ["Microsoft Excel", "Paper Invoice"],
  },
  {
    type: "education",
    role: "Bachelor of Information Systems",
    company: "UPN Veteran Jawa Timur",
    duration: "2022 - 2026",
    location: "Surabaya, Indonesia",
    description: "Studying Information Systems with focus on Business Intelligence.",
    details: [
      "GPA: 3.89 / 4.00",
      "Coursework: Business Intelligence, Data Mining, Web Development, UI/UX Design",
    ],
    tech: [],
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-indigo mb-3"
          >
            My Journey
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Experience & Education
          </motion.h3>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-slate-200 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
          {timelineData.map((item, idx) => {
            const Icon = item.type === "work" ? Briefcase : GraduationCap;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <span className="absolute -left-[43px] sm:-left-[59px] top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#fafaf8] border border-slate-200 text-brand-indigo shadow-lg">
                  <div className="p-1.5 rounded-full bg-white border border-slate-200 text-brand-indigo">
                    <Icon className="w-4 h-4" />
                  </div>
                </span>

                {/* Content Card */}
                <div className="glass-card p-6 rounded-2xl hover:border-slate-300 transition-colors">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {item.role}
                      </h4>
                      <span className="text-xs font-semibold text-slate-500">
                        {item.company}
                      </span>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 shrink-0">
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.duration}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">{item.description}</p>

                  {/* Details Bullets */}
                  <ul className="space-y-1.5 text-xs text-slate-500 leading-relaxed pl-1.5 mb-4">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="list-disc list-outside ml-3">
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  {item.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/50">
                      {item.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-white border border-slate-200 text-slate-500 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
