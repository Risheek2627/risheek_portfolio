import React from "react";
import { Brain, Code, Database, Cpu } from "lucide-react";

const AboutSection = ({ data }) => {
  const highlights = [
    {
      icon: Cpu,
      title: "AI Integration",
      description: "Merging AI capabilities with backend systems for intelligent applications"
    },
    {
      icon: Code,
      title: "Backend Development",
      description: "Writing maintainable, scalable code following best practices"
    },
    {
      icon: Database,
      title: "Database Handling",
      description: "Managing and querying data using MySQL with clean structure"
    },
    {
      icon: Brain,
      title: "Hands-On Learning",
      description: "Building real-world projects to master backend and AI skills"
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-transparent to-[rgb(26,28,30)]/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              About <span className="text-[rgb(218,255,1)]">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(218,255,1)] to-transparent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Bio */}
            <div className="space-y-6">
              <div className="glass-card p-8">
                <p className="text-lg text-[rgb(218,218,218)] leading-relaxed mb-6">
                  {data.bio}
                </p>
                
                <p className="text-[rgb(161,161,170)] leading-relaxed mb-8">
                  With a strong foundation in backend development and a passion for artificial intelligence, 
                  I specialize in creating robust REST APIs and integrating AI-powered features that solve 
                  real-world problems. My experience spans from optimizing database performance to implementing 
                  machine learning models in production environments.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-[rgb(38,40,42)] rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full"></div>
                    <span className="text-sm text-[rgb(218,218,218)]">Backend Specialist</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-[rgb(38,40,42)] rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full"></div>
                    <span className="text-sm text-[rgb(218,218,218)]">AI Enthusiast</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-[rgb(38,40,42)] rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full"></div>
                    <span className="text-sm text-[rgb(218,218,218)]">Problem Solver</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Highlights */}
            <div className="grid gap-6">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div
                    key={index}
                    className="glass-card p-6 hover:border-[rgb(218,255,1)]/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[rgb(218,255,1)]/10 border border-[rgb(218,255,1)]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent size={20} className="text-[rgb(218,255,1)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-[rgb(161,161,170)] text-sm leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to build something amazing together?
              </h3>
              <p className="text-[rgb(161,161,170)] mb-6">
                Let's discuss how I can help bring your backend and AI projects to life.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary hover-glow"
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
