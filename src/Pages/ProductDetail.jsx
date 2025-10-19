import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart, FaArrowLeft, FaShare, FaStar } from 'react-icons/fa';
import { useProducts } from '../Context/ProductContext';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import { useAuth } from '../Context/AuthContext';
import Loading from '../Components/Loading';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../Css/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProduct, loading, error, fetchProduct } = useProducts();
  const { addToCart, getItemQuantity, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
      // Fetch reviews from API
      fetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reviews/product/${id}`
      );
      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to localStorage for backward compatibility
      const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`) || '[]');
      setReviews(storedReviews);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('Product is out of stock');
      return;
    }

    if (!selectedSize && product?.sizes?.length > 0) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor && product?.colors?.length > 0) {
      toast.error('Please select a color');
      return;
    }

    if (quantity > maxQuantity) {
      toast.error(`Only ${maxQuantity} items available`);
      return;
    }

    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };

    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  const handleAddToWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to write a review');
      navigate('/signin', { state: { from: `/product/${id}/review` } });
      return;
    }
    navigate(`/product/${id}/review`);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <Loading size="large" message="Loading product..." />
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="product-detail-container">
        <div className="error-message">
          <h3>Product not found</h3>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="retry-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const product = selectedProduct;
  const cartQuantity = getItemQuantity(product.id);
  const isInCartProduct = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  // Check stock availability
  const stock = product.stock ?? product.stock_quantity ?? null;
  const isOutOfStock = stock !== null && stock <= 0;
  const maxQuantity = stock !== null ? stock : 999;

  return (
    <div className="product-detail-container">
      <motion.button
        className="back-button"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft />
        Back
      </motion.button>

      <div className="product-detail-content">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-actions-header">
              <button className="action-btn" onClick={handleShare} title="Share">
                <FaShare />
              </button>
              <button
                className={`action-btn ${inWishlist ? 'in-wishlist' : ''}`}
                onClick={handleAddToWishlist}
                title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FaHeart />
              </button>
            </div>
          </div>

          {product.rating && (
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.ratingCount || 0} reviews)
              </span>
            </div>
          )}

          <div className="product-price-section">
            <span className="current-price">
              ${typeof product.price === 'string' 
                ? product.price.replace('$', '') 
                : product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="original-price">
                ${typeof product.originalPrice === 'string' 
                  ? product.originalPrice.replace('$', '') 
                  : product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>

          {product.description && (
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          )}

          {/* Stock Information */}
          <div className="stock-status">
            {isOutOfStock ? (
              <span className="out-of-stock">Out of Stock</span>
            ) : stock !== null && stock <= 10 ? (
              <span className="low-stock">Only {stock} left in stock!</span>
            ) : stock !== null ? (
              <span className="in-stock">In Stock ({stock} available)</span>
            ) : (
              <span className="in-stock">In Stock</span>
            )}
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className="product-sizes">
              <h3>Size</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="product-colors">
              <h3>Available Colors: {product.colors.join(', ')}</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <label key={color} className="color-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="color-checkbox"
                    />
                    <span className="color-label">{color}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="product-quantity">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isOutOfStock}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= maxQuantity || isOutOfStock}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button
              className={`add-to-cart-btn ${isInCartProduct ? 'in-cart' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <FaShoppingCart />
              {isOutOfStock
                ? 'Out of Stock'
                : isInCartProduct
                ? `In Cart (${cartQuantity})`
                : 'Add to Cart'
              }
            </button>
          </div>

          {product.features && (
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="product-reviews-section">
        <h2>Customer Reviews</h2>

        <div className="reviews-summary">
          <div className="average-rating">
            <div className="rating-number">{product.rating || 0}</div>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`star ${i < Math.floor(product.rating || 0) ? 'filled' : ''}`}
                />
              ))}
            </div>
            <div className="review-count">Based on {reviews.length} reviews</div>
          </div>
        </div>

        <div className="review-action-section">
          <button onClick={handleWriteReview} className="write-review-btn">
            Write a Review
          </button>
        </div>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{review.users?.name || review.name || 'Anonymous'}</span>
                    <span className="review-date">
                      {new Date(review.created_at || review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`star ${i < review.rating ? 'filled' : ''}`}
                      />
                    ))}
                  </div>
                </div>
                {review.title && <h4 className="review-title">{review.title}</h4>}
                <p className="review-comment">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
