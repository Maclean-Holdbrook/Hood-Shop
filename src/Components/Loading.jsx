import React from 'react';
import { motion } from 'framer-motion';
import '../Css/Loading.css';

const Loading = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <motion.div
        className={`loading-spinner ${size}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="spinner-ring"></div>
      </motion.div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
