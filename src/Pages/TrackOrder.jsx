import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import '../Css/TrackOrder.css';

const TrackOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [socket, setSocket] = useState(null);
  const [realTimeUpdate, setRealTimeUpdate] = useState(null);
  const [hasUrlParams, setHasUrlParams] = useState(false);

  // Get order number from URL if coming from order confirmation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderNum = params.get('orderNumber');
    const userEmail = params.get('email');

    if (orderNum) setOrderNumber(orderNum);
    if (userEmail) setEmail(userEmail);

    // Auto-track if both parameters are present
    if (orderNum && userEmail) {
      setHasUrlParams(true);
      trackOrder(orderNum, userEmail);
    }
  }, [location]);

  // Initialize Socket.io connection
  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to WebSocket server');
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from WebSocket server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Listen for real-time order updates
  useEffect(() => {
    if (socket && order) {
      // Join the order room
      socket.emit('join-order', order.id);

      // Listen for status updates
      socket.on('order-status-update', (update) => {
        console.log('📡 Received order update:', update);
        setRealTimeUpdate(update);

        // Update the order state with new status
        setOrder(prev => ({
          ...prev,
          status: update.status,
          tracking_number: update.trackingNumber || prev.tracking_number,
          order_status_history: [
            ...(prev.order_status_history || []),
            {
              id: Date.now(),
              status: update.status,
              comment: update.comment,
              created_at: update.timestamp,
              admin_users: {
                name: update.updatedBy
              }
            }
          ]
        }));

        // Clear real-time update notification after 5 seconds
        setTimeout(() => setRealTimeUpdate(null), 5000);
      });

      return () => {
        socket.emit('leave-order', order.id);
        socket.off('order-status-update');
      };
    }
  }, [socket, order]);

  const trackOrder = async (orderNum = orderNumber, userEmail = email) => {
    if (!orderNum || !userEmail) {
      setError('Please enter both order number and email');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/tracking/track/${orderNum}?email=${encodeURIComponent(userEmail)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Order not found');
      }

      setOrder(data.order);
    } catch (err) {
      setError(err.message || 'Failed to track order');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trackOrder();
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      processing: '⚙️',
      shipped: '🚚',
      delivered: '✅',
      cancelled: '❌'
    };
    return icons[status] || '📦';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFA500',
      processing: '#2196F3',
      shipped: '#9C27B0',
      delivered: '#4CAF50',
      cancelled: '#F44336'
    };
    return colors[status] || '#757575';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <div className="track-order-page">
        <div className="track-container">
          <h1>Track Your Order</h1>

          {/* Real-time update notification */}
          {realTimeUpdate && (
            <div className="real-time-alert">
              🔔 <strong>Live Update:</strong> Order status changed to{' '}
              <span style={{ color: getStatusColor(realTimeUpdate.status) }}>
                {realTimeUpdate.status.toUpperCase()}
              </span>
              {realTimeUpdate.comment && ` - ${realTimeUpdate.comment}`}
            </div>
          )}

          {/* Show message if no order params provided */}
          {!hasUrlParams && !order && !loading && (
            <div className="no-order-message">
              <p>To track your order, please access this page from:</p>
              <ul>
                <li>Your order confirmation page after checkout</li>
                <li>The "Track Order" button on your Orders page</li>
              </ul>
            </div>
          )}

          {/* Show loading state */}
          {loading && (
            <div className="loading-message">
              <p>Loading your order...</p>
            </div>
          )}

          {/* Show error if tracking failed */}
          {error && !loading && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className="order-details">
              <div className="order-header">
                <h2>Order {order.order_number}</h2>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusIcon(order.status)} {order.status.toUpperCase()}
                </span>
              </div>

              <div className="order-info">
                <div className="info-item">
                  <strong>Order Date:</strong> {formatDate(order.created_at)}
                </div>
                <div className="info-item">
                  <strong>Total Amount:</strong> ${parseFloat(order.total_amount).toFixed(2)}
                </div>
                <div className="info-item">
                  <strong>Payment Status:</strong>{' '}
                  <span className={`payment-${order.payment_status}`}>
                    {order.payment_status.toUpperCase()}
                  </span>
                </div>
                {order.tracking_number && (
                  <div className="info-item">
                    <strong>Tracking Number:</strong> {order.tracking_number}
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="order-items">
                <h3>Items in this order:</h3>
                <div className="items-list">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="order-item">
                      {item.products?.images?.[0] && (
                        <img
                          src={item.products.images[0]}
                          alt={item.products.name}
                          className="item-image"
                        />
                      )}
                      <div className="item-details">
                        <h4>{item.products?.name}</h4>
                        <p>
                          Quantity: {item.quantity} {(item.selected_size || item.size) && `• Size: ${item.selected_size || item.size}`}{' '}
                          {(item.selected_color || item.color) && `• Color: ${item.selected_color || item.color}`}
                        </p>
                        <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              {order.shipping_address && (
                <div className="shipping-address">
                  <h3>Shipping Address:</h3>
                  <p>{order.shipping_address.street}</p>
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.state}{' '}
                    {order.shipping_address.zip_code}
                  </p>
                  <p>{order.shipping_address.country}</p>
                </div>
              )}

              {/* Order Status Timeline */}
              <div className="status-timeline">
                <h3>Order Timeline:</h3>
                <div className="timeline">
                  {order.order_status_history && order.order_status_history.length > 0 ? (
                    order.order_status_history.map((history, index) => (
                      <div key={history.id} className="timeline-item">
                        <div
                          className="timeline-dot"
                          style={{ backgroundColor: getStatusColor(history.status) }}
                        >
                          {getStatusIcon(history.status)}
                        </div>
                        <div className="timeline-content">
                          <h4>{history.status.toUpperCase()}</h4>
                          {history.comment && <p className="timeline-comment">{history.comment}</p>}
                          <p className="timeline-date">{formatDate(history.created_at)}</p>
                          {history.admin_users?.name && (
                            <p className="timeline-admin">Updated by: {history.admin_users.name}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="timeline-item">
                      <div
                        className="timeline-dot"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {getStatusIcon(order.status)}
                      </div>
                      <div className="timeline-content">
                        <h4>{order.status.toUpperCase()}</h4>
                        <p className="timeline-date">{formatDate(order.created_at)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="websocket-status">
                {socket?.connected ? (
                  <span className="connected">🟢 Live tracking enabled</span>
                ) : (
                  <span className="disconnected">🔴 Live tracking unavailable</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
