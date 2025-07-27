from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Environment detection
ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development')
IS_PRODUCTION = ENVIRONMENT == 'production'

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(
    title="Risheek N Portfolio API", 
    description="Backend API for AI-Powered Portfolio",
    version="1.0.0",
    docs_url="/docs" if not IS_PRODUCTION else None,  # Disable docs in production
    redoc_url="/redoc" if not IS_PRODUCTION else None  # Disable redoc in production
)

# Production middlewares
if IS_PRODUCTION:
    app.add_middleware(
        TrustedHostMiddleware, 
        allowed_hosts=["*.onrender.com", "*.vercel.app", "*.netlify.app"]
    )

app.add_middleware(GZipMiddleware, minimum_size=1000)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Portfolio Data Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    subtitle: str
    email: EmailStr
    phone: str
    linkedin: str
    bio: str

class Skill(BaseModel):
    name: str
    level: int
    icon: str
    category: str

class Experience(BaseModel):
    id: int
    position: str
    company: str
    duration: str
    type: str
    achievements: List[str]
    technologies: List[str]

class Project(BaseModel):
    id: int
    title: str
    description: str
    technologies: List[str]
    features: List[str]
    liveUrl: str
    codeUrl: str
    image: str
    status: str
    category: str

class Education(BaseModel):
    id: int
    degree: str
    institution: str
    duration: str
    type: str
    status: str

class Testimonial(BaseModel):
    id: int
    name: str
    role: str
    company: str
    message: str
    avatar: str

class Stat(BaseModel):
    label: str
    value: str
    icon: str

class PortfolioData(BaseModel):
    personal: PersonalInfo
    skills: List[Skill]
    experience: List[Experience]
    projects: List[Project]
    education: List[Education]
    testimonials: List[Testimonial]
    stats: List[Stat]

# Contact Form Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = Field(default="new")

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

class ContactResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# Legacy Models (keeping for compatibility)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Helper Functions
def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_input(text: str) -> str:
    # Basic HTML/script tag removal
    text = re.sub(r'<[^>]*>', '', text)
    text = re.sub(r'javascript:', '', text, flags=re.IGNORECASE)
    return text.strip()

# API Routes

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Risheek N Portfolio API - Ready to serve!", "version": "1.0.0"}

# Portfolio Data Endpoints
@api_router.get("/portfolio", response_model=Dict[str, Any])
async def get_portfolio_data():
    """Get complete portfolio data"""
    try:
        portfolio_doc = await db.portfolio_data.find_one({}, {"_id": 0})
        
        if not portfolio_doc:
            # If no portfolio data exists, seed it with default data
            await seed_portfolio_data()
            portfolio_doc = await db.portfolio_data.find_one({}, {"_id": 0})
        
        return portfolio_doc
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch portfolio data")

@api_router.get("/portfolio/skills", response_model=List[Skill])
async def get_skills():
    """Get skills data"""
    try:
        portfolio_doc = await db.portfolio_data.find_one({}, {"_id": 0, "skills": 1})
        if portfolio_doc and "skills" in portfolio_doc:
            return portfolio_doc["skills"]
        return []
    except Exception as e:
        logger.error(f"Error fetching skills: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch skills data")

@api_router.get("/portfolio/projects", response_model=List[Project])
async def get_projects():
    """Get projects data"""
    try:
        portfolio_doc = await db.portfolio_data.find_one({}, {"_id": 0, "projects": 1})
        if portfolio_doc and "projects" in portfolio_doc:
            return portfolio_doc["projects"]
        return []
    except Exception as e:
        logger.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects data")

# Contact Form Endpoint
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Handle contact form submissions"""
    try:
        # Sanitize input
        sanitized_data = {
            "name": sanitize_input(contact_data.name),
            "email": contact_data.email.lower().strip(),
            "message": sanitize_input(contact_data.message)
        }
        
        # Additional validation
        if not validate_email(sanitized_data["email"]):
            raise HTTPException(status_code=400, detail="Invalid email format")
        
        if len(sanitized_data["name"]) < 2:
            raise HTTPException(status_code=400, detail="Name must be at least 2 characters")
        
        if len(sanitized_data["message"]) < 10:
            raise HTTPException(status_code=400, detail="Message must be at least 10 characters")
        
        # Create contact submission
        contact_submission = ContactSubmission(**sanitized_data)
        
        # Store in database
        result = await db.contact_submissions.insert_one(contact_submission.dict())
        
        if result.inserted_id:
            return ContactResponse(
                success=True,
                message="Thanks for reaching out! I'll get back to you soon.",
                id=contact_submission.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact submission")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to process contact form")

# Admin Endpoints (for viewing contact submissions)
@api_router.get("/admin/contacts", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions (admin only)"""
    try:
        contacts = await db.contact_submissions.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(100)
        return [ContactSubmission(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error fetching contacts: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")

# Admin endpoint to refresh portfolio data
@api_router.post("/admin/refresh-portfolio")
async def refresh_portfolio_data():
    """Refresh portfolio data - Force reseed"""
    try:
        await seed_portfolio_data()
        return {"success": True, "message": "Portfolio data refreshed successfully"}
    except Exception as e:
        logger.error(f"Error refreshing portfolio data: {e}")
        raise HTTPException(status_code=500, detail="Failed to refresh portfolio data")

# Legacy endpoints (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Seed Portfolio Data Function
async def seed_portfolio_data():
    """Seed initial portfolio data to MongoDB"""
    portfolio_data = {
        "personal": {
            "name": "Risheek N",
            "title": "AI-Powered Backend Developer",
            "subtitle": "REST API Specialist",
            "email": "risheek2627@gmail.com",
            "phone": "9901737965",
            "linkedin": "linkedin.com/in/risheek-n",
            "bio": "Hey! I'm Risheek, a backend developer passionate about building scalable REST APIs and AI-powered applications. I merge backend logic with intelligent systems to create real-world impact."
        },
        "skills": [
            {"name": "JavaScript", "level": 85, "icon": "js", "category": "language"},
            {"name": "Python", "level": 90, "icon": "python", "category": "language"},
            {"name": "Node.js", "level": 85, "icon": "nodejs", "category": "runtime"},
            {"name": "Express.js", "level": 88, "icon": "server", "category": "framework"},
            {"name": "MySQL", "level": 82, "icon": "database", "category": "database"},
            {"name": "MongoDB", "level": 85, "icon": "mongodb", "category": "database"},
            {"name": "REST APIs", "level": 90, "icon": "api", "category": "backend"},
            {"name": "Git", "level": 88, "icon": "git", "category": "tools"},
            {"name": "GitHub", "level": 85, "icon": "github", "category": "tools"}
        ],
        "experience": [
            {
                "id": 1,
                "position": "Backend Developer",
                "company": "Ants Applied Data Science",
                "duration": "Aug 2024 – Feb 2025",
                "type": "Current",
                "achievements": [
                    "JWT-auth APIs with 35% fewer bugs",
                    "MySQL integration for optimized backend",
                    "Scalable architecture for Solar DL project",
                    "Built robust REST API endpoints"
                ],
                "technologies": ["Node.js", "Express.js", "MySQL", "JWT", "REST APIs"]
            },
            {
                "id": 2,
                "position": "AI/ML Intern",
                "company": "Ants Applied Data Science",
                "duration": "Jan 2024 – Apr 2024",
                "type": "Internship",
                "achievements": [
                    "ML models for prediction (+25% accuracy)",
                    "Used Python for data analysis and modeling",
                    "Implemented machine learning algorithms",
                    "Data preprocessing and feature engineering"
                ],
                "technologies": ["Python", "Scikit-learn", "Pandas", "NumPy", "ML"]
            }
        ],
        "projects": [
            {
                "id": 1,
                "title": "Movie Recommendation System",
                "description": "An intelligent movie recommendation platform using collaborative and content-based filtering algorithms to provide personalized movie suggestions.",
                "technologies": ["Python", "Streamlit", "TMDB API", "Pandas", "Scikit-learn"],
                "features": [
                    "Collaborative filtering algorithm",
                    "Content-based recommendations",
                    "Real-time TMDB API integration",
                    "Interactive Streamlit interface",
                    "User preference learning"
                ],
                "liveUrl": "#",
                "codeUrl": "#",
                "image": "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=400&q=80",
                "status": "Completed",
                "category": "AI/ML"
            }
        ],
        "education": [
            {
                "id": 1,
                "degree": "Diploma in Computer Science",
                "institution": "Sri Jayachamarajendra Polytechnic",
                "duration": "2021 – 2024",
                "type": "Diploma",
                "status": "Completed"
            },
            {
                "id": 2,
                "degree": "SSLC",
                "institution": "SMS Public School",
                "duration": "2018 – 2021",
                "type": "Secondary",
                "status": "Completed"
            }
        ],
        "testimonials": [
            {
                "id": 1,
                "name": "Tech Mentor",
                "role": "Senior Developer",
                "company": "Tech Corp",
                "message": "Risheek demonstrates exceptional backend development skills and shows great potential in AI integration.",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
            }
        ],
        "stats": [
            {"label": "API Endpoints Built", "value": "50+", "icon": "server"},
            {"label": "Bug Reduction", "value": "35%", "icon": "shield"},
            {"label": "Accuracy Improvement", "value": "25%", "icon": "target"}
        ]
    }
    
    # Insert or update portfolio data
    await db.portfolio_data.replace_one({}, portfolio_data, upsert=True)
    logger.info("Portfolio data seeded successfully")

# Include the router in the main app
app.include_router(api_router)

# CORS Configuration
if IS_PRODUCTION:
    # Production CORS - Specific origins
    allowed_origins = [
        "https://risheek-portfolio.vercel.app",  # Replace with your actual Vercel domain
        "https://*.vercel.app",
        "https://*.netlify.app",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )
else:
    # Development CORS - Allow all
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database on startup"""
    try:
        # Test database connection
        await client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
        
        # Seed portfolio data if not exists
        portfolio_exists = await db.portfolio_data.find_one({})
        if not portfolio_exists:
            await seed_portfolio_data()
            logger.info("Portfolio data seeded on startup")
            
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Disconnected from MongoDB")
