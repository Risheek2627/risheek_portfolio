import React from "react";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

const EducationSection = ({ education }) => {
  return (
    <section id="education" className="section-padding-sm bg-gradient-to-b from-[rgb(26,28,30)]/30 to-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Educational <span className="text-[rgb(218,255,1)]">Background</span>
            </h2>
            <p className="text-xl text-[rgb(161,161,170)]">
              Building a strong foundation in computer science and technology
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(218,255,1)] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Education Cards */}
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="glass-card p-8 hover:border-[rgb(218,255,1)]/30 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left Content */}
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[rgb(218,255,1)]/10 border border-[rgb(218,255,1)]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap size={20} className="text-[rgb(218,255,1)]" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {edu.degree}
                        </h3>
                        
                        <div className="flex items-center space-x-2 text-[rgb(218,255,1)] font-medium mb-3">
                          <BookOpen size={16} />
                          <span>{edu.institution}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-[rgb(161,161,170)]">
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>{edu.duration}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Award size={14} />
                            <span>{edu.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Status */}
                  <div className="lg:text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      edu.status === 'Completed' 
                        ? 'bg-[rgb(218,255,1)]/20 text-[rgb(218,255,1)]' 
                        : 'bg-[rgb(38,40,42)] text-[rgb(161,161,170)]'
                    }`}>
                      {edu.status}
                    </div>
                  </div>
                </div>

                {/* Additional Info for Diploma */}
                {edu.type === 'Diploma' && (
                  <div className="mt-6 pt-6 border-t border-[rgb(63,63,63)]">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Subjects & Skills</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                          "Basics of Programming",
                          "Database Fundamentals",
                           "Web Development",
                          "Data Structures",
                            "IT Lab Projects"
                      ].map((subject, index) => (
                        <div
                          key={index}
                          className="bg-[rgb(38,40,42)] rounded-lg px-3 py-2 text-center border border-[rgb(63,63,63)] hover:border-[rgb(218,255,1)]/50 transition-colors duration-300"
                        >
                          <span className="text-xs text-[rgb(218,218,218)]">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Learning Philosophy */}
          <div className="glass-card p-8 text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-[rgb(161,161,170)] mb-6 max-w-2xl mx-auto">
              Education doesn't stop at graduation. I'm constantly learning new technologies, 
              exploring AI advancements, and staying updated with industry best practices to deliver 
              cutting-edge solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-2 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] text-sm font-medium">Online Courses</span>
              </div>
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-2 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] text-sm font-medium">Tech Blogs</span>
              </div>
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-2 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] text-sm font-medium">Open Source</span>
              </div>
              <div className="bg-[rgb(38,40,42)] rounded-full px-6 py-2 border border-[rgb(63,63,63)]">
                <span className="text-[rgb(218,218,218)] text-sm font-medium">Documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
