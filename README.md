# Hood Shop - Modern E-commerce React Application

A modern, responsive e-commerce application built with React, featuring a complete shopping experience with authentication, cart management, and product browsing.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse and search through products with advanced filtering
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **User Authentication**: Sign up, sign in, and secure user sessions
- **Product Details**: Detailed product pages with image galleries and specifications
- **Responsive Design**: Mobile-first design that works on all devices

### Advanced Features
- **Real-time Search**: Instant product search with debounced input
- **Advanced Filtering**: Filter by category, price range, and sort options
- **Toast Notifications**: User-friendly feedback for all actions
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error handling with retry options
- **Context API**: Centralized state management for auth, cart, and products

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Routing**: React Router DOM v6
- **Styling**: CSS3 with modern features
- **Animations**: Framer Motion
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   ├── ProductList.jsx # Product listing component
│   ├── ProductCard.jsx # Individual product card
│   ├── SearchAndFilter.jsx # Search and filter controls
│   └── Loading.jsx     # Loading spinner component
├── Pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── ProductDetail.jsx # Product detail page
│   ├── Cart.jsx        # Shopping cart page
│   ├── Signin.jsx      # Sign in page
│   └── Signup.jsx      # Sign up page
├── Context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   ├── CartContext.jsx # Shopping cart state
│   └── ProductContext.jsx # Product data state
├── services/           # API service layer
│   └── api.js         # HTTP client configuration
├── data/              # Mock data (development)
│   └── mockProducts.js # Sample product data
├── Css/               # Stylesheets
│   ├── AuthForm.css   # Authentication form styles
│   ├── Cart.css       # Shopping cart styles
│   ├── Loading.css    # Loading component styles
│   ├── Navbar.css     # Navigation styles
│   ├── ProductCard.css # Product card styles
│   ├── ProductDetail.css # Product detail styles
│   ├── ProductList.css # Product list styles
│   └── SearchAndFilter.css # Search/filter styles
└── assets/            # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hood-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔌 Backend Integration

### API Endpoints Structure

The application is designed to work with a RESTful API. Here's the expected backend structure:

#### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
PUT  /api/auth/profile
```

#### Product Endpoints
```
GET    /api/products           # Get all products
GET    /api/products/:id       # Get single product
GET    /api/products/search    # Search products
GET    /api/products/category/:category # Get products by category
POST   /api/products           # Create product (admin)
PUT    /api/products/:id       # Update product (admin)
DELETE /api/products/:id       # Delete product (admin)
```

#### Cart Endpoints
```
GET    /api/cart              # Get user's cart
POST   /api/cart/items        # Add item to cart
PUT    /api/cart/items/:id    # Update cart item quantity
DELETE /api/cart/items/:id    # Remove item from cart
DELETE /api/cart              # Clear cart
POST   /api/cart/checkout     # Process checkout
```

#### Order Endpoints
```
GET    /api/orders            # Get user's orders
GET    /api/orders/:id        # Get single order
POST   /api/orders            # Create order
PUT    /api/orders/:id/status # Update order status (admin)
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Optional: Other configurations
REACT_APP_APP_NAME=Hood Shop
REACT_APP_VERSION=1.0.0
```

### Backend Integration Steps

1. **Update API Base URL**
   ```javascript
   // src/services/api.js
   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
     // ... other config
   });
   ```

2. **Replace Mock Data**
   - Remove mock data imports from `ProductContext.jsx`
   - Update `fetchProducts()` and `fetchProduct()` methods to use real API calls
   - Update authentication methods in `AuthContext.jsx`

3. **Configure CORS**
   Ensure your backend allows requests from your frontend domain:
   ```javascript
   // Example for Express.js
   app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
   }));
   ```

4. **JWT Token Handling**
   The app expects JWT tokens in the format:
   ```javascript
   {
     "token": "jwt_token_here",
     "user": {
       "id": "user_id",
       "email": "user@example.com",
       "name": "User Name"
     }
   }
   ```

### Database Schema Examples

#### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER,
  category VARCHAR(100),
  images JSON,
  sizes JSON,
  colors JSON,
  features JSON,
  rating DECIMAL(3,2),
  rating_count INTEGER,
  stock INTEGER,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Cart Items Table
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  selected_size VARCHAR(50),
  selected_color VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Customization

### Adding New Product Categories
1. Update the categories in `SearchAndFilter.jsx`
2. Add category data to your backend
3. Update the mock data if needed

### Styling Customization
- Modify CSS files in the `src/Css/` directory
- Use CSS custom properties for consistent theming
- The app uses a modern design system with consistent spacing and colors

### Adding New Features
- Create new components in `src/Components/`
- Add new pages in `src/Pages/`
- Extend context providers for new state management needs
- Update the routing in `App.jsx`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 🔒 Security Considerations

- All API calls include JWT token authentication
- Input validation on both frontend and backend
- CORS configuration for secure cross-origin requests
- Password hashing (implement on backend)
- Rate limiting (implement on backend)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Configure environment variables in Vercel dashboard

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

---

**Happy Shopping! 🛍️**
