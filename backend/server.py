from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Risheek N Portfolio API", description="Backend API for AI-Powered Portfolio")

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

# Include the router in the main app
app.include_router(api_router)

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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
