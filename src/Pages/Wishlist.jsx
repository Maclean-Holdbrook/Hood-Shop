import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import "../Css/Wishlist.css";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const wishlistCount = getWishlistCount();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  if (wishlistCount === 0) {
    return (
      <div className="wishlist-container">
        <div className="empty-wishlist">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaHeart size={80} color="#6c757d" />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love to your wishlist and shop them later.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <div className="wishlist-actions">
          <p className="wishlist-count">{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}</p>
          {wishlistCount > 0 && (
            <button className="clear-wishlist-btn" onClick={handleClearWishlist}>
              Clear Wishlist
            </button>
          )}
        </div>
      </div>

      <div className="wishlist-grid">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="wishlist-item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="item-image-container">
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image || item.images?.[0] || '/placeholder-product.jpg'}
                  alt={item.name}
                  className="item-image"
                />
              </Link>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
                title="Remove from wishlist"
              >
                <FaTrash />
              </button>
              {item.discount && (
                <span className="discount-badge">-{item.discount}%</span>
              )}
            </div>

            <div className="item-details">
              <Link to={`/product/${item.id}`} className="item-name">
                {item.name}
              </Link>

              {item.description && (
                <p className="item-description">{item.description.slice(0, 80)}...</p>
              )}

              <div className="item-rating">
                {item.rating && (
                  <>
                    <span className="stars">{'★'.repeat(Math.floor(item.rating))}</span>
                    <span className="rating-text">({item.ratingCount})</span>
                  </>
                )}
              </div>

              <div className="item-price-section">
                <div className="price-info">
                  <span className="current-price">
                    ${typeof item.price === 'string'
                      ? item.price.replace('$', '')
                      : item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="original-price">
                      ${typeof item.originalPrice === 'string'
                        ? item.originalPrice.replace('$', '')
                        : item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {item.stock && item.stock < 10 && (
                <p className="stock-warning">Only {item.stock} left in stock!</p>
              )}

              <button
                className={`add-to-cart-btn ${isInCart(item.id) ? 'in-cart' : ''}`}
                onClick={() => handleAddToCart(item)}
              >
                <FaShoppingCart />
                {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
