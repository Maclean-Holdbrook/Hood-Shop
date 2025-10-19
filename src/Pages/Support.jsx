import React, { useState } from "react";
import "../Css/Support.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/support/send-message",
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-container">
      <div className="support-header">
        <h1>Customer Support</h1>
        <p className="support-subtitle">We're here to help you</p>
      </div>

      <div className="support-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have a question or need assistance? Reach out to us through any of these channels.</p>

          <div className="contact-methods">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <p>support@hoodshop.com</p>
            </div>

            <div className="contact-card">
              <FaPhone className="contact-icon" />
              <h3>Phone</h3>
              <p>+ (233) 20-928-7952</p>
            </div>

            <div className="contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <h3>Address</h3>
              <p>123 Shopping Street<br />New York, NY 10001</p>
            </div>
          </div>

          <div className="faq-section">
            <h3><FaQuestionCircle /> Frequently Asked Questions</h3>
            <div className="faq-item">
              <h4>How do I track my order?</h4>
              <p>You can track your order by logging into your account and visiting the Orders page.</p>
            </div>
            <div className="faq-item">
              <h4>What is your return policy?</h4>
              <p>We offer a 30-day return policy for all unused items in their original packaging.</p>
            </div>
            <div className="faq-item">
              <h4>How long does shipping take?</h4>
              <p>Standard shipping takes 5-7 business days. Express shipping is available for 2-3 days delivery.</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="support-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
