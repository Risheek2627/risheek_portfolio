#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Risheek N Portfolio
Tests all API endpoints, validation, error handling, and database integration
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://420b0595-1fc6-4927-ad67-752e2507119e.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

class PortfolioAPITester:
    def __init__(self):
        self.base_url = API_BASE_URL
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'total': 0,
            'details': []
        }

    def log_result(self, test_name, passed, message, details=None):
        """Log test result"""
        self.test_results['total'] += 1
        if passed:
            self.test_results['passed'] += 1
            print_success(f"{test_name}: {message}")
        else:
            self.test_results['failed'] += 1
            print_error(f"{test_name}: {message}")
        
        self.test_results['details'].append({
            'test': test_name,
            'passed': passed,
            'message': message,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })

    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        print_test_header("Health Check Endpoint")
        
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if 'message' in data and 'version' in data:
                    self.log_result("Health Check", True, 
                                  f"API is healthy - {data.get('message')} (v{data.get('version')})")
                    print_info(f"Response: {json.dumps(data, indent=2)}")
                else:
                    self.log_result("Health Check", False, 
                                  "Response missing required fields (message, version)")
            else:
                self.log_result("Health Check", False, 
                              f"Unexpected status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Health Check", False, f"Request failed: {str(e)}")

    def test_portfolio_data(self):
        """Test GET /api/portfolio - Complete portfolio data"""
        print_test_header("Portfolio Data Endpoint")
        
        try:
            response = self.session.get(f"{self.base_url}/portfolio")
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required sections
                required_sections = ['personal', 'skills', 'experience', 'projects', 'education', 'testimonials', 'stats']
                missing_sections = [section for section in required_sections if section not in data]
                
                if not missing_sections:
                    self.log_result("Portfolio Data", True, 
                                  "All required sections present in portfolio data")
                    
                    # Validate personal info
                    personal = data.get('personal', {})
                    if all(key in personal for key in ['name', 'title', 'email', 'bio']):
                        print_success("Personal info structure is valid")
                        print_info(f"Portfolio owner: {personal.get('name')} - {personal.get('title')}")
                    else:
                        print_warning("Personal info missing some fields")
                    
                    # Validate skills
                    skills = data.get('skills', [])
                    if skills and all('name' in skill and 'level' in skill for skill in skills):
                        print_success(f"Skills data valid ({len(skills)} skills found)")
                    else:
                        print_warning("Skills data structure issues")
                    
                    # Validate projects
                    projects = data.get('projects', [])
                    if projects and all('title' in project and 'description' in project for project in projects):
                        print_success(f"Projects data valid ({len(projects)} projects found)")
                    else:
                        print_warning("Projects data structure issues")
                        
                else:
                    self.log_result("Portfolio Data", False, 
                                  f"Missing required sections: {missing_sections}")
            else:
                self.log_result("Portfolio Data", False, 
                              f"Unexpected status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Portfolio Data", False, f"Request failed: {str(e)}")

    def test_skills_endpoint(self):
        """Test GET /api/portfolio/skills - Skills data"""
        print_test_header("Skills Endpoint")
        
        try:
            response = self.session.get(f"{self.base_url}/portfolio/skills")
            
            if response.status_code == 200:
                skills = response.json()
                
                if isinstance(skills, list):
                    if skills:
                        # Validate skill structure
                        required_fields = ['name', 'level', 'icon', 'category']
                        valid_skills = all(
                            all(field in skill for field in required_fields) 
                            for skill in skills
                        )
                        
                        if valid_skills:
                            self.log_result("Skills Endpoint", True, 
                                          f"Skills data valid ({len(skills)} skills)")
                            
                            # Show sample skills
                            for skill in skills[:3]:
                                print_info(f"Skill: {skill['name']} ({skill['level']}%) - {skill['category']}")
                        else:
                            self.log_result("Skills Endpoint", False, 
                                          "Skills missing required fields")
                    else:
                        self.log_result("Skills Endpoint", True, "Empty skills array returned")
                else:
                    self.log_result("Skills Endpoint", False, 
                                  "Response is not an array")
            else:
                self.log_result("Skills Endpoint", False, 
                              f"Unexpected status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Skills Endpoint", False, f"Request failed: {str(e)}")

    def test_projects_endpoint(self):
        """Test GET /api/portfolio/projects - Projects data"""
        print_test_header("Projects Endpoint")
        
        try:
            response = self.session.get(f"{self.base_url}/portfolio/projects")
            
            if response.status_code == 200:
                projects = response.json()
                
                if isinstance(projects, list):
                    if projects:
                        # Validate project structure
                        required_fields = ['title', 'description', 'technologies', 'features']
                        valid_projects = all(
                            all(field in project for field in required_fields) 
                            for project in projects
                        )
                        
                        if valid_projects:
                            self.log_result("Projects Endpoint", True, 
                                          f"Projects data valid ({len(projects)} projects)")
                            
                            # Show sample projects
                            for project in projects[:2]:
                                print_info(f"Project: {project['title']}")
                                print_info(f"  Technologies: {', '.join(project['technologies'][:3])}")
                        else:
                            self.log_result("Projects Endpoint", False, 
                                          "Projects missing required fields")
                    else:
                        self.log_result("Projects Endpoint", True, "Empty projects array returned")
                else:
                    self.log_result("Projects Endpoint", False, 
                                  "Response is not an array")
            else:
                self.log_result("Projects Endpoint", False, 
                              f"Unexpected status code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Projects Endpoint", False, f"Request failed: {str(e)}")

    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        print_test_header("Contact Form - Valid Submission")
        
        valid_contact_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techcorp.com",
            "message": "Hello Risheek, I'm impressed by your backend development portfolio. We have an exciting project involving REST API development and AI integration that would be perfect for your skillset. Would you be interested in discussing this opportunity further? We're looking for someone with your exact experience in Node.js and Python."
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                json=valid_contact_data
            )
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get('success') and data.get('message') and data.get('id'):
                    self.log_result("Contact Form Valid", True, 
                                  "Valid contact form submitted successfully")
                    print_info(f"Response: {data.get('message')}")
                    print_info(f"Submission ID: {data.get('id')}")
                else:
                    self.log_result("Contact Form Valid", False, 
                                  "Response missing required fields")
            else:
                self.log_result("Contact Form Valid", False, 
                              f"Unexpected status code: {response.status_code}")
                print_error(f"Response: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Contact Form Valid", False, f"Request failed: {str(e)}")

    def test_contact_form_validation(self):
        """Test POST /api/contact validation errors"""
        print_test_header("Contact Form - Validation Tests")
        
        validation_tests = [
            {
                "name": "Missing Name",
                "data": {
                    "name": "",
                    "email": "test@example.com",
                    "message": "This is a test message with sufficient length."
                },
                "expected_status": [400, 422]
            },
            {
                "name": "Invalid Email",
                "data": {
                    "name": "John Doe",
                    "email": "invalid-email",
                    "message": "This is a test message with sufficient length."
                },
                "expected_status": [400, 422]
            },
            {
                "name": "Short Message",
                "data": {
                    "name": "John Doe",
                    "email": "john@example.com",
                    "message": "Short"
                },
                "expected_status": [400, 422]
            },
            {
                "name": "Short Name",
                "data": {
                    "name": "J",
                    "email": "john@example.com",
                    "message": "This is a test message with sufficient length."
                },
                "expected_status": [400, 422]
            }
        ]
        
        for test in validation_tests:
            try:
                response = self.session.post(
                    f"{self.base_url}/contact",
                    json=test["data"]
                )
                
                if response.status_code in test["expected_status"]:
                    self.log_result(f"Validation - {test['name']}", True, 
                                  f"Correctly rejected with status {response.status_code}")
                else:
                    self.log_result(f"Validation - {test['name']}", False, 
                                  f"Expected {test['expected_status']}, got {response.status_code}")
                    
            except requests.exceptions.RequestException as e:
                self.log_result(f"Validation - {test['name']}", False, 
                              f"Request failed: {str(e)}")

    def test_error_handling(self):
        """Test error handling for malformed requests"""
        print_test_header("Error Handling Tests")
        
        # Test malformed JSON
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                data="invalid json",
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code in [400, 422]:
                self.log_result("Malformed JSON", True, 
                              f"Correctly handled malformed JSON (status: {response.status_code})")
            else:
                self.log_result("Malformed JSON", False, 
                              f"Unexpected status for malformed JSON: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Malformed JSON", False, f"Request failed: {str(e)}")
        
        # Test non-existent endpoint
        try:
            response = self.session.get(f"{self.base_url}/nonexistent")
            
            if response.status_code == 404:
                self.log_result("Non-existent Endpoint", True, 
                              "Correctly returned 404 for non-existent endpoint")
            else:
                self.log_result("Non-existent Endpoint", False, 
                              f"Expected 404, got {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Non-existent Endpoint", False, f"Request failed: {str(e)}")

    def test_database_integration(self):
        """Test database integration by verifying data persistence"""
        print_test_header("Database Integration Tests")
        
        # Test that portfolio data is seeded and persistent
        try:
            # Make multiple requests to ensure data consistency
            responses = []
            for i in range(3):
                response = self.session.get(f"{self.base_url}/portfolio")
                if response.status_code == 200:
                    responses.append(response.json())
            
            if len(responses) == 3:
                # Check if all responses are identical (data persistence)
                if all(resp == responses[0] for resp in responses):
                    self.log_result("Data Persistence", True, 
                                  "Portfolio data is consistent across multiple requests")
                else:
                    self.log_result("Data Persistence", False, 
                                  "Portfolio data inconsistent across requests")
                
                # Check if data has expected structure
                portfolio = responses[0]
                if portfolio.get('personal', {}).get('name') == "Risheek N":
                    self.log_result("Data Seeding", True, 
                                  "Portfolio data properly seeded with correct owner info")
                else:
                    self.log_result("Data Seeding", False, 
                                  "Portfolio data not properly seeded")
            else:
                self.log_result("Database Integration", False, 
                              "Failed to get consistent responses from database")
                
        except requests.exceptions.RequestException as e:
            self.log_result("Database Integration", False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all API tests"""
        print(f"{Colors.BOLD}{Colors.BLUE}")
        print("🚀 Starting Comprehensive Backend API Testing")
        print(f"📍 Testing API at: {self.base_url}")
        print(f"⏰ Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"{Colors.ENDC}")
        
        # Run all tests
        self.test_health_check()
        self.test_portfolio_data()
        self.test_skills_endpoint()
        self.test_projects_endpoint()
        self.test_contact_form_valid()
        self.test_contact_form_validation()
        self.test_error_handling()
        self.test_database_integration()
        
        # Print summary
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.BLUE}TEST SUMMARY{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.ENDC}")
        
        total = self.test_results['total']
        passed = self.test_results['passed']
        failed = self.test_results['failed']
        
        print(f"\n📊 Total Tests: {total}")
        print_success(f"Passed: {passed}")
        if failed > 0:
            print_error(f"Failed: {failed}")
        else:
            print_success(f"Failed: {failed}")
        
        success_rate = (passed / total * 100) if total > 0 else 0
        print(f"📈 Success Rate: {success_rate:.1f}%")
        
        if failed == 0:
            print(f"\n{Colors.GREEN}{Colors.BOLD}🎉 ALL TESTS PASSED! Backend API is working correctly.{Colors.ENDC}")
        else:
            print(f"\n{Colors.YELLOW}{Colors.BOLD}⚠️  Some tests failed. Check the details above.{Colors.ENDC}")
        
        print(f"\n⏰ Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    print("Risheek N Portfolio - Backend API Testing Suite")
    print("=" * 50)
    
    tester = PortfolioAPITester()
    tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if tester.test_results['failed'] == 0 else 1)