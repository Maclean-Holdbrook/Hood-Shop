import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { productsAPI } from '../services/api';

const ProductContext = createContext();

// Product reducer for state management
const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
    case 'FETCH_PRODUCT_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        selectedProduct: action.payload,
        error: null,
      };
    case 'FETCH_PRODUCT_FAILURE':
      return {
        ...state,
        loading: false,
        selectedProduct: null,
        error: action.payload,
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'CLEAR_FILTERS':
      return { 
        ...state, 
        filters: { category: '', priceRange: '', sortBy: '' },
        searchTerm: ''
      };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    category: '',
    priceRange: '',
    sortBy: '',
  },
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Fetch all products
  const fetchProducts = async () => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });

    try {
      // Request products with a reasonable limit
      const result = await productsAPI.getProducts({ limit: 100 });

      if (!result.success) {
        throw new Error(result.error);
      }

      // Backend returns { products, pagination }
      const products = result.data.products || result.data;
      console.log('✅ Products loaded successfully:', products.length, 'products');
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
    } catch (error) {
      console.error('❌ Failed to load products from backend:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        code: error.code
      });

      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch products';
      dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: errorMessage });

      // Show error toast
      toast.error(`Failed to load products: ${errorMessage}`);
    }
  };

  // Fetch single product by ID
  const fetchProduct = async (id) => {
    dispatch({ type: 'FETCH_PRODUCT_START' });

    try {
      const result = await productsAPI.getProduct(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      const product = result.data.product || result.data;
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: product });
    } catch (error) {
      console.error('Failed to load product from backend:', error.message);
      dispatch({ type: 'FETCH_PRODUCT_FAILURE', payload: error.message });
      toast.error('Product not found');
    }
  };

  // Search products
  const searchProducts = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  // Apply filters
  const applyFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  // Clear all filters
  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  // Get filtered and searched products
  const getFilteredProducts = () => {
    let filteredProducts = [...state.products];

    // Apply search filter
    if (state.searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (state.filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === state.filters.category
      );
    }

    // Apply price range filter
    if (state.filters.priceRange) {
      const [min, max] = state.filters.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(product => {
        const price = typeof product.price === 'string' 
          ? parseFloat(product.price.replace('$', '')) 
          : product.price;
        return price >= min && (max ? price <= max : true);
      });
    }

    // Apply sorting
    if (state.filters.sortBy) {
      filteredProducts.sort((a, b) => {
        const priceA = typeof a.price === 'string' 
          ? parseFloat(a.price.replace('$', '')) 
          : a.price;
        const priceB = typeof b.price === 'string' 
          ? parseFloat(b.price.replace('$', '')) 
          : b.price;

        switch (state.filters.sortBy) {
          case 'price-low':
            return priceA - priceB;
          case 'price-high':
            return priceB - priceA;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }

    return filteredProducts;
  };

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    ...state,
    fetchProducts,
    fetchProduct,
    searchProducts,
    applyFilters,
    clearFilters,
    getFilteredProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
