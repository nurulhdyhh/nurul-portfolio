"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Beyond Tech", href: "#beyond" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#fffaf6]/88 backdrop-blur-md border-b border-fuchsia-200/10 shadow-lg"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="flex items-center gap-2 font-mono text-lg font-bold text-slate-900 tracking-wider group"
            >
              <div className="p-1.5 rounded-lg bg-brand-indigo/8 border border-brand-indigo/15 group-hover:border-brand-indigo/35 transition-colors">
                <Sparkles className="w-5 h-5 text-brand-indigo" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 group-hover:from-slate-900 group-hover:to-brand-indigo transition-colors duration-300">
                NURUL.dev
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                      isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white/60 rounded-lg border border-slate-200"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="ml-3 inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold tracking-wider text-slate-900 uppercase bg-gradient-to-r from-brand-indigo to-sky-400 hover:from-brand-indigo hover:to-sky-400 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-indigo/15 group"
              >
                Hire Me
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-50 lg:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 lg:hidden glass-card mx-4 my-2 rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2 flex flex-col">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                      isActive
                        ? "bg-brand-indigo/8 text-slate-900 border-l-2 border-sky-300"
                        : "text-slate-500 hover:text-slate-900 hover:bg-sky-50"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-indigo" />
                    )}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="mt-4 w-full justify-center inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-slate-900 bg-gradient-to-r from-brand-indigo to-sky-400 rounded-xl"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
