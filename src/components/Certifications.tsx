"use client";
import React from "react";
import { Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Junior Web Programmer Certification",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    skills: ["HTML", "CSS", "JavaScript", "PHP"],
    verifyUrl: "/certificates/bnsp-junior-web-programmer.pdf",
  },
  {
    title: "Learning Basic SQL",
    issuer: "Dicoding Indonesia",
    skills: ["SQL", "Database Queries", "Data Retrieval"],
    verifyUrl: "https://www.dicoding.com/certificates/JLX127VY6Z72",
  },
  {
    title: "Python Programming",
    issuer: "Dicoding Indonesia",
    skills: ["Python", "Scripting", "Data Processing"],
    verifyUrl: "https://www.dicoding.com/certificates/98XW252Q0PM3",
  },
  {
    title: "Learning Data Science",
    issuer: "Dicoding Indonesia",
    skills: ["Python", "Data Analysis", "Statistics"],
    verifyUrl: "https://www.dicoding.com/certificates/07Z6W007RZQR",
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-indigo mb-3"
          >
            Credentials
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Certifications & Training
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white border border-slate-200 text-brand-indigo">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-mono uppercase">
                      {cert.issuer}
                    </span>
                  </div>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors"
                    aria-label="Open certificate"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-4">
                  {cert.title}
                </h4>

                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] rounded-md bg-white border border-slate-200 text-slate-500 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}