import React from "react";
import { Download, Mail, ArrowRight, Code, Server, Zap, Target } from "lucide-react";

const HeroSection = ({ data, stats }) => {
const handleDownloadResume = () => {
  const resumeUrl = "/Risheek_backend.pdf"; // exact name from your public folder
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = "Risheek_N_Resume.pdf"; // desired download filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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

          {/* Right Content - Circular Character with Glow */}
          <div className="flex justify-center lg:justify-end relative lg:-mr-8">
            <div className="relative">
              {/* Circular Character with Glowing Effects */}
              <div className="relative w-80 h-80 lg:w-[420px] lg:h-[420px]">
                
                {/* Outer Glow Rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[rgb(218,255,1)]/20 via-[rgb(218,255,1)]/10 to-[rgb(218,255,1)]/5 blur-2xl scale-110 animate-pulse"></div>
                <div className="absolute inset-2 rounded-full bg-[rgb(218,255,1)]/15 blur-xl scale-105 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute inset-4 rounded-full bg-[rgb(218,255,1)]/10 blur-lg scale-102 animate-pulse" style={{animationDelay: '1s'}}></div>
                
                {/* Main Circular Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[rgb(218,255,1)]/30 shadow-2xl hover:border-[rgb(218,255,1)]/50 transition-all duration-700 animate-float">
                  
                  {/* Circular Glowing Border */}
                  <div className="absolute inset-0 rounded-full border-2 border-[rgb(218,255,1)]/40 shadow-[0_0_30px_rgba(218,255,1,0.3)] hover:shadow-[0_0_50px_rgba(218,255,1,0.5)] transition-all duration-700"></div>
                  
                  {/* Character Image - Circular */}
                  <img
                    src="https://customer-assets.emergentagent.com/job_tech-portfolio-ai/artifacts/0iqft43y_aiboipng.png"
                    alt="Risheek N - AI Developer"
                    className="w-full h-full object-cover mix-blend-screen filter contrast-125 brightness-110 saturate-110 hover:scale-105 transition-all duration-700"
                    style={{
                      filter: 'contrast(1.3) brightness(1.1) saturate(1.2)'
                    }}
                  />
                  
                  {/* Inner Circular Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[rgb(17,17,19)]/20 via-transparent to-[rgb(218,255,1)]/5"></div>
                </div>

                {/* Floating Tech Elements - Around Circular Avatar */}
                <div className="absolute -top-2 left-12 bg-[rgba(218,255,1,0.1)] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(218,255,1,0.3)] shadow-lg animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>
                  <span className="text-xs font-semibold text-[rgb(218,255,1)]">Backend + AI</span>
                </div>
                
                <div className="absolute top-8 -right-4 bg-[rgba(218,255,1,0.1)] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(218,255,1,0.3)] shadow-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>
                  <span className="text-xs font-semibold text-[rgb(218,255,1)]">while(alive)</span>
                </div>
                
                <div className="absolute -bottom-2 left-8 bg-[rgba(218,255,1,0.1)] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(218,255,1,0.3)] shadow-lg animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
                  <span className="text-xs font-semibold text-[rgb(218,255,1)]">REST API</span>
                </div>
                
                <div className="absolute bottom-12 -right-6 bg-[rgba(218,255,1,0.1)] backdrop-blur-sm rounded-full px-3 py-1.5 border border-[rgba(218,255,1,0.3)] shadow-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}>
                  <span className="text-xs font-semibold text-[rgb(218,255,1)]">Python + JS</span>
                </div>

                {/* Floating Code Particles - Orbital Pattern */}
                <div className="absolute top-1/4 -left-8 text-[rgb(218,255,1)]/60 text-sm font-mono animate-bounce" style={{animationDelay: '0s', animationDuration: '4s'}}>
                  {'</>'}
                </div>
                <div className="absolute top-1/2 -right-10 text-[rgb(218,255,1)]/40 text-xs font-mono animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}>
                  {'{}'}
                </div>
                <div className="absolute bottom-1/4 -left-6 text-[rgb(218,255,1)]/50 text-xs font-mono animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
                  {'[]'}
                </div>
                <div className="absolute top-8 left-1/2 text-[rgb(218,255,1)]/30 text-xs font-mono animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}>
                  {'()'}
                </div>

                {/* Rotating Glow Effect */}
                <div className="absolute inset-0 rounded-full animate-spin" style={{animationDuration: '20s'}}>
                  <div className="absolute top-0 left-1/2 w-1 h-8 bg-gradient-to-b from-[rgb(218,255,1)]/80 to-transparent blur-sm"></div>
                  <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-gradient-to-t from-[rgb(218,255,1)]/60 to-transparent blur-sm"></div>
                </div>

                {/* Orbital Light Particles */}
                <div className="absolute inset-0 animate-spin" style={{animationDuration: '15s'}}>
                  <div className="absolute top-4 left-1/2 w-2 h-2 bg-[rgb(218,255,1)]/70 rounded-full blur-sm"></div>
                  <div className="absolute bottom-8 right-1/4 w-1.5 h-1.5 bg-[rgb(218,255,1)]/50 rounded-full blur-sm"></div>
                </div>

                {/* Pulsing Ground Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-12 bg-gradient-to-r from-transparent via-[rgb(218,255,1)]/15 to-transparent rounded-full blur-2xl animate-pulse"></div>
              </div>

              {/* Background Integration Effects */}
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-20 h-40 bg-gradient-to-r from-transparent to-[rgb(218,255,1)]/5 blur-2xl pointer-events-none"></div>
              <div className="absolute -right-16 top-1/3 w-16 h-32 bg-gradient-to-l from-transparent to-[rgb(218,255,1)]/8 blur-xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
