import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increased to 30 seconds
  withCredentials: true, // Enable credentials for CORS
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      // Only redirect if not on auth pages
      if (!window.location.pathname.includes('/signin') && !window.location.pathname.includes('/signup')) {
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      return { success: true, user, token };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data?.error || 'Registration failed'
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/signin', credentials);
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      return { success: true, user, token };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data?.error || 'Login failed'
      };
    }
  },

  // Google OAuth login
  googleLogin: async (credential) => {
    try {
      const response = await api.post('/auth/google', { credential });
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      return { success: true, user, token };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.response?.data?.error || 'Google login failed'
      };
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/me');
      return { success: true, user: response.data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get profile'
      };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      const { user } = response.data;

      // Update stored user data
      localStorage.setItem('userData', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile'
      };
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/password', passwordData);
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to change password'
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
  }
};

// Products API
export const productsAPI = {
  // Get all products
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch products'
      };
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch product'
      };
    }
  },

  // Get products by category
  getProductsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/products/category/${category}`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch products by category'
      };
    }
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    try {
      const response = await api.get(`/products/search/${encodeURIComponent(query)}`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search products'
      };
    }
  },

  // Get new products
  getNewProducts: async (limit = 8) => {
    try {
      const response = await api.get(`/products/featured/new?limit=${limit}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch new products'
      };
    }
  },

  // Get bestseller products
  getBestsellerProducts: async (limit = 8) => {
    try {
      const response = await api.get(`/products/featured/bestsellers?limit=${limit}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch bestseller products'
      };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await api.get('/products/meta/categories');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch categories'
      };
    }
  }
};

// Cart API
export const cartAPI = {
  // Get cart
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch cart'
      };
    }
  },

  // Add item to cart
  addToCart: async (itemData) => {
    try {
      const response = await api.post('/cart/add', itemData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to add item to cart'
      };
    }
  },

  // Update cart item
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/item/${itemId}`, { quantity });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update cart item'
      };
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/item/${itemId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove item from cart'
      };
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/cart/clear');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to clear cart'
      };
    }
  },

  // Get cart count
  getCartCount: async () => {
    try {
      const response = await api.get('/cart/count');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get cart count'
      };
    }
  }
};

// Users API
export const usersAPI = {
  // Get user stats
  getUserStats: async () => {
    try {
      const response = await api.get('/users/stats');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch user stats'
      };
    }
  },

  // Get user orders
  getUserOrders: async (params = {}) => {
    try {
      const response = await api.get('/users/orders', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch orders'
      };
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/users/orders/${orderId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch order details'
      };
    }
  }
};

export default api;
