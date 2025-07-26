import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 15000, // Increased timeout for production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with better error handling
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Response Error:', error.response?.data || error.message);
    }
    
    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server may be starting up');
    } else if (error.response?.status === 502 || error.response?.status === 503) {
      console.error('Server temporarily unavailable');
    }
    
    return Promise.reject(error);
  }
);

// Production-ready retry logic
const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff for retries
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

// Portfolio API functions with retry logic
export const portfolioAPI = {
  // Get complete portfolio data
  getPortfolio: async () => {
    try {
      return await retryRequest(async () => {
        const response = await apiClient.get('/portfolio');
        return response.data;
      });
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      throw new Error('Failed to load portfolio data. Please try again later.');
    }
  },

  // Get skills data
  getSkills: async () => {
    try {
      return await retryRequest(async () => {
        const response = await apiClient.get('/portfolio/skills');
        return response.data;
      });
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw new Error('Failed to load skills data');
    }
  },

  // Get projects data
  getProjects: async () => {
    try {
      return await retryRequest(async () => {
        const response = await apiClient.get('/portfolio/projects');
        return response.data;
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to load projects data');
    }
  },
};

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submitContact: async (formData) => {
    try {
      const response = await apiClient.post('/contact', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
      });
      return response.data;
    } catch (error) {
      if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  },
};

// Admin API functions (for future use)
export const adminAPI = {
  // Get contact submissions
  getContactSubmissions: async () => {
    try {
      const response = await apiClient.get('/admin/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      throw new Error('Failed to load contact submissions');
    }
  },
};

// Health check
export const healthAPI = {
  // Check API health
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('API is not responding');
    }
  },
};

// Cache management
export const cacheAPI = {
  // Local storage keys
  CACHE_KEYS: {
    PORTFOLIO: 'portfolio_data',
    PORTFOLIO_TIMESTAMP: 'portfolio_timestamp',
  },

  // Cache portfolio data
  cachePortfolio: (data) => {
    try {
      localStorage.setItem(cacheAPI.CACHE_KEYS.PORTFOLIO, JSON.stringify(data));
      localStorage.setItem(cacheAPI.CACHE_KEYS.PORTFOLIO_TIMESTAMP, Date.now().toString());
    } catch (error) {
      console.warn('Failed to cache portfolio data:', error);
    }
  },

  // Get cached portfolio data
  getCachedPortfolio: () => {
    try {
      const cached = localStorage.getItem(cacheAPI.CACHE_KEYS.PORTFOLIO);
      const timestamp = localStorage.getItem(cacheAPI.CACHE_KEYS.PORTFOLIO_TIMESTAMP);
      
      if (cached && timestamp) {
        // Check if cache is less than 1 hour old
        const oneHour = 60 * 60 * 1000;
        const now = Date.now();
        const cacheTime = parseInt(timestamp);
        
        if (now - cacheTime < oneHour) {
          return JSON.parse(cached);
        }
      }
      return null;
    } catch (error) {
      console.warn('Failed to retrieve cached portfolio data:', error);
      return null;
    }
  },

  // Clear cache
  clearCache: () => {
    try {
      localStorage.removeItem(cacheAPI.CACHE_KEYS.PORTFOLIO);
      localStorage.removeItem(cacheAPI.CACHE_KEYS.PORTFOLIO_TIMESTAMP);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  },
};

// Enhanced portfolio API with caching
export const enhancedPortfolioAPI = {
  // Get portfolio with caching
  getPortfolioWithCache: async () => {
    try {
      // Try to get cached data first
      const cached = cacheAPI.getCachedPortfolio();
      if (cached) {
        console.log('Using cached portfolio data');
        return cached;
      }

      // Fetch fresh data
      console.log('Fetching fresh portfolio data');
      const data = await portfolioAPI.getPortfolio();
      
      // Cache the data
      cacheAPI.cachePortfolio(data);
      
      return data;
    } catch (error) {
      // Try to fallback to cached data even if expired
      const cached = localStorage.getItem(cacheAPI.CACHE_KEYS.PORTFOLIO);
      if (cached) {
        console.warn('API failed, using stale cached data');
        return JSON.parse(cached);
      }
      throw error;
    }
  },
};

export default apiClient;