# 🚀 Risheek N Portfolio - Production Deployment Guide

## 📋 Overview
This guide will help you deploy Risheek's AI-powered portfolio to production using:
- **Frontend**: Vercel (React app)
- **Backend**: Render (FastAPI + Python)
- **Database**: MongoDB Atlas (Cloud)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose Free tier - M0)
4. Choose AWS/Google Cloud and a region close to your users

### 1.2 Configure Database Access
1. **Database Access**: Create a database user
   - Username: `portfolio_user`
   - Password: Generate a secure password
   - Database User Privileges: `Read and write to any database`

2. **Network Access**: Add IP addresses
   - Add `0.0.0.0/0` for now (allows access from anywhere)
   - Later, restrict to your backend server IP for security

### 1.3 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://portfolio_user:<password>@cluster0.xxxxx.mongodb.net/
   ```
4. Replace `<password>` with your actual password

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Frontend
1. **Push code to GitHub**:
   ```bash
   # From /app/frontend directory
   git init
   git add .
   git commit -m "Initial commit - Risheek Portfolio Frontend"
   git branch -M main
   git remote add origin https://github.com/yourusername/risheek-portfolio-frontend.git
   git push -u origin main
   ```

### 2.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your frontend repository
5. Configure deployment:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (if deploying from frontend folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 2.3 Add Environment Variables in Vercel
1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add:
   ```
   Name: REACT_APP_BACKEND_URL
   Value: https://your-backend-app.onrender.com
   ```
   (You'll get this URL after deploying the backend in Step 3)

### 2.4 Custom Domain (Optional)
1. In Vercel project settings, go to **Domains**
2. Add your custom domain (e.g., `risheek-portfolio.com`)
3. Follow DNS configuration instructions

---

## ⚙️ Step 3: Deploy Backend to Render

### 3.1 Prepare Backend
1. **Push backend code to GitHub**:
   ```bash
   # From /app/backend directory
   git init
   git add .
   git commit -m "Initial commit - Risheek Portfolio Backend"
   git branch -M main
   git remote add origin https://github.com/yourusername/risheek-portfolio-backend.git
   git push -u origin main
   ```

### 3.2 Deploy to Render
1. Go to [Render](https://render.com)
2. Sign up/Login with GitHub
3. Click "New" → "Web Service"
4. Connect your backend repository
5. Configure service:
   - **Name**: `risheek-portfolio-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### 3.3 Add Environment Variables in Render
1. In your Render service dashboard, go to **Environment**
2. Add these variables:
   ```
   MONGO_URL = mongodb+srv://portfolio_user:yourpassword@cluster0.xxxxx.mongodb.net/
   DB_NAME = risheek_portfolio_prod
   ENVIRONMENT = production
   SECRET_KEY = your-super-secret-key-change-this
   ```

### 3.4 Update CORS Origins
1. After deployment, note your Render URL (e.g., `https://risheek-portfolio-backend.onrender.com`)
2. In your backend code, update the CORS allowed origins:
   ```python
   allowed_origins = [
       "https://your-vercel-app.vercel.app",  # Your actual Vercel URL
       "https://risheek-portfolio.com",       # Your custom domain (if any)
   ]
   ```
3. Commit and push changes to trigger redeployment

---

## 🔗 Step 4: Connect Frontend to Backend

### 4.1 Update Frontend Environment Variable
1. Go back to your Vercel project
2. Update the environment variable:
   ```
   REACT_APP_BACKEND_URL = https://your-backend-app.onrender.com
   ```
3. Redeploy the frontend

### 4.2 Test Integration
1. Visit your deployed frontend URL
2. Check browser console for any CORS errors
3. Test the contact form to ensure backend connectivity
4. Verify that skills data loads from the backend

---

## 🔧 Step 5: Production Optimizations

### 5.1 Frontend Optimizations
- ✅ **Vercel.json configured** for optimal caching
- ✅ **Build optimizations** enabled
- ✅ **Source maps disabled** in production
- ✅ **Bundle analysis** available with `npm run build:analyze`

### 5.2 Backend Optimizations
- ✅ **GZip compression** enabled
- ✅ **CORS restricted** to specific domains
- ✅ **API docs disabled** in production
- ✅ **Trusted host middleware** for security
- ✅ **Connection pooling** with MongoDB

### 5.3 Security Checklist
- ✅ Environment variables stored securely
- ✅ Database user has minimal required permissions
- ✅ CORS configured for specific domains only
- ✅ API documentation disabled in production
- ✅ HTTPS enforced on both frontend and backend

---

## 📊 Step 6: Monitoring & Analytics

### 6.1 Add Google Analytics (Optional)
1. Create Google Analytics 4 property
2. Add tracking code to your React app:
   ```javascript
   // In public/index.html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

### 6.2 Monitor Backend Performance
1. Render provides basic metrics in the dashboard
2. Monitor response times and error rates
3. Set up uptime monitoring (e.g., UptimeRobot)

---

## 🚨 Troubleshooting

### Common Issues:

**1. CORS Errors**
- Update `allowed_origins` in backend
- Ensure frontend URL is correctly added
- Redeploy backend after changes

**2. Environment Variables Not Working**
- Double-check variable names (case-sensitive)
- Redeploy after adding/changing variables
- Check Vercel/Render logs for errors

**3. Database Connection Issues**
- Verify MongoDB Atlas connection string
- Check network access settings in Atlas
- Ensure database user permissions are correct

**4. Build Failures**
- Check Node.js/Python versions
- Verify all dependencies are in package.json/requirements.txt
- Review build logs for specific errors

---

## 📞 Support

If you encounter issues:
1. Check the deployment logs in Vercel/Render dashboards
2. Use browser developer tools to debug frontend issues
3. Test API endpoints directly using the backend URL + `/api/`

---

## 🎉 Congratulations!

Your AI-powered portfolio is now live and production-ready! 

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com/api/`
- Admin Panel: `https://your-backend.onrender.com/docs` (if enabled)

Share your portfolio with potential employers and clients! 🚀