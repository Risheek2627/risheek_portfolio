import React, { useState, useEffect } from "react";

const SkillsSection = ({ skills }) => {
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateSkills(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsElement = document.getElementById('skills');
    if (skillsElement) {
      observer.observe(skillsElement);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = {
    language: "Languages",
    runtime: "Runtime",
    framework: "Frameworks",
    database: "Database",
    backend: "Backend",
    tools: "Tools"
  };

  const getSkillIcon = (iconName) => {
    const icons = {
      js: "JS",
      python: "PY",
      nodejs: "NODE",
      server: "API",
      streamlit: "ST",
      database: "DB",
      mongodb: "MDB",
      api: "REST",
      git: "GIT",
      github: "GH"
    };
    return icons[iconName] || iconName.toUpperCase().slice(0, 3);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Technical <span className="text-[rgb(218,255,1)]">Skills</span>
            </h2>
            <p className="text-xl text-[rgb(161,161,170)] max-w-2xl mx-auto">
              A comprehensive toolkit for building robust backend systems and AI-powered applications
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(218,255,1)] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="glass-card p-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <div className="w-3 h-3 bg-[rgb(218,255,1)] rounded-full mr-3"></div>
                  {skillCategories[category]}
                </h3>
                
                <div className="space-y-6">
                  {categorySkills.map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-[rgb(38,40,42)] border border-[rgb(63,63,63)] rounded-lg flex items-center justify-center group-hover:border-[rgb(218,255,1)]/50 transition-colors duration-300">
                            <span className="text-xs font-bold text-[rgb(218,255,1)]">
                              {getSkillIcon(skill.icon)}
                            </span>
                          </div>
                          <span className="text-[rgb(218,218,218)] font-medium">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm text-[rgb(161,161,170)]">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="skill-progress">
                        <div
                          className="skill-progress-fill"
                          style={{
                            width: animateSkills ? `${skill.level}%` : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Core Expertise</h3>
            <p className="text-[rgb(161,161,170)] mb-6 max-w-3xl mx-auto">
              My skill set combines traditional backend development with cutting-edge AI technologies, 
              enabling me to build intelligent, scalable applications that push the boundaries of what's possible.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-3 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] font-medium">Backend Development</span>
              </div>
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-3 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] font-medium">AI Integration</span>
              </div>
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-3 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] font-medium">Project Based Learning </span>
              </div>
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-3 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] font-medium">Rest API's</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
