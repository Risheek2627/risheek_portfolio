#!/bin/bash

# 🚀 Production Build Script for Risheek Portfolio

echo "🏗️  Building Risheek N Portfolio for Production..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required environment variables are set
check_env_vars() {
    print_status "Checking environment variables..."
    
    if [ -z "$REACT_APP_BACKEND_URL" ]; then
        print_warning "REACT_APP_BACKEND_URL not set. Using placeholder."
        export REACT_APP_BACKEND_URL="https://your-backend-app.onrender.com"
    else
        print_success "REACT_APP_BACKEND_URL: $REACT_APP_BACKEND_URL"
    fi
}

# Build frontend
build_frontend() {
    print_status "Building React frontend..."
    cd frontend
    
    # Install dependencies
    print_status "Installing dependencies..."
    yarn install --frozen-lockfile
    
    # Run production build
    print_status "Running production build..."
    GENERATE_SOURCEMAP=false yarn build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend build completed successfully!"
        
        # Show build size
        print_status "Build size analysis:"
        du -sh build/
        du -sh build/static/js/
        du -sh build/static/css/
    else
        print_error "Frontend build failed!"
        exit 1
    fi
    
    cd ..
}

# Prepare backend for production
prepare_backend() {
    print_status "Preparing backend for production..."
    cd backend
    
    # Check Python dependencies
    print_status "Checking Python dependencies..."
    pip check
    
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies are compatible!"
    else
        print_warning "Some dependency conflicts detected. Please review."
    fi
    
    # Test server startup (quick test)
    print_status "Testing server startup..."
    timeout 10s python -c "
import sys
sys.path.append('.')
from server import app
print('✅ Server imports successfully!')
" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        print_success "Backend server can start successfully!"
    else
        print_warning "Backend server test had issues. Please check manually."
    fi
    
    cd ..
}

# Create deployment archive
create_deployment_package() {
    print_status "Creating deployment package..."
    
    # Create deployment directory
    mkdir -p deployment
    
    # Copy frontend build
    cp -r frontend/build deployment/frontend-build
    
    # Copy backend files
    mkdir -p deployment/backend
    cp -r backend/*.py backend/requirements.txt backend/.env.production backend/render.yaml backend/Dockerfile deployment/backend/
    
    # Copy deployment guide
    cp DEPLOYMENT_GUIDE.md deployment/
    
    print_success "Deployment package created in ./deployment/"
}

# Main execution
main() {
    print_status "🚀 Starting production build process for Risheek Portfolio..."
    echo ""
    
    # Check environment
    check_env_vars
    echo ""
    
    # Build frontend
    build_frontend
    echo ""
    
    # Prepare backend
    prepare_backend
    echo ""
    
    # Create deployment package
    create_deployment_package
    echo ""
    
    print_success "🎉 Production build completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Deploy backend to Render using files in ./deployment/backend/"
    echo "2. Deploy frontend to Vercel using files in ./deployment/frontend-build/"
    echo "3. Follow the DEPLOYMENT_GUIDE.md for detailed instructions"
    echo ""
    print_status "Your portfolio is ready for production! 🚀"
}

# Run main function
main