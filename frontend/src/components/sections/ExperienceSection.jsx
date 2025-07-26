import React from "react";
import { Calendar, MapPin, Trophy, TrendingUp } from "lucide-react";

const ExperienceSection = ({ experience }) => {
  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-[rgb(26,28,30)]/30 to-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Professional <span className="text-[rgb(218,255,1)]">Experience</span>
            </h2>
            <p className="text-xl text-[rgb(161,161,170)] max-w-2xl mx-auto">
              Building robust backend systems and AI-powered solutions in production environments
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(218,255,1)] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="hidden lg:block timeline-line"></div>

            {experience.map((exp, index) => (
              <div key={exp.id} className="relative mb-16 last:mb-0">
                {/* Timeline Dot - Hidden on mobile */}
                <div className="hidden lg:block timeline-dot" style={{ top: '2rem' }}></div>

                {/* Experience Card */}
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:ml-auto'}`}>
                  <div className="glass-card p-8 hover:border-[rgb(218,255,1)]/30 transition-all duration-300">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.type === 'Current' 
                            ? 'bg-[rgb(218,255,1)]/20 text-[rgb(218,255,1)]' 
                            : 'bg-[rgb(38,40,42)] text-[rgb(161,161,170)]'
                        }`}>
                          {exp.type}
                        </div>
                        <div className="flex items-center space-x-2 text-[rgb(161,161,170)] text-sm">
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {exp.position}
                      </h3>
                      
                      <div className="flex items-center space-x-2 text-[rgb(218,255,1)] font-medium">
                        <MapPin size={16} />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Trophy size={18} className="mr-2 text-[rgb(218,255,1)]" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-[rgb(218,218,218)]">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <TrendingUp size={18} className="mr-2 text-[rgb(218,255,1)]" />
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-[rgb(38,40,42)] border border-[rgb(63,63,63)] rounded-lg px-3 py-1 text-sm text-[rgb(218,218,218)] hover:border-[rgb(218,255,1)]/50 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience Summary */}
          <div className="glass-card p-8 text-center mt-16">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for New Challenges
            </h3>
            <p className="text-[rgb(161,161,170)] mb-6 max-w-3xl mx-auto">
              With hands-on experience in backend development and AI/ML integration, I'm excited to tackle 
              complex problems and contribute to innovative projects that make a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary hover-glow"
              >
                View My Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Let's Collaborate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;