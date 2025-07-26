import React from "react";
import { ExternalLink, Github, Star, Code, Database, Cpu } from "lucide-react";

const ProjectsSection = ({ projects }) => {
  const handleLiveDemo = (url) => {
    if (url === "#") {
      alert("Live demo will be available soon!");
    } else {
      window.open(url, '_blank');
    }
  };

  const handleViewCode = (url) => {
    if (url === "#") {
      alert("GitHub repository will be shared upon request!");
    } else {
      window.open(url, '_blank');
    }
  };

  const getProjectIcon = (category) => {
    const icons = {
      "AI/ML": Cpu,
      "Backend": Database,
      "Frontend": Code
    };
    return icons[category] || Code;
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Featured <span className="text-[rgb(218,255,1)]">Projects</span>
            </h2>
            <p className="text-xl text-[rgb(161,161,170)] max-w-2xl mx-auto">
              Showcasing real-world applications that demonstrate my expertise in backend development and AI integration
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(218,255,1)] to-transparent mx-auto mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project) => {
              const IconComponent = getProjectIcon(project.category);
              
              return (
                <div key={project.id} className="project-card group">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgb(17,17,19)] via-transparent to-transparent opacity-60"></div>
                    
                    {/* Project Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 bg-[rgb(26,28,30)]/80 backdrop-blur-sm rounded-full px-3 py-1">
                        <IconComponent size={14} className="text-[rgb(218,255,1)]" />
                        <span className="text-xs font-medium text-white">{project.category}</span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-[rgb(218,255,1)]/90 rounded-full px-3 py-1">
                        <span className="text-xs font-medium text-[rgb(17,17,19)]">{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[rgb(218,255,1)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-[rgb(161,161,170)] mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                        <Star size={16} className="mr-2 text-[rgb(218,255,1)]" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[rgb(218,255,1)] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-[rgb(218,218,218)]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-[rgb(38,40,42)] border border-[rgb(63,63,63)] rounded-lg px-3 py-1 text-xs text-[rgb(218,218,218)] hover:border-[rgb(218,255,1)]/50 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleLiveDemo(project.liveUrl)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-[rgb(218,255,1)] text-[rgb(17,17,19)] py-3 px-4 rounded-xl font-semibold hover:bg-[rgb(166,190,21)] transition-all duration-300 hover:scale-105"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </button>
                      
                      <button
                        onClick={() => handleViewCode(project.codeUrl)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-transparent border-2 border-[rgb(63,63,63)] text-white py-3 px-4 rounded-xl font-semibold hover:border-[rgb(218,255,1)] hover:text-[rgb(218,255,1)] hover:bg-[rgba(218,255,1,0.1)] transition-all duration-300 hover:scale-105"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* More Projects Teaser */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              More Projects Coming Soon
            </h3>
            <p className="text-[rgb(161,161,170)] mb-6">
              I'm constantly working on new projects that push the boundaries of backend development and AI integration. 
              Stay tuned for more exciting implementations!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-[rgb(38,40,42)]/50 rounded-lg p-4 border border-[rgb(63,63,63)]">
                <div className="w-8 h-8 bg-[rgb(218,255,1)]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Database size={16} className="text-[rgb(218,255,1)]" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">Real-time Chat API</h4>
                <p className="text-xs text-[rgb(161,161,170)]">WebSocket-based chat system</p>
              </div>
              
              <div className="bg-[rgb(38,40,42)]/50 rounded-lg p-4 border border-[rgb(63,63,63)]">
                <div className="w-8 h-8 bg-[rgb(218,255,1)]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Cpu size={16} className="text-[rgb(218,255,1)]" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">AI Text Summarizer</h4>
                <p className="text-xs text-[rgb(161,161,170)]">NLP-powered content analysis</p>
              </div>
              
              <div className="bg-[rgb(38,40,42)]/50 rounded-lg p-4 border border-[rgb(63,63,63)]">
                <div className="w-8 h-8 bg-[rgb(218,255,1)]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Code size={16} className="text-[rgb(218,255,1)]" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">Analytics Dashboard</h4>
                <p className="text-xs text-[rgb(161,161,170)]">Data visualization platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;