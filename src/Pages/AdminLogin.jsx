import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import '../Css/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/login`,
        formData
      );

      if (response.data.token) {
        // Store admin token and data
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));

        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <div className="admin-logo">
            <FaLock size={40} />
          </div>
          <h1>Admin Login</h1>
          <p>Hood Shop Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@hoodshop.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Authorized access only</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="back-to-site-btn"
          >
            Back to Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
