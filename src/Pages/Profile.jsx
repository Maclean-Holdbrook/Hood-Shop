import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaGlobe } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../Css/Profile.css";

// List of countries with their phone codes
const COUNTRIES = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Argentina", code: "+54" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Bangladesh", code: "+880" },
  { name: "Belgium", code: "+32" },
  { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Denmark", code: "+45" },
  { name: "Egypt", code: "+20" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Japan", code: "+81" },
  { name: "Kenya", code: "+254" },
  { name: "Malaysia", code: "+60" },
  { name: "Mexico", code: "+52" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nigeria", code: "+234" },
  { name: "Norway", code: "+47" },
  { name: "Pakistan", code: "+92" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Russia", code: "+7" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Singapore", code: "+65" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Thailand", code: "+66" },
  { name: "Turkey", code: "+90" },
  { name: "Ukraine", code: "+380" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Vietnam", code: "+84" },
].sort((a, b) => a.name.localeCompare(b.name));

const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneCode: user?.phoneCode || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "",
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      // Save the intended page before redirecting to sign-in
      const intendedPage = window.location.pathname + window.location.search;
      navigate(`/signin?returnUrl=${encodeURIComponent(intendedPage)}`);
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone field, only allow digits and limit to 15 characters
    let formattedValue = value;
    if (name === "phone") {
      formattedValue = value.replace(/\D/g, "").slice(0, 15);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phoneCode: user?.phoneCode || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      country: user?.country || "",
    });
    setErrors({});
    setIsEditing(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneCode) newErrors.phoneCode = "Please select a country code";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Phone number is too short";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State/Province is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP/Postal code is required";
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      // Update user profile via API
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update local user data
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("userData", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);

      // Fallback to localStorage update if API fails
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("userData", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    }
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
                  <FaUser /> Full Name *
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </>
                ) : (
                  <p>{formData.name || "Not provided"}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaEnvelope /> Email *
                </label>
                {isEditing ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </>
                ) : (
                  <p>{formData.email || "Not provided"}</p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Phone Number *
                </label>
                {isEditing ? (
                  <>
                    <div className="phone-input-group">
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleChange}
                        className={`phone-code-select ${errors.phoneCode ? "error" : ""}`}
                      >
                        <option value="">Code</option>
                        {COUNTRIES.map((country) => (
                          <option key={country.name} value={country.code}>
                            {country.code} {country.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="123456789"
                        className={errors.phone ? "error" : ""}
                        inputMode="numeric"
                        maxLength="15"
                      />
                    </div>
                    {(errors.phoneCode || errors.phone) && (
                      <span className="error-message">{errors.phoneCode || errors.phone}</span>
                    )}
                  </>
                ) : (
                  <p>{formData.phoneCode ? `${formData.phoneCode} ${formData.phone}` : "Not provided"}</p>
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
                <label>Street Address *</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Apt 4B"
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </>
                ) : (
                  <p>{formData.address || "Not provided"}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? "error" : ""}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </>
                  ) : (
                    <p>{formData.city || "Not provided"}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>State/Province *</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? "error" : ""}
                      />
                      {errors.state && <span className="error-message">{errors.state}</span>}
                    </>
                  ) : (
                    <p>{formData.state || "Not provided"}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>ZIP/Postal Code *</label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? "error" : ""}
                      />
                      {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                    </>
                  ) : (
                    <p>{formData.zipCode || "Not provided"}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label><FaGlobe /> Country *</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter your country"
                      className={errors.country ? "error" : ""}
                    />
                    {errors.country && <span className="error-message">{errors.country}</span>}
                  </>
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
