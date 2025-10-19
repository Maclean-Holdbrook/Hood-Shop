import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../Context/AuthContext";
import Loading from "../Components/Loading";
import "../Css/AuthForm.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login, googleLogin, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from query params or state
  const returnUrl = new URLSearchParams(location.search).get('returnUrl') || location.state?.from || '/';

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, returnUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate(returnUrl, { replace: true });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const result = await googleLogin(credentialResponse.credential);
    if (result.success) {
      navigate(returnUrl, { replace: true });
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  if (loading) {
    return (
      <div className="auth-form-container">
        <Loading size="large" message="Signing in..." />
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error" : ""}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          Sign In
        </button>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="signin_with"
            width="100%"
          />
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;