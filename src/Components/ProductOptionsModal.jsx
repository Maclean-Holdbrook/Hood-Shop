import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import '../Css/ProductOptionsModal.css';

const ProductOptionsModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});

  // Get available sizes and colors from product
  const sizes = product?.sizes || product?.available_sizes || ['S', 'M', 'L', 'XL'];
  const colors = product?.colors || product?.available_colors || [];

  // Check stock availability
  const stock = product?.stock ?? product?.stock_quantity ?? null;
  const isOutOfStock = stock !== null && stock <= 0;
  const maxQuantity = stock !== null ? stock : 999;

  const handleAddToCart = () => {
    const newErrors = {};

    // Check if out of stock
    if (isOutOfStock) {
      newErrors.stock = 'Product is out of stock';
      setErrors(newErrors);
      return;
    }

    // Only validate if options are actually available
    const hasSizes = product?.sizes?.length > 0 || product?.available_sizes?.length > 0;
    const hasColors = product?.colors?.length > 0 || product?.available_colors?.length > 0;

    // Validate selections only if options exist
    if (hasSizes && !selectedSize) {
      newErrors.size = 'Please select a size';
    }
    if (hasColors && !selectedColor) {
      newErrors.color = 'Please select a color';
    }

    // Validate quantity
    if (quantity > maxQuantity) {
      newErrors.quantity = `Only ${maxQuantity} items available`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add to cart with selections
    onAddToCart({
      ...product,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      quantity: quantity
    });

    // Reset and close
    handleClose();
  };

  const handleClose = () => {
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setErrors({});
    onClose();
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Restore body scroll
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!product) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="product-options-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={handleClose}>
              <FaTimes />
            </button>

            <div className="modal-content">
              <div className="modal-product-info">
                <img
                  src={product.images?.[0] || product.image || 'https://via.placeholder.com/100'}
                  alt={product.name}
                  className="modal-product-image"
                />
                <div className="modal-product-details">
                  <h3>{product.name}</h3>
                  <p className="modal-product-price">
                    ${typeof product.price === 'string'
                      ? product.price.replace('$', '')
                      : product.price?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="option-group">
                  <label className="option-label">
                    Size <span className="required">*</span>
                  </label>
                  <div className="size-options">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedSize(size);
                          setErrors({ ...errors, size: '' });
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {errors.size && <span className="error-text">{errors.size}</span>}
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div className="option-group">
                  <label className="option-label">
                    Color <span className="required">*</span>
                  </label>
                  <div className="color-options">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedColor(color);
                          setErrors({ ...errors, color: '' });
                        }}
                        title={color}
                      >
                        <span className="color-name">{color}</span>
                      </button>
                    ))}
                  </div>
                  {errors.color && <span className="error-text">{errors.color}</span>}
                </div>
              )}

              {/* Stock Info */}
              {!isOutOfStock && stock !== null && (
                <div className="stock-info">
                  {stock <= 10 ? (
                    <span className="low-stock">Only {stock} left in stock!</span>
                  ) : (
                    <span className="in-stock">In stock ({stock} available)</span>
                  )}
                </div>
              )}

              {isOutOfStock && (
                <div className="stock-info">
                  <span className="out-of-stock-text">Out of Stock</span>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="option-group">
                <label className="option-label">Quantity</label>
                <div className="quantity-selector">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity || isOutOfStock}
                  >
                    +
                  </button>
                </div>
                {errors.quantity && <span className="error-text">{errors.quantity}</span>}
              </div>

              {/* Add to Cart Button */}
              <button
                className="modal-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                <FaShoppingCart />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Render modal at the root level using portal
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default ProductOptionsModal;
