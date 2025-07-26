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

          {/* Right Content - AI Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Avatar Container */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgb(218,255,1)]/20 to-transparent rounded-full blur-3xl"></div>
                
                {/* Avatar Placeholder - Tech Developer Illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(26,28,30)] to-[rgb(38,40,42)] rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                  {/* Tech Elements */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Developer Avatar Placeholder */}
                    <div className="w-64 h-64 bg-gradient-to-br from-[rgb(218,255,1)]/10 to-[rgb(166,190,21)]/10 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[rgb(218,255,1)] rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Code size={32} className="text-[rgb(17,17,19)]" />
                        </div>
                        <div className="text-white font-medium">AI Developer</div>
                        <div className="text-[rgb(218,255,1)] text-sm">Backend Specialist</div>
                      </div>
                    </div>
                    
                    {/* Floating Tech Elements */}
                    <div className="absolute top-10 left-10 w-8 h-8 bg-[rgb(218,255,1)]/20 rounded border border-[rgb(218,255,1)]/50 flex items-center justify-center animate-bounce">
                      <span className="text-xs text-[rgb(218,255,1)]">JS</span>
                    </div>
                    <div className="absolute top-20 right-16 w-8 h-8 bg-[rgb(218,255,1)]/20 rounded border border-[rgb(218,255,1)]/50 flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
                      <span className="text-xs text-[rgb(218,255,1)]">PY</span>
                    </div>
                    <div className="absolute bottom-20 left-16 w-8 h-8 bg-[rgb(218,255,1)]/20 rounded border border-[rgb(218,255,1)]/50 flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
                      <span className="text-xs text-[rgb(218,255,1)]">API</span>
                    </div>
                    <div className="absolute bottom-10 right-10 w-8 h-8 bg-[rgb(218,255,1)]/20 rounded border border-[rgb(218,255,1)]/50 flex items-center justify-center animate-bounce" style={{animationDelay: '1.5s'}}>
                      <span className="text-xs text-[rgb(218,255,1)]">AI</span>
                    </div>
                  </div>
                </div>

                {/* Neural Network Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(218,255,1)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="rgb(218,255,1)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path d="M50,50 Q150,100 250,80 T350,120" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                  <path d="M80,300 Q180,250 280,270 T380,230" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                  <path d="M20,200 Q120,150 220,180 T320,140" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;