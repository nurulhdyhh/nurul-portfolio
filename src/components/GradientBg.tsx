"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GradientBg() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.6 };
  const bgX = useSpring(mouseX, springConfig);
  const bgY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#fafaf8]">
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-brand-indigo/14 blur-[100px] pointer-events-none hidden md:block"
        style={{
          x: bgX,
          y: bgY,
        }}
      />
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-brand-indigo/12 blur-[150px] animate-pulse-slow" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] rounded-full bg-brand-violet/12 blur-[180px] animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="absolute top-[30%] right-[15%] w-[400px] h-[400px] rounded-full bg-brand-fuchsia/10 blur-[130px] animate-pulse-slow" style={{ animationDelay: "6s" }} />
    </div>
  );
}