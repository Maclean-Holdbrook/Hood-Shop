import React from "react";
import "../Css/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Hood Shop</h1>
        <p className="about-subtitle">Your trusted destination for quality products</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for bringing quality products to our customers,
            Hood Shop has grown to become a trusted name in online retail. We believe
            in providing exceptional value and outstanding customer service with every
            purchase. Our journey began with a simple vision: to create an e-commerce
            platform that prioritizes customer satisfaction above all else. Over the years,
            we have built a reputation for reliability, quality, and innovation in the
            online shopping space. Every product we offer is carefully selected to meet
            the diverse needs of our valued customers, ensuring that you always get the
            best shopping experience possible.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make online shopping easy, enjoyable, and accessible to
            everyone. We carefully curate our product selection to ensure that every
            item meets our high standards of quality and value. We are committed to
            providing a seamless shopping experience from browsing to checkout, backed
            by excellent customer support. Our goal is to become your go-to destination
            for all your shopping needs, offering competitive prices without compromising
            on quality. We continuously improve our platform and services to exceed your
            expectations and make every shopping experience memorable and satisfying.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Quality Products</h3>
              <p>We only offer products that meet our rigorous quality standards. Every item in our catalog undergoes thorough inspection and testing to ensure it delivers exceptional value and performance. Your satisfaction is our guarantee.</p>
            </div>
            <div className="feature-card">
              <h3>Fast Shipping</h3>
              <p>Quick and reliable delivery to your doorstep. We partner with trusted shipping providers to ensure your orders arrive on time and in perfect condition. Track your package every step of the way for complete peace of mind.</p>
            </div>
            <div className="feature-card">
              <h3>Secure Shopping</h3>
              <p>Your data and transactions are always protected with industry-leading security measures. We use advanced encryption technology to safeguard your personal information and ensure every transaction is completely secure and confidential.</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Our customer service team is always here to help you with any questions or concerns. Whether you need assistance with an order or product information, we're available around the clock to provide prompt and friendly support.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li>Customer satisfaction is our top priority</li>
            <li>Integrity and transparency in all our dealings</li>
            <li>Continuous improvement and innovation</li>
            <li>Building lasting relationships with our customers</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
