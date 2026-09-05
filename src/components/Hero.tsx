"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, FileText, Download, BarChart3, Database, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Data Engineer",
  "ETL Developer",
  "Data Warehouse Developer",
  "Data Enthusiast",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-brand-indigo/15 text-sky-600 text-xs font-semibold uppercase tracking-wider w-max mb-6"
          >
            <BarChart3 className="w-4 h-4" />
            Aspiring ETL & Data Warehouse Developer
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-700 to-brand-indigo">
              Nurul Hidayatul Hasanah
            </span>{" "}
            <span className="inline-block">👋</span>
            <br />
            <span className="inline-block mt-2 min-h-[1.2em] sm:min-h-none text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-slate-600">
              A{" "}
              <span className="relative inline-block text-sky-600">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="inline-block"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-xl mb-10 leading-relaxed"
          >
            Information Systems student passionate about Business Intelligence, Data Engineering. I enjoy transforming raw data into meaningful insights through data warehouse design, ETL development, analytics dashboards, and web-based solutions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => handleScrollTo("#projects")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-indigo to-sky-400 hover:shadow-lg hover:shadow-brand-indigo/20 transition-all duration-300 group cursor-pointer"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/cv-nurul.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white/80 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            <a
              href="https://www.linkedin.com/in/nurulhidayatul/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              <svg xmlns="https://www.linkedin.com/in/nurulhidayatul/" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/nurulhdyhh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
            >
              <svg xmlns="https://github.com/nurulhdyhh" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Right: Profile Image Card */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[380px] relative"
          >
            {/* Profile Image Card */}
            <div className="relative glass-card rounded-3xl p-3 overflow-hidden group">
              <img
                src="/profile.jpg"
                alt="Nurul Hidayatul Hasanah - Profile Photo"
                className="w-full aspect-[3/4] object-cover rounded-2xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1020]/70 via-transparent to-transparent rounded-2xl pointer-events-none" />

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-6 right-6 glass-card rounded-xl p-3 flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-sky-100 border border-brand-indigo/15 text-sky-600">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Business Intelligence</span>
                  <span className="text-[10px] text-slate-600">& Data Enthusiast</span>
                </div>
              </motion.div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-4 w-14 h-14 rounded-xl glass-card flex items-center justify-center border-brand-indigo/20 shadow-lg"
            >
              <Code className="w-6 h-6 text-sky-600" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-2 -left-4 w-12 h-12 rounded-xl glass-card flex items-center justify-center border-brand-emerald/30 shadow-lg"
            >
              <BarChart3 className="w-5 h-5 text-sky-500" />
            </motion.div>

            {/* Background glow behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-100 to-sky-200/40 blur-[60px] rounded-full -z-10" />
          </motion.div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10" onClick={() => handleScrollTo("#about")}>
        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-slate-200 p-1 flex justify-center"
        >
          <div className="w-1 h-2 bg-sky-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
