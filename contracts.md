# API Contracts & Integration Plan

## Overview
This document outlines the API contracts and integration strategy for Risheek N's AI Portfolio website.

## Current Mock Data Structure

### Portfolio Data (mockData.js)
- Personal information, skills, experience, projects, education
- Contact form submission simulation
- Static data currently used for frontend display

## Backend API Endpoints to Implement

### 1. Portfolio Data Endpoints

#### GET /api/portfolio
- **Purpose**: Retrieve all portfolio data
- **Response**: Complete portfolio information including personal, skills, experience, projects, education
- **Current Mock**: `portfolioData` object in mockData.js

#### GET /api/portfolio/skills
- **Purpose**: Get skills data with categories and proficiency levels
- **Response**: Array of skills with name, level, icon, category
- **Frontend Usage**: SkillsSection component

#### GET /api/portfolio/projects
- **Purpose**: Retrieve project portfolio
- **Response**: Array of projects with details, technologies, links
- **Frontend Usage**: ProjectsSection component

### 2. Contact Form Endpoint

#### POST /api/contact
- **Purpose**: Store contact form submissions
- **Request Body**:
  ```json
  {
    "name": "string (required)",
    "email": "string (required, valid email)",
    "message": "string (required)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Thanks for reaching out! I'll get back to you soon.",
    "id": "contact_submission_id"
  }
  ```
- **Validation**: Name, email (format), message required
- **Storage**: MongoDB collection `contact_submissions`
- **Current Mock**: `submitContactForm()` function in mockData.js

## MongoDB Collections

### 1. portfolio_data
- Single document containing all portfolio information
- Fields: personal, skills, experience, projects, education, stats

### 2. contact_submissions
- Documents for each contact form submission
- Fields: name, email, message, submitted_at, status

## Frontend Integration Changes

### Files to Update:
1. **ContactSection.jsx**: Replace mock `submitContactForm` with real API call
2. **HomePage.jsx**: Replace mock `portfolioData` import with API call  
3. **mockData.js**: Remove/replace with real API calls

### API Integration Pattern:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Contact form submission
const response = await axios.post(`${API}/contact`, formData);

// Portfolio data loading
const portfolioResponse = await axios.get(`${API}/portfolio`);
```

## Implementation Strategy

### Phase 1: Backend Setup
1. Create MongoDB models for portfolio data and contact submissions
2. Implement GET /api/portfolio endpoint
3. Implement POST /api/contact endpoint with validation
4. Seed portfolio data to MongoDB

### Phase 2: Frontend Integration
1. Create API service functions
2. Update ContactSection to use real backend
3. Update HomePage to load data from backend
4. Remove mock data dependencies

### Phase 3: Testing & Validation
1. Test contact form submission and storage
2. Verify portfolio data loading
3. Test error handling and validation
4. Mobile and responsive testing

## Error Handling

### Backend Error Responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["validation errors if any"]
}
```

### Frontend Error Handling:
- Display user-friendly error messages
- Form validation feedback
- Loading states during API calls
- Fallback to cached data if needed

## Security Considerations
- Input validation and sanitization
- Rate limiting for contact form
- CORS configuration
- Environment variable protection

## Performance Optimization
- Cache portfolio data on frontend
- Optimize database queries
- Compress API responses
- Lazy loading for large datasets

---

**Ready for Implementation**: This contract ensures seamless backend integration without breaking existing frontend functionality.