import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../Components/ConfirmationModal";
import "../Css/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, getCartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const cartCount = getCartItemsCount();

  const [removeModal, setRemoveModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [clearModal, setClearModal] = useState(false);

  // Calculate total from items
  const cartTotal = items.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'string'
      ? parseFloat(item.price.replace('$', ''))
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const handleQuantityChange = (item, newQuantity) => {
    // Use cartItemKey if available, otherwise use id
    const itemId = item.cartItemKey || item.id;
    updateQuantity(itemId, newQuantity);
  };

  const openRemoveModal = (item, productName) => {
    // Use cartItemKey if available, otherwise use id
    const itemId = item.cartItemKey || item.id;
    setRemoveModal({ isOpen: true, productId: itemId, productName });
  };

  const handleRemoveItem = () => {
    removeFromCart(removeModal.productId);
    toast.success(`${removeModal.productName} removed from cart`);
    setRemoveModal({ isOpen: false, productId: null, productName: '' });
  };

  const openClearModal = () => {
    setClearModal(true);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared successfully');
    setClearModal(false);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to proceed with checkout");
      // Redirect to signin with return URL to come back to checkout
      navigate("/signin?returnUrl=/checkout");
      return;
    }
    navigate("/checkout");
  };

  if (cartCount === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaShoppingBag size={80} color="#6c757d" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-summary">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <motion.div
              key={item.cartItemKey || item.id}
              className="cart-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="item-image">
                <img
                  src={item.images?.[0] || item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/80';
                  }}
                />
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                {item.selectedSize && (
                  <p className="item-variant">Size: {item.selectedSize}</p>
                )}
                {item.selectedColor && (
                  <p className="item-variant">Color: {item.selectedColor}</p>
                )}
                <p className="item-price">
                  ${typeof item.price === 'string'
                    ? item.price.replace('$', '')
                    : item.price.toFixed(2)}
                </p>

                <div className="item-quantity-mobile">
                  <label>Qty:</label>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <button
                  className="remove-item-btn-mobile"
                  onClick={() => openRemoveModal(item, item.name)}
                >
                  <FaTrash /> Remove
                </button>
              </div>

              <div className="item-total">
                <p className="item-total-price">
                  ${((typeof item.price === 'string'
                    ? parseFloat(item.price.replace('$', ''))
                    : item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="cart-summary-panel">
          <div className="summary-content">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="summary-row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
            </button>

            <button
              className="clear-cart-btn"
              onClick={openClearModal}
            >
              Clear Cart
            </button>

            <Link to="/" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Remove Item Confirmation Modal */}
      <ConfirmationModal
        isOpen={removeModal.isOpen}
        onClose={() => setRemoveModal({ isOpen: false, productId: null, productName: '' })}
        onConfirm={handleRemoveItem}
        title="Remove Item"
        message={`Are you sure you want to remove "${removeModal.productName}" from your cart?`}
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />

      {/* Clear Cart Confirmation Modal */}
      <ConfirmationModal
        isOpen={clearModal}
        onClose={() => setClearModal(false)}
        onConfirm={handleClearCart}
        title="Clear Cart"
        message={`Are you sure you want to clear all ${cartCount} item${cartCount === 1 ? '' : 's'} from your cart? This action cannot be undone.`}
        confirmText="Clear All"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Cart;