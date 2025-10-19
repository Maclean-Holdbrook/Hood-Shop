import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import '../Css/FloatingCartButton.css';

const FloatingCartButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();

  // Don't show on cart or checkout pages
  const hideOnPages = ['/cart', '/checkout'];
  const shouldHide = hideOnPages.includes(location.pathname);

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {cartCount > 0 && !shouldHide && (
        <motion.button
          className="floating-cart-button"
          onClick={handleClick}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
        >
          <FaShoppingCart className="cart-icon" />
          <motion.span
            className="cart-badge"
            key={cartCount}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {cartCount}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCartButton;
