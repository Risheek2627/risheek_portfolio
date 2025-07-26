import React from "react";
import { Download, Mail, ArrowRight, Code, Server, Zap, Target } from "lucide-react";

const HeroSection = ({ data, stats }) => {
  const handleDownloadResume = () => {
    // Mock download action
    console.log("Downloading resume...");
    alert("Resume download will be implemented with backend!");
  };

  const handleHireMe = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-[rgb(26,28,30)]/50 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full animate-pulse"></div>
                <span className="text-[rgb(218,218,218)] text-sm">Available for opportunities</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-[rgb(218,255,1)] to-[rgb(166,190,21)] bg-clip-text text-transparent">
                  {data.name}
                </span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl text-[rgb(218,218,218)] font-medium">
                {data.title}
              </h2>
              
              <p className="text-lg text-[rgb(161,161,170)] leading-relaxed max-w-2xl">
                {data.bio}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center justify-center space-x-2 bg-[rgb(218,255,1)] text-[rgb(17,17,19)] px-8 py-4 rounded-xl font-semibold hover:bg-[rgb(166,190,21)] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(218,255,1)]/20"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </button>
              
              <button
                onClick={handleHireMe}
                className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-[rgb(63,63,63)] text-white px-8 py-4 rounded-xl font-semibold hover:border-[rgb(218,255,1)] hover:text-[rgb(218,255,1)] hover:bg-[rgba(218,255,1,0.1)] transition-all duration-300 hover:scale-105"
              >
                <Mail size={20} />
                <span>Hire Me</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => {
                const IconComponent = {
                  code: Code,
                  server: Server,
                  shield: Zap,
                  target: Target
                }[stat.icon] || Code;

                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <IconComponent size={20} className="text-[rgb(218,255,1)]" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-[rgb(161,161,170)]">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Integrated AI Developer Avatar */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="relative">
              {/* Avatar Container with Glassmorphism */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                {/* Background Glow Effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[rgb(218,255,1)]/20 via-[rgb(218,255,1)]/10 to-transparent rounded-3xl blur-2xl animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-[rgb(218,255,1)]/5 to-transparent rounded-2xl blur-xl"></div>
                
                {/* Glassmorphism Avatar Container */}
                <div className="relative w-full h-full bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[rgb(218,255,1)]/20 transition-all duration-700 group animate-float">
                  
                  {/* AI Developer Image */}
                  <div className="relative w-full h-full">
                    <img
                      src="https://customer-assets.emergentagent.com/job_tech-portfolio-ai/artifacts/0iqft43y_aiboipng.png"
                      alt="Risheek N - AI Developer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Subtle overlay for better integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(17,17,19)]/30 via-transparent to-[rgb(218,255,1)]/5"></div>
                    
                    {/* Floating Tech Badges - More Integrated */}
                    <div className="absolute top-6 left-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full px-4 py-2 border border-[rgba(218,255,1,0.3)] shadow-lg">
                      <span className="text-sm font-semibold text-[rgb(218,255,1)] tracking-wide">Backend + AI</span>
                    </div>
                    
                    <div className="absolute top-6 right-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full px-4 py-2 border border-[rgba(218,255,1,0.3)] shadow-lg">
                      <span className="text-sm font-semibold text-[rgb(218,255,1)] tracking-wide">while(alive)</span>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full px-4 py-2 border border-[rgba(218,255,1,0.3)] shadow-lg">
                      <span className="text-sm font-semibold text-[rgb(218,255,1)] tracking-wide">REST API</span>
                    </div>
                    
                    <div className="absolute bottom-6 right-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full px-4 py-2 border border-[rgba(218,255,1,0.3)] shadow-lg">
                      <span className="text-sm font-semibold text-[rgb(218,255,1)] tracking-wide">Python + JS</span>
                    </div>
                    
                    {/* Interactive Glow Ring */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[rgb(218,255,1)]/40 transition-all duration-700"></div>
                  </div>
                </div>

                {/* Decorative Neural Network Lines - More Subtle */}
                <svg className="absolute -inset-8 w-full h-full pointer-events-none opacity-10" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(218,255,1)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="rgb(218,255,1)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path d="M0,100 Q100,50 200,100 T400,80" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" />
                  <path d="M0,200 Q100,150 200,200 T400,180" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" />
                  <path d="M0,300 Q100,250 200,300 T400,280" stroke="url(#neuralGradient)" strokeWidth="1" fill="none" />
                </svg>

                {/* Floating Particles */}
                <div className="absolute top-1/4 -left-8 w-2 h-2 bg-[rgb(218,255,1)]/60 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
                <div className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-[rgb(218,255,1)]/40 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
                <div className="absolute bottom-1/3 -left-4 w-1 h-1 bg-[rgb(218,255,1)]/50 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
              </div>
              
              {/* Overlap Extension - Makes it feel connected */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-32 bg-gradient-to-r from-transparent to-[rgb(218,255,1)]/5 blur-xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;