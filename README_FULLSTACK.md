# Hood Shop - Full Stack E-Commerce

A complete full-stack e-commerce application with React frontend and Node.js/Express backend.

## 🚀 Quick Start

### Option 1: Use Startup Script (Windows)
```bash
# Double-click start-app.bat
# OR run from terminal:
start-app.bat
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd ../hood-shop-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📦 Features

### Frontend Features
- ✅ Product browsing with search & filters
- ✅ Shopping cart management
- ✅ User authentication (signup/login)
- ✅ Wishlist functionality
- ✅ Product reviews & ratings
- ✅ Multi-step checkout process
- ✅ Order history
- ✅ User profile management
- ✅ Responsive design (mobile-friendly)

### Backend Features
- ✅ RESTful API with Express.js
- ✅ PostgreSQL database
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ CORS & security headers
- ✅ Rate limiting
- ✅ Input validation
- ✅ Auto-seeding sample data

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Vite** - Build tool
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Cors** - Cross-origin requests

## 📁 Project Structure

```
hood-shop/                    # Frontend
├── src/
│   ├── Components/           # Reusable components
│   ├── Context/              # React contexts (Auth, Cart, Products, Wishlist)
│   ├── Pages/                # Page components
│   ├── Css/                  # Stylesheets
│   ├── data/                 # Mock data (fallback)
│   └── services/
│       └── api.js            # API integration layer
├── .env                      # Environment variables
└── start-app.bat             # Windows startup script

hood-shop-backend/            # Backend (separate folder)
├── routes/                   # API routes
├── config/                   # Database config
├── middleware/               # Auth, validation
└── scripts/                  # Database seeds
```

## 🔐 Environment Setup

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DB_URL=postgresql://postgres:password@localhost:5432/hoodshop
JWT_SECRET=your_secret_key_here
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Filter by category
- `GET /api/products/search/:query` - Search products

### Cart (Auth Required)
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/item/:id` - Update quantity
- `DELETE /api/cart/item/:id` - Remove item

### Orders (Auth Required)
- `GET /api/users/orders` - Get all orders
- `GET /api/users/orders/:id` - Get order details

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:5000/health
```

### Test Products API
```bash
curl http://localhost:5000/api/products
```

### Test Frontend
1. Open http://localhost:5173
2. Browse products (works without backend via mock data)
3. Try signup/login (requires backend)

## 🎯 Development Workflow

### Frontend Only
- Frontend works standalone with mock data
- Products, cart, wishlist use localStorage
- Great for UI development

### Full Stack
- Start both backend and frontend
- Real authentication with JWT
- Live product data from database
- Cart/wishlist can sync to backend

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database exists: `hoodshop`
- Check `.env` configuration

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in backend
- Verify `VITE_API_URL` in frontend `.env`

### Products not loading
- Frontend auto-falls back to mock data
- Check browser console for errors
- Backend health: http://localhost:5000/health

### Database errors
```bash
# In backend folder
npm run setup  # Creates tables and seeds data
```

## 📚 Learn More

- [Frontend Integration Guide](./BACKEND_INTEGRATION.md)
- [Backend Documentation](../hood-shop-backend/README.md)

## 🔗 URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Backend Health:** http://localhost:5000/health

## 📝 Default Test Account

After backend seeds data, you can create accounts via signup page.

---

**Built with ❤️ using React & Node.js**
