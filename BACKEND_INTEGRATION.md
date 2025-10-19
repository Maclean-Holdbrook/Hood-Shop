# Backend Integration Guide

## ✅ Integration Complete!

Your frontend is now connected to your backend API at `hood-shop-backend`.

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd ../hood-shop-backend
npm run dev
```
The backend will run on **http://localhost:5000**

### 2. Start Frontend
```bash
cd hood-shop
npm run dev
```
The frontend will run on **http://localhost:5173**

## 🔧 What Was Integrated

### ✅ API Service (`src/services/api.js`)
- Authentication endpoints (login, register, profile)
- Products endpoints (get all, get by ID, search, categories)
- Cart endpoints (sync with backend - optional)
- Users endpoints (orders, stats)
- Automatic token management
- Error handling with fallback to mock data

### ✅ Updated Contexts
1. **AuthContext** - Now uses backend for:
   - User registration
   - User login
   - Token storage

2. **ProductContext** - Now uses backend for:
   - Fetching all products
   - Fetching single product
   - Falls back to mock data if backend is unavailable

### ✅ Environment Variables
- `.env` file created with `VITE_API_URL=http://localhost:5000/api`
- `.env.example` for reference

## 📡 API Endpoints Available

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search/:query` - Search products
- `GET /api/products/meta/categories` - Get all categories

### Cart (Requires Authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/item/:id` - Update cart item
- `DELETE /api/cart/item/:id` - Remove item

### Users (Requires Authentication)
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/orders` - Get user orders
- `GET /api/users/orders/:id` - Get order details

## 🔐 Authentication Flow

1. **User Registration/Login:**
   - User submits credentials
   - Backend validates and returns JWT token
   - Token stored in `localStorage` as `authToken`
   - User data stored as `userData`

2. **API Requests:**
   - Token automatically added to `Authorization` header
   - If token expires (401), user redirected to login

## 🎯 Testing

### 1. Test Backend Health
```bash
curl http://localhost:5000/health
```

### 2. Test Product API
```bash
curl http://localhost:5000/api/products
```

### 3. Test Registration
1. Go to http://localhost:5173/signup
2. Fill in: Name, Email, Password
3. Should create account and log in

### 4. Test Login
1. Go to http://localhost:5173/signin
2. Use credentials from registration
3. Should redirect to home page

## ⚡ Features

### Automatic Fallback
If backend is not running, the app automatically falls back to mock data for products. This means:
- ✅ App works offline during development
- ✅ Products display even if backend is down
- ⚠️ Authentication requires backend

### Error Handling
- Network errors show user-friendly messages
- 401 errors auto-redirect to login
- Toast notifications for all actions

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if PostgreSQL is running
# Check .env file in backend folder
# Ensure port 5000 is not in use
```

### CORS Errors
- Backend is configured for `http://localhost:5173`
- If using different port, update backend `.env` file

### Products not loading
- Check backend is running: http://localhost:5000/health
- Check console for errors
- App will fallback to mock data automatically

### Login not working
- Ensure backend is running
- Check network tab for 401/500 errors
- Verify backend database connection

## 📝 Next Steps

### Optional: Sync Cart with Backend
Currently, cart uses localStorage. To sync with backend:
1. Update `CartContext.jsx` to use `cartAPI` from `services/api.js`
2. Call backend on add/remove/update operations
3. Load cart from backend on auth

### Add More Features
- Order creation endpoint integration
- User profile updates
- Password change functionality
- Wishlist backend sync

## 🔗 Backend Repository
Located at: `C:\Users\ebene\Desktop\Projects\hood-shop-backend`

## 📊 Database
- **Type:** PostgreSQL
- **Name:** hoodshop
- **Port:** 5432
- Backend auto-seeds sample products on first run

---

**Your e-commerce is now full-stack!** 🎉
