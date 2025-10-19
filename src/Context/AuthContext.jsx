import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { authAPI } from '../services/api';

const AuthContext = createContext();

// Auth reducer for state management
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing auth token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const result = await authAPI.login({ email, password });

      if (!result.success) {
        throw new Error(result.error);
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
      toast.success('Login successful!');

      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  const register = async ({ name, email, password }) => {
    dispatch({ type: 'REGISTER_START' });

    try {
      const result = await authAPI.register({ name, email, password });

      if (!result.success) {
        throw new Error(result.error);
      }

      dispatch({ type: 'REGISTER_SUCCESS', payload: result.user });
      toast.success('Registration successful!');

      return { success: true };
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
      toast.error(error.message || 'Registration failed');
      return { success: false, error: error.message };
    }
  };

  const googleLogin = async (credential) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const result = await authAPI.googleLogin(credential);

      if (!result.success) {
        throw new Error(result.error);
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
      toast.success('Successfully signed in with Google!');

      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      toast.error(error.message || 'Google sign-in failed');
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('cart'); // Clear cart on logout
    localStorage.removeItem('wishlist'); // Clear wishlist on logout
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const value = {
    ...state,
    login,
    register,
    googleLogin,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
