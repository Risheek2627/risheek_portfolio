import React, { useState, useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";
import { enhancedPortfolioAPI, healthAPI } from "../services/api";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check if API is healthy
        await healthAPI.checkHealth();
        
        // Load portfolio data with caching
        const data = await enhancedPortfolioAPI.getPortfolioWithCache();
        setPortfolioData(data);
        
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
        setError(err.message || 'Failed to load portfolio data');
        
        // Fallback to mock data if API fails
        try {
          const { portfolioData: mockData } = await import('../data/mockData');
          setPortfolioData(mockData);
          console.warn('Using fallback mock data due to API error');
        } catch (mockError) {
          console.error('Failed to load mock data as fallback:', mockError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[rgb(218,255,1)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  // Error state (with fallback data)
  if (error && !portfolioData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-400 text-2xl">⚠️</span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-4">Unable to Load Portfolio</h2>
          <p className="text-[rgb(161,161,170)] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[rgb(218,255,1)] text-[rgb(17,17,19)] px-6 py-3 rounded-lg font-semibold hover:bg-[rgb(166,190,21)] transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      {/* API Error Banner */}
      {error && portfolioData && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500/10 border-b border-yellow-500/30 p-2 text-center z-50">
          <p className="text-yellow-400 text-sm">
            Using cached data - API temporarily unavailable
          </p>
        </div>
      )}

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