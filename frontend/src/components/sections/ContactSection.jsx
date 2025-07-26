import React, { useState } from "react";
import { Mail, Phone, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactAPI } from "../../services/api";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (formData.name.trim().length < 2) return "Name must be at least 2 characters";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (!formData.message.trim()) return "Message is required";
    if (formData.message.trim().length < 10) return "Message must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setSubmitStatus({ type: 'error', message: error });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await contactAPI.submitContact(formData);
      if (response.success) {
        setSubmitStatus({ type: 'success', message: response.message });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "risheek2627@gmail.com",
      href: "mailto:risheek2627@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "9901737965",
      href: "tel:9901737965"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/risheek-n",
      href: "https://linkedin.com/in/risheek-n"
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-transparent to-[rgb(26,28,30)]/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's <span className="text-[rgb(218,255,1)]">Connect</span>
            </h2>
            <p className="text-xl text-[rgb(161,161,170)] max-w-2xl mx-auto">
              Ready to build something amazing together? I'm always excited to discuss new opportunities and collaborate on innovative projects.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(218,255,1)] to-transparent mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                <p className="text-[rgb(161,161,170)] mb-8 leading-relaxed">
                  Whether you're a recruiter looking for a talented backend developer, 
                  a tech mentor interested in collaboration, or someone who needs help 
                  with AI-powered backend solutions, I'd love to hear from you!
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        target={info.label === 'LinkedIn' ? '_blank' : undefined}
                        rel={info.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                        className="flex items-center space-x-4 p-4 bg-[rgb(38,40,42)] rounded-lg border border-[rgb(63,63,63)] hover:border-[rgb(218,255,1)]/50 hover:bg-[rgb(38,40,42)]/80 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-[rgb(218,255,1)]/10 border border-[rgb(218,255,1)]/30 rounded-lg flex items-center justify-center group-hover:bg-[rgb(218,255,1)]/20 transition-colors duration-300">
                          <IconComponent size={20} className="text-[rgb(218,255,1)]" />
                        </div>
                        <div>
                          <div className="text-sm text-[rgb(161,161,170)]">{info.label}</div>
                          <div className="text-white font-medium group-hover:text-[rgb(218,255,1)] transition-colors duration-300">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Info */}
              <div className="glass-card p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Quick Info</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[rgb(161,161,170)]">Location:</span>
                    <span className="text-white">India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(161,161,170)]">Experience:</span>
                    <span className="text-white"> 1 Year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(161,161,170)]">Availability:</span>
                    <span className="text-[rgb(218,255,1)]">Open to opportunities</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgb(161,161,170)]">Response Time:</span>
                    <span className="text-white">Within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="form-input form-textarea"
                    placeholder="Tell me about your project or opportunity..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Status Message */}
                {submitStatus && (
                  <div className={`flex items-center space-x-2 p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-[rgb(218,255,1)]/10 border border-[rgb(218,255,1)]/30' 
                      : 'bg-red-500/10 border border-red-500/30'
                  }`}>
                    {submitStatus.type === 'success' ? (
                      <CheckCircle size={20} className="text-[rgb(218,255,1)]" />
                    ) : (
                      <AlertCircle size={20} className="text-red-400" />
                    )}
                    <span className={`text-sm ${
                      submitStatus.type === 'success' ? 'text-[rgb(218,255,1)]' : 'text-red-400'
                    }`}>
                      {submitStatus.message}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-[rgb(218,255,1)] text-[rgb(17,17,19)] py-4 px-6 rounded-xl font-semibold hover:bg-[rgb(166,190,21)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(218,255,1)]/20"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[rgb(17,17,19)] border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-[rgb(63,63,63)] text-center">
                <p className="text-sm text-[rgb(161,161,170)]">
                  Prefer a quick chat? Feel free to reach out directly via email or LinkedIn!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
