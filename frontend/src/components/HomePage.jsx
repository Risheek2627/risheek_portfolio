import React, { useState, useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";
import { portfolioData } from "../data/mockData";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio-container">
      {/* Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgb(26,28,30)]/80 backdrop-blur-md border-b border-[rgb(63,63,63)]' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-xl">
              Risheek<span className="text-[rgb(218,255,1)]">.dev</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[rgb(218,218,218)] hover:text-[rgb(218,255,1)] transition-colors duration-200 text-sm font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="neural-network"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection data={portfolioData.personal} stats={portfolioData.stats} />
        <AboutSection data={portfolioData.personal} />
        <SkillsSection skills={portfolioData.skills} />
        <ExperienceSection experience={portfolioData.experience} />
        <ProjectsSection projects={portfolioData.projects} />
        <EducationSection education={portfolioData.education} />
        <ContactSection />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[rgb(218,255,1)] text-[rgb(17,17,19)] rounded-full flex items-center justify-center hover:bg-[rgb(166,190,21)] transition-all duration-300 hover:scale-110 z-50"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default HomePage;