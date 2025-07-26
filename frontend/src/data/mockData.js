// Mock data for Risheek N's Portfolio

export const portfolioData = {
  personal: {
    name: "Risheek N",
    title: "AI-Powered Backend Developer",
    subtitle: "REST API Specialist",
    email: "risheek2627@gmail.com",
    phone: "9901737965",
    linkedin: "linkedin.com/in/risheek-n",
    bio: "Hey! I'm Risheek, a backend developer passionate about building scalable REST APIs and AI-powered applications. I merge backend logic with intelligent systems to create real-world impact."
  },

  skills: [
    { name: "JavaScript", level: 85, icon: "js", category: "language" },
    { name: "Python", level: 90, icon: "python", category: "language" },
    { name: "Node.js", level: 85, icon: "nodejs", category: "runtime" },
    { name: "Express.js", level: 88, icon: "server", category: "framework" },
    { name: "Streamlit", level: 80, icon: "streamlit", category: "framework" },
    { name: "MySQL", level: 82, icon: "database", category: "database" },
    { name: "MongoDB", level: 85, icon: "mongodb", category: "database" },
    { name: "REST APIs", level: 90, icon: "api", category: "backend" },
    { name: "Git", level: 88, icon: "git", category: "tools" },
    { name: "GitHub", level: 85, icon: "github", category: "tools" }
  ],

  experience: [
    {
      id: 1,
      position: "Backend Developer",
      company: "Ants Applied Data Science",
      duration: "Aug 2024 – Feb 2025",
      type: "Current",
      achievements: [
        "JWT-auth APIs with 35% fewer bugs",
        "MySQL integration for optimized backend",
        "Scalable architecture for Solar DL project",
        "Built robust REST API endpoints"
      ],
      technologies: ["Node.js", "Express.js", "MySQL", "JWT", "REST APIs"]
    },
    {
      id: 2,
      position: "AI/ML Intern",
      company: "Ants Applied Data Science", 
      duration: "Jan 2024 – Apr 2024",
      type: "Internship",
      achievements: [
        "ML models for prediction (+25% accuracy)",
        "Used Python for data analysis and modeling",
        "Implemented machine learning algorithms",
        "Data preprocessing and feature engineering"
      ],
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "ML"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Movie Recommendation System",
      description: "An intelligent movie recommendation platform using collaborative and content-based filtering algorithms to provide personalized movie suggestions.",
      technologies: ["Python", "Streamlit", "TMDB API", "Pandas", "Scikit-learn"],
      features: [
        "Collaborative filtering algorithm",
        "Content-based recommendations", 
        "Real-time TMDB API integration",
        "Interactive Streamlit interface",
        "User preference learning"
      ],
      liveUrl: "#",
      codeUrl: "#",
      image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=400&q=80",
      status: "Completed",
      category: "AI/ML"
    }
  ],

  education: [
    {
      id: 1,
      degree: "Diploma in Computer Science",
      institution: "Sri Jayachamarajendra Polytechnic",
      duration: "2021 – 2024",
      type: "Diploma",
      status: "Completed"
    },
    {
      id: 2,
      degree: "SSLC",
      institution: "SMS Public School",
      duration: "2018 – 2021", 
      type: "Secondary",
      status: "Completed"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Tech Mentor",
      role: "Senior Developer",
      company: "Tech Corp",
      message: "Risheek demonstrates exceptional backend development skills and shows great potential in AI integration.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
    }
  ],

  stats: [
    { label: "API Endpoints Built", value: "50+", icon: "server" },
    { label: "Bug Reduction", value: "35%", icon: "shield" },
    { label: "Accuracy Improvement", value: "25%", icon: "target" }
  ]
};

// Contact form mock submission
export const submitContactForm = async (formData) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock successful response
  console.log('Mock form submission:', formData);
  return {
    success: true,
    message: "Thanks for reaching out! I'll get back to you soon."
  };
};