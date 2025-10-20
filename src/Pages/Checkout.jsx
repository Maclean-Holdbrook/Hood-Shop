import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaCreditCard, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../Css/Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, getCartItemsCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });

  const [errors, setErrors] = useState({});

  // Calculate total from items
  const cartTotal = items.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'string'
      ? parseFloat(item.price.replace('$', ''))
      : item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const shippingCost = 0; // Free shipping
  const tax = cartTotal * 0.08; // 8% tax
  const orderTotal = cartTotal + shippingCost + tax;

  // Auto-fill shipping info from user profile
  React.useEffect(() => {
    if (user) {
      setShippingInfo({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        zipCode: user.zipCode || "",
        country: user.country || "United States",
      });
    }
  }, [user]);

  // Redirect if not authenticated or cart is empty
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to checkout");
      navigate("/signin?returnUrl=/checkout");
    }
    if (getCartItemsCount() === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
    }
  }, [isAuthenticated, getCartItemsCount, navigate]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;

    let formattedValue = value;

    // Format card number
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      formattedValue = formattedValue.slice(0, 19); // Max 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }
      formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setPaymentInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};

    if (!shippingInfo.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shippingInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.state.trim()) newErrors.state = "State is required";
    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}$/.test(shippingInfo.zipCode)) {
      newErrors.zipCode = "ZIP code must be 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};

    const cardNum = paymentInfo.cardNumber.replace(/\s/g, "");
    if (!cardNum) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNum.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!paymentInfo.cardName.trim()) newErrors.cardName = "Cardholder name is required";

    if (!paymentInfo.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else {
      const [month, year] = paymentInfo.expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!month || !year || parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = "Invalid expiry date";
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    if (!paymentInfo.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (paymentInfo.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Please sign in to place order");
        navigate("/signin?returnUrl=/checkout");
        return;
      }

      // Prepare order data
      const orderData = {
        items: items,
        shipping_address: {
          fullName: shippingInfo.fullName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
        payment_method: 'card',
        subtotal: cartTotal,
        shipping_cost: shippingCost,
        tax: tax,
        total_amount: orderTotal,
      };

      // Send order to backend API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.order) {
        const orderNumber = response.data.order.order_number;

        clearCart();
        toast.success("Order placed successfully!");

        // Navigate to track order page with order details
        navigate(`/track-order?orderNumber=${orderNumber}&email=${shippingInfo.email}`);
      }
    } catch (error) {
      console.error("Order placement error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please sign in again.");
        navigate("/signin");
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || getCartItemsCount() === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>
            <span className="step-number">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-forms">
          {step === 1 && (
            <motion.div
              className="form-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Shipping Information</h2>
              <form className="checkout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      className={errors.fullName ? "error" : ""}
                    />
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className={errors.phone ? "error" : ""}
                      placeholder="(555) 555-5555"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className={errors.address ? "error" : ""}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className={errors.state ? "error" : ""}
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="zipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className={errors.zipCode ? "error" : ""}
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>
                </div>

                <button type="button" className="next-btn" onClick={handleNextStep}>
                  Continue to Payment
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              className="form-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2><FaCreditCard /> Payment Information</h2>
              <form className="checkout-form">
                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      className={errors.cardNumber ? "error" : ""}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label htmlFor="cardName">Cardholder Name *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentChange}
                      className={errors.cardName ? "error" : ""}
                    />
                    {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentChange}
                      className={errors.expiryDate ? "error" : ""}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      className={errors.cvv ? "error" : ""}
                      placeholder="123"
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onChange={handlePaymentChange}
                      />
                      Save card for future purchases
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="back-btn" onClick={() => setStep(1)}>
                    Back to Shipping
                  </button>
                  <button type="button" className="next-btn" onClick={handleNextStep}>
                    Review Order
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              className="form-section"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Review Your Order</h2>

              <div className="review-section">
                <h3>Shipping Address</h3>
                <p>{shippingInfo.fullName}</p>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p>{shippingInfo.country}</p>
                <p>{shippingInfo.email}</p>
                <p>{shippingInfo.phone}</p>
                <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
              </div>

              <div className="review-section">
                <h3>Payment Method</h3>
                <p><FaCreditCard /> Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                <p>{paymentInfo.cardName}</p>
                <button className="edit-btn" onClick={() => setStep(2)}>Edit</button>
              </div>

              <div className="review-section">
                <h3>Order Items</h3>
                {items.map((item) => (
                  <div key={item.id} className="review-item">
                    <img src={item.image || item.images?.[0]} alt={item.name} />
                    <div className="review-item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">Quantity: {item.quantity}</p>
                    </div>
                    <p className="item-price">
                      ${(typeof item.price === "string"
                        ? parseFloat(item.price.replace("$", ""))
                        : item.price) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => setStep(2)}>
                  Back to Payment
                </button>
                <button
                  type="button"
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  <FaLock /> {loading ? "Processing..." : `Place Order - $${orderTotal.toFixed(2)}`}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
