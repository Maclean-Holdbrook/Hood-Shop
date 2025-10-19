import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

// Cart reducer for state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
      };

    case 'UPDATE_QUANTITY':
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      if (!itemToUpdate) return state;

      const newQuantity = action.payload.quantity;
      if (newQuantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          total: state.total - (itemToUpdate.price * itemToUpdate.quantity),
        };
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: newQuantity }
            : item
        ),
        total: state.total + (itemToUpdate.price * (newQuantity - itemToUpdate.quantity)),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items || [],
        total: action.payload.total || 0,
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Get user-specific cart key
  const getCartKey = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return `cart_${user.id}`; // User-specific cart key
      } catch (error) {
        return 'cart'; // Fallback
      }
    }
    return 'cart'; // For logged out users
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const cartKey = getCartKey();
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    } else {
      // Clear cart if no saved cart for this user
      dispatch({ type: 'CLEAR_CART' });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
