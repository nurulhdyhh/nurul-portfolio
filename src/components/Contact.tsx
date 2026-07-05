"use client";
import React, { useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
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
            Get In Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Let&apos;s connect
          </motion.h3>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Whether you have an opening for a Management Trainee IT program, Data Analyst, BI Developer, or Software Engineer role — feel free to reach out. I would love to hear from you!
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-brand-indigo shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-mono block">EMAIL</span>
                    <a href="mailto:nurhidyh950@gmail.com" className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
                      nurhidyh950@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-brand-indigo shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-mono block">LINKEDIN</span>
                    <a href="https://www.linkedin.com/in/nurulhidayatul/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
                      linkedin.com/Nurul Hidayatul H
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-brand-indigo shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-mono block">GITHUB</span>
                    <a href="https://github.com/nurulhdyhh" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
                      github.com/nurulhdyhh
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 rounded-2xl relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-slate-500 font-mono">NAME</label>
                        <input
                          type="text" id="name" name="name"
                          value={formData.name} onChange={handleChange}
                          className={`px-4 py-3 rounded-xl bg-white border text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-rose-500/50 focus:ring-rose-500/20" : "border-slate-200 focus:border-brand-indigo/30 focus:ring-brand-indigo/15"}`}
                          placeholder="Your Name" disabled={isSubmitting}
                        />
                        {errors.name && <span className="text-[10px] text-rose-400 font-mono inline-flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</span>}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-slate-500 font-mono">EMAIL</label>
                        <input
                          type="text" id="email" name="email"
                          value={formData.email} onChange={handleChange}
                          className={`px-4 py-3 rounded-xl bg-white border text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-rose-500/50 focus:ring-rose-500/20" : "border-slate-200 focus:border-brand-indigo/30 focus:ring-brand-indigo/15"}`}
                          placeholder="you@example.com" disabled={isSubmitting}
                        />
                        {errors.email && <span className="text-[10px] text-rose-400 font-mono inline-flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-semibold text-slate-500 font-mono">SUBJECT</label>
                      <input
                        type="text" id="subject" name="subject"
                        value={formData.subject} onChange={handleChange}
                        className={`px-4 py-3 rounded-xl bg-white border text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all ${errors.subject ? "border-rose-500/50 focus:ring-rose-500/20" : "border-slate-200 focus:border-brand-indigo/30 focus:ring-brand-indigo/15"}`}
                        placeholder="Job Opportunity, Collaboration, etc." disabled={isSubmitting}
                      />
                      {errors.subject && <span className="text-[10px] text-rose-400 font-mono inline-flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.subject}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-slate-500 font-mono">MESSAGE</label>
                      <textarea
                        id="message" name="message" rows={4}
                        value={formData.message} onChange={handleChange}
                        className={`px-4 py-3 rounded-xl bg-white border text-slate-800 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${errors.message ? "border-rose-500/50 focus:ring-rose-500/20" : "border-slate-200 focus:border-brand-indigo/30 focus:ring-brand-indigo/15"}`}
                        placeholder="Tell me about the opportunity..." disabled={isSubmitting}
                      />
                      {errors.message && <span className="text-[10px] text-rose-400 font-mono inline-flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</span>}
                    </div>
                    <button
                      type="submit" disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-900 bg-gradient-to-r from-brand-indigo to-sky-400 hover:shadow-lg hover:shadow-brand-indigo/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                      ) : (
                        <>Send Message<Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-500 mb-6"
                    >
                      <Check className="w-8 h-8" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                    <p className="text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
                      Thank you for reaching out! I will reply shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white/60 hover:bg-white transition-all duration-300 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
