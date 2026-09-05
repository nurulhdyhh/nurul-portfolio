"use client";
import React, { useState } from "react";
import {
  Workflow,
  BarChart3,
  CheckCircle2,
  Layers,
  Smartphone,
  BookOpen,
  Palette,
  House,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  features: string[];
  impact: string;
  tech: string[];
  previewImage?: string;
  previewAlt?: string;
  previewLabel: string;
};

const projects: Project[] = [
  {
    id: "bi-system",
    title: "BI System for Lecturer Community Service",
    type: "Main Featured Project",
    description:
      "An end-to-end Business Intelligence platform designed to integrate, process, analyze, and visualize lecturer community service performance data.",
    features: [
      "Kimball Nine-Step Data Warehouse Design",
      "Fact Constellation Schema",
      "Automated ETL Pipeline",
      "OLAP Cube Analysis",
      "Interactive Dashboard Visualization",
    ],
    impact:
      "Enabled centralized data analysis and supported data-driven decision making.",
    tech: [
      "PostgreSQL",
      "Pentaho Data Integration",
      "Metabase",
      "Laravel",
      "Next.js",
      "Docker",
    ],
    previewImage: "/pbi.png",
    previewAlt: "Business intelligence dashboard preview",
    previewLabel: "BI Dashboard Preview",
  },
  {
    id: "us-furniture",
    title: "US Furniture Sales Dashboard",
    type: "Data Analytics",
    description:
      "Business analytics dashboard for identifying sales performance, trends, and insights from US furniture retail data.",
    features: [
      "Sales trend visualization",
      "Category performance analysis",
      "Regional sales comparison",
    ],
    impact: "Provided actionable business insights from complex retail datasets.",
    tech: ["Power BI", "Python", "Spreadsheet"],
    previewImage: "/usfurniture.png",
    previewAlt: "Sales dashboard preview",
    previewLabel: "Sales Dashboard Preview",
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction",
    type: "Data Mining",
    description:
      "A data mining project that explores housing attributes and applies predictive modeling to estimate house prices.",
    features: [
      "Housing data exploration and preprocessing",
      "Feature selection and engineering",
      "Regression model training and evaluation",
      "Price prediction from property characteristics",
    ],
    impact:
      "Transformed housing data into a practical predictive model for supporting property price estimation.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    previewLabel: "Prediction Model Preview",
  },
  {
    id: "easy-nutrition",
    title: "Easy Nutrition Mobile App UI/UX",
    type: "UI/UX Design",
    description:
      "Health awareness mobile application designed using Design Thinking methodology to help users track and improve their nutritional intake.",
    features: [
      "Design Thinking Process: Empathize -> Define -> Ideate -> Prototype -> Test",
      "User research and persona development",
      "High-fidelity interactive prototype",
    ],
    impact: "Created a user-centered design promoting health awareness.",
    tech: ["Figma", "FigJam"],
    previewLabel: "UI/UX Design Preview",
  // },
  // {
  //   id: "doembah-laundry",
  //   title: "D'Oembah Laundry Mobile Application",
  //   type: "Mobile Development",
  //   description:
  //     "Mobile application connecting customers with laundry services, featuring location-based search and real-time order tracking.",
  //   features: [
  //     "Location-based service search",
  //     "Order management system",
  //     "Service filtering",
  //     "Real-time status tracking",
  //   ],
  //   impact:
  //     "Streamlined laundry service discovery and order management.",
  //   tech: ["Flutter", "FastAPI", "Firebase"],
  //   previewLabel: "Mobile App Preview",
  // },
  // {
  //   id: "sibook",
  //   title: "SIBOOK Library Management System",
  //   type: "Desktop Application",
  //   description:
  //     "Desktop-based library management system for efficient book cataloging, borrowing, and return processes.",
  //   features: [
  //     "Book cataloging and search",
  //     "Borrowing and return management",
  //     "Automated reporting",
  //   ],
  //   impact: "Simplified library operations with digital automation.",
  //   tech: ["Visual Basic", "Crystal Reports"],
  //   previewLabel: "Desktop App Preview",
  },
];

function ProjectPreview({ project }: { project: Project }) {
  if (project.previewImage) {
    return (
      <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#fbf7f2]">
        <div className="bg-white/65 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[10px] text-slate-500 font-mono ml-2">
            {project.previewLabel}
          </span>
        </div>
        <img
          src={project.previewImage}
          alt={project.previewAlt ?? project.previewLabel}
          className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    );
  }

  const previewStyleMap: Record<string, string> = {
    "easy-nutrition": "from-sky-100 via-white to-rose-50",
    "doembah-laundry": "from-indigo-100 via-white to-sky-50",
    sibook: "from-amber-100 via-white to-slate-50",
    "house-price-prediction": "from-emerald-100 via-white to-sky-50",
  };

  const iconMap: Record<string, React.ReactNode> = {
    "easy-nutrition": <Smartphone className="w-6 h-6 text-sky-500" />,
    "doembah-laundry": <Workflow className="w-6 h-6 text-sky-500" />,
    sibook: <BookOpen className="w-6 h-6 text-sky-500" />,
    "house-price-prediction": <House className="w-6 h-6 text-emerald-600" />,
  };

  const badgeMap: Record<string, string> = {
    "easy-nutrition": "Figma Concept",
    "doembah-laundry": "App Flow",
    sibook: "System UI",
    "house-price-prediction": "Regression Model",
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border border-slate-200 bg-gradient-to-br ${
        previewStyleMap[project.id] ?? "from-sky-100 via-white to-slate-50"
      }`}
    >
      <div className="bg-white/65 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="text-[10px] text-slate-500 font-mono ml-2">
          {project.previewLabel}
        </span>
      </div>
      <div className="p-6 sm:p-8 min-h-[260px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white/80 border border-slate-200 flex items-center justify-center shadow-sm">
            {iconMap[project.id] ?? <Palette className="w-6 h-6 text-sky-500" />}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Preview
            </p>
            <h5 className="text-xl font-bold text-slate-900 mt-1">
              {project.title}
            </h5>
            <p className="text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
              {project.type} - {badgeMap[project.id] ?? "Custom Preview"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {project.features.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white/75 border border-slate-200 px-3 py-2 text-[11px] text-slate-600 shadow-sm"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProject() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest text-brand-indigo mb-3"
          >
            Projects
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Featured Case Studies
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-500 mt-4 max-w-xl mx-auto text-sm sm:text-base"
          >
            A collection of projects spanning Business Intelligence, data mining, analytics, mobile apps, UI/UX design, and web development.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {projects.map((proj) => {
            const isActive = selectedProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-brand-indigo text-slate-900 shadow-lg shadow-brand-indigo/15"
                    : "bg-white/70 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                {proj.title.length > 25 ? proj.title.slice(0, 25) + "..." : proj.title}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="p-8 lg:p-12 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo mb-2 block">
                    {selectedProject.type}
                  </span>
                  <h4 className="text-2xl font-bold text-slate-900 leading-tight">
                    {selectedProject.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-full bg-white border border-slate-200 text-brand-indigo font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-slate-500 leading-relaxed text-sm max-w-3xl">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-indigo" />
                    Key Features
                  </h5>
                  <div className="space-y-3">
                    {selectedProject.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-brand-indigo" />
                    Impact
                  </h5>
                  <p className="text-sm text-slate-500 leading-relaxed p-4 rounded-xl bg-white/70 border border-slate-200">
                    {selectedProject.impact}
                  </p>
                </div>
              </div>

              <ProjectPreview project={selectedProject} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}