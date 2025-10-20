import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBox, FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import "../Css/Orders.css";

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      // Save the intended page before redirecting to sign-in
      const intendedPage = window.location.pathname + window.location.search;
      navigate(`/signin?returnUrl=${encodeURIComponent(intendedPage)}`);
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        // Save the intended page before redirecting to sign-in
        const intendedPage = window.location.pathname + window.location.search;
        navigate(`/signin?returnUrl=${encodeURIComponent(intendedPage)}`);
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please sign in again.");
        // Save the intended page before redirecting to sign-in
        const intendedPage = window.location.pathname + window.location.search;
        navigate(`/signin?returnUrl=${encodeURIComponent(intendedPage)}`);
      } else {
        toast.error("Failed to load orders");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaBox />;
      case "processing":
        return <FaBox />;
      case "shipped":
        return <FaTruck />;
      case "delivered":
        return <FaCheckCircle />;
      case "cancelled":
        return <FaBox />;
      default:
        return <FaBox />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "processing":
        return "#3b82f6";
      case "shipped":
        return "#8b5cf6";
      case "delivered":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6c757d";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="orders-container">
        <div className="empty-orders">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="empty-orders">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaShoppingBag size={80} color="#6c757d" />
            <h2>No orders yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Link to="/" className="shop-now-btn">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p className="orders-count">{orders.length} {orders.length === 1 ? "order" : "orders"}</p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            className={`order-card ${selectedOrder?.id === order.id ? "expanded" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="order-summary" onClick={() => handleOrderClick(order)}>
              <div className="order-header-info">
                <div className="order-number">
                  <span className="label">Order #</span>
                  <span className="value">{order.order_number || order.id}</span>
                </div>
                <div className="order-date">
                  <span className="label">Placed on</span>
                  <span className="value">{formatDate(order.created_at || order.createdAt)}</span>
                </div>
                <div className="order-total">
                  <span className="label">Total</span>
                  <span className="value">${parseFloat(order.total_amount || order.total).toFixed(2)}</span>
                </div>
              </div>

              <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                {getStatusIcon(order.status)}
                <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
              </div>
            </div>

            {selectedOrder?.id === order.id && (
              <motion.div
                className="order-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="order-items">
                  <h3>Items</h3>
                  {(order.order_items || order.items || []).map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.products?.images?.[0] || item.image || item.images?.[0]} alt={item.product_name || item.name} />
                      <div className="item-info">
                        <p className="item-name">{item.product_name || item.name}</p>
                        <p className="item-quantity">Quantity: {item.quantity}</p>
                        {(item.selected_size || item.selectedSize || item.size) && <p className="item-variant">Size: {item.selected_size || item.selectedSize || item.size}</p>}
                        {(item.selected_color || item.selectedColor || item.color) && <p className="item-variant">Color: {item.selected_color || item.selectedColor || item.color}</p>}
                      </div>
                      <div className="item-price">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-info-sections">
                  {(order.shipping_address || order.shipping) && (
                    <div className="info-section">
                      <h3>Shipping Address</h3>
                      <p>{order.shipping_address?.street || order.shipping?.address}</p>
                      <p>{order.shipping_address?.city || order.shipping?.city}, {order.shipping_address?.state || order.shipping?.state} {order.shipping_address?.zip_code || order.shipping?.zipCode}</p>
                      <p>{order.shipping_address?.country || order.shipping?.country}</p>
                      {order.shipping_address?.phone && <p>{order.shipping_address.phone}</p>}
                    </div>
                  )}

                  <div className="info-section">
                    <h3>Payment Method</h3>
                    <p>{order.payment_method || 'Card'}</p>
                    <p>Status: {order.payment_status || 'Completed'}</p>
                  </div>

                  <div className="info-section">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${parseFloat(order.subtotal || order.total_amount).toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>{(order.shipping_cost || order.shippingCost || 0) === 0 ? "FREE" : `$${parseFloat(order.shipping_cost || order.shippingCost).toFixed(2)}`}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax</span>
                      <span>${parseFloat(order.tax_amount || order.tax || 0).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${parseFloat(order.total_amount || order.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="order-actions">
                  <Link
                    to={`/track-order?orderNumber=${order.order_number}&email=${user?.email || ''}`}
                    className="btn-secondary"
                  >
                    Track Order
                  </Link>
                  <button className="btn-primary">Reorder Items</button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
