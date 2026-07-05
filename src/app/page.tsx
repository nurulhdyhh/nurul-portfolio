import GradientBg from "@/components/GradientBg";
import ScrollTracker from "@/components/ScrollTracker";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedProject from "@/components/FeaturedProject";
import Timeline from "@/components/Timeline";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollTracker />
      <GradientBg />
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Hero />
        <About />
        <Skills />
        <FeaturedProject />
        <Timeline />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
