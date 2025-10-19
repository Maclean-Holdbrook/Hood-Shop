import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { useProducts } from '../Context/ProductContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../Css/WriteReview.css';

const WriteReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { selectedProduct, fetchProduct } = useProducts();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please sign in to write a review');
      navigate('/signin', { state: { from: `/product/${id}/review` } });
      return;
    }

    if (id) {
      fetchProduct(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error('Please write a review comment');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/reviews`,
        {
          product_id: id,
          rating,
          title: title.trim() || null,
          comment: comment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        toast.success('Review submitted successfully!');
        navigate(`/product/${id}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      const errorMessage = error.response?.data?.error || 'Failed to submit review';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="write-review-container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="write-review-container">
      <motion.button
        className="back-button"
        onClick={() => navigate(`/product/${id}`)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft />
        Back to Product
      </motion.button>

      <div className="write-review-content">
        <div className="product-summary">
          <img
            src={selectedProduct.images?.[0] || selectedProduct.image}
            alt={selectedProduct.name}
            className="product-image"
          />
          <div className="product-info">
            <h3>{selectedProduct.name}</h3>
            <p className="product-price">
              ${typeof selectedProduct.price === 'string'
                ? selectedProduct.price.replace('$', '')
                : selectedProduct.price.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="review-form-container">
          <h1>Write a Review</h1>
          <p className="review-subtitle">Share your thoughts about this product</p>

          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="rating">Rating *</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <FaStar />
                  </button>
                ))}
                <span className="rating-text">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="title">Review Title (Optional)</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience (e.g., Great quality!)"
                maxLength="255"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review *</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience with this product. What did you like or dislike?"
                rows="6"
                required
              />
              <span className="char-count">{comment.length} characters</span>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate(`/product/${id}`)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting || !comment.trim()}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
