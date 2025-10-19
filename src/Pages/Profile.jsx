import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import "../Css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "United States",
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      country: user?.country || "United States",
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    // In a real app, you would make an API call to update the user profile
    // For now, we'll just update localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="profile-container">
      <motion.div
        className="profile-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser size={40} />
          </div>
          <div className="profile-header-info">
            <h1>{user?.name || "User"}</h1>
            <p>{user?.email}</p>
          </div>
          {!isEditing && (
            <button className="edit-btn" onClick={handleEdit}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-form">
              <div className="form-group">
                <label>
                  <FaUser /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{formData.name || "Not provided"}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope /> Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{formData.email || "Not provided"}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 555-5555"
                  />
                ) : (
                  <p>{formData.phone || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>
              <FaMapMarkerAlt /> Shipping Address
            </h2>
            <div className="profile-form">
              <div className="form-group">
                <label>Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                  />
                ) : (
                  <p>{formData.address || "Not provided"}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.city || "Not provided"}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.state || "Not provided"}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>ZIP Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.zipCode || "Not provided"}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{formData.country || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="profile-actions">
              <button className="save-btn" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
            </div>
          )}

          <div className="profile-section">
            <h2>Account Actions</h2>
            <div className="account-actions">
              <button className="action-btn orders-btn" onClick={() => navigate("/orders")}>
                View Order History
              </button>
              <button className="action-btn wishlist-btn" onClick={() => navigate("/wishlist")}>
                View Wishlist
              </button>
              <button className="action-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
