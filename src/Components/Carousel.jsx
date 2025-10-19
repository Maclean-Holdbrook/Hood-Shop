import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../Css/Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
      title: 'Summer Collection 2024',
      subtitle: 'Discover the latest trends',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200',
      title: 'Premium Quality Products',
      subtitle: 'Best prices guaranteed',
      buttonText: 'Explore'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200',
      title: 'Tech & Gadgets',
      subtitle: 'Latest electronics and accessories',
      buttonText: 'View Collection'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="carousel-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <div className="carousel-content">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="carousel-title"
                >
                  {slides[currentIndex].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="carousel-subtitle"
                >
                  {slides[currentIndex].subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="carousel-nav prev" onClick={goToPrevious}>
          <FaChevronLeft />
        </button>
        <button className="carousel-nav next" onClick={goToNext}>
          <FaChevronRight />
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
