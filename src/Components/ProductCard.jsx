
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';
import '../Css/ProductCard.css';

const ProductCard = ({ product, showQuickActions = true }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  // Check stock availability
  const stock = product.stock ?? product.stock_quantity ?? null;
  const isOutOfStock = stock !== null && stock <= 0;

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Format price - handle both string and number formats
  const formatPrice = (price) => {
    if (!price) return '$0.00';
    if (typeof price === 'string') {
      // If already formatted with $, return as is
      if (price.startsWith('$')) return price;
      // Otherwise add $ prefix
      return `$${price}`;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/400x400.png?text=Product'}
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x400.png?text=Product';
            }}
          />
          {isOutOfStock && (
            <div className="product-out-of-stock-badge">Out of Stock</div>
          )}
          {!isOutOfStock && product.discount && (
            <div className="product-discount">
              -{product.discount}%
            </div>
          )}
          {!isOutOfStock && (product.isNew || product.is_new) && (
            <div className="product-new-badge">New</div>
          )}
          {!isOutOfStock && stock !== null && stock <= 10 && stock > 0 && (
            <div className="product-low-stock-badge">Only {stock} left</div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {product.description && (
            <p className="product-description">{product.description}</p>
          )}
          <div className="product-price-container">
            {(product.originalPrice || product.original_price) && (
              <span className="product-original-price">
                {formatPrice(product.originalPrice || product.original_price)}
              </span>
            )}
            <span className="product-price">{formatPrice(product.price)}</span>
          </div>
          
          {product.rating && (
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < Math.floor(parseFloat(product.rating)) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
              <span className="rating-count">({product.rating_count || product.ratingCount || 0})</span>
            </div>
          )}
        </div>
      </Link>

      {showQuickActions && (
        <div className="product-actions">
          <div className="quick-actions">
            <button
              className={`action-btn quick-action-btn ${inWishlist ? 'in-wishlist' : ''}`}
              onClick={handleAddToWishlist}
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              style={inWishlist ? { color: '#dc3545' } : {}}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
