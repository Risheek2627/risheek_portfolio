import React from "react";
import { Mail, Phone, Linkedin, Github, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:risheek2627@gmail.com",
      label: "Email"
    },
    {
      icon: Phone,
      href: "tel:9901737965",
      label: "Phone"
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/risheek-n",
      label: "LinkedIn"
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub"
    }
  ];

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const handleSocialClick = (href, label) => {
    if (href === "#") {
      alert(`${label} profile will be available soon!`);
    } else {
      window.open(href.startsWith('mailto:') || href.startsWith('tel:') ? href : href, 
                  href.startsWith('http') ? '_blank' : '_self');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[rgb(26,28,30)] border-t border-[rgb(63,63,63)] relative">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand & Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Risheek<span className="text-[rgb(218,255,1)]">.dev</span>
                </h3>
                <p className="text-[rgb(161,161,170)] leading-relaxed max-w-md">
                  AI-Powered Backend Developer specializing in REST APIs, machine learning integration, 
                  and scalable system architecture. Passionate about building innovative solutions 
                  that bridge the gap between traditional backend development and artificial intelligence.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSocialClick(social.href, social.label)}
                        className="w-12 h-12 bg-[rgb(38,40,42)] border border-[rgb(63,63,63)] rounded-lg flex items-center justify-center text-[rgb(161,161,170)] hover:bg-[rgb(218,255,1)] hover:text-[rgb(17,17,19)] hover:border-[rgb(218,255,1)] transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <IconComponent size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[rgb(161,161,170)] hover:text-[rgb(218,255,1)] transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Core Technologies</h4>
              <div className="space-y-3">
                {[
                  "JavaScript & Python",
                  "Node.js & Express.js",
                  "MySQL & MongoDB",
                  "REST APIs & JWT",
                  "Streamlit & ML",
                  "Git & GitHub"
                ].map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[rgb(218,255,1)] rounded-full"></div>
                    <span className="text-[rgb(161,161,170)] text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-[rgb(63,63,63)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-[rgb(161,161,170)] text-sm">
              <span>© {currentYear} Risheek N. Made with</span>
              <Heart size={16} className="text-[rgb(218,255,1)] fill-current" />
              <span>and lots of code</span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-sm text-[rgb(161,161,170)]">
                Built with React & FastAPI
              </div>
              
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-[rgb(161,161,170)] hover:text-[rgb(218,255,1)] transition-colors duration-300"
              >
                <span className="text-sm">Back to top</span>
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-[rgb(218,255,1)]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-[rgb(218,255,1)]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Floating Chat Bubble */}
      <div className="fixed bottom-24 left-6 z-40">
        <div className="relative">
          <div className="bg-[rgb(218,255,1)] text-[rgb(17,17,19)] px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
            Want to build AI apps with me?
          </div>
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-[rgb(218,255,1)] transform rotate-45"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;