import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaArrowLeft, FaEye } from 'react-icons/fa';
import '../Css/AdminOrders.css';

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    comment: '',
    tracking_number: '',
    notify_customer: true,
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Please login as admin');
      // Save the intended page before redirecting to admin login
      const intendedPage = window.location.pathname + window.location.search;
      navigate(`/admin/login?returnUrl=${encodeURIComponent(intendedPage)}`);
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setSelectedOrder(response.data.order);
        setStatusUpdate({
          status: response.data.order.status,
          comment: '',
          tracking_number: response.data.order.tracking_number || '',
          notify_customer: true,
        });
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
    }
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/orders/${selectedOrder.id}/status`,
        statusUpdate,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success('Order status updated successfully!');
      if (statusUpdate.notify_customer) {
        toast.success('Customer has been notified via email');
      }
      toast.success('Real-time notification sent to tracking page!', {
        icon: '📡',
      });

      setShowModal(false);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error(error.response?.data?.error || 'Failed to update order');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      case 'shipped':
        return '#8b5cf6';
      case 'delivered':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return <div className="admin-orders"><div className="loading">Loading orders...</div></div>;
  }

  return (
    <div className="admin-orders">
      <div className="admin-orders-header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1>Order Management</h1>
      </div>

      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders yet.</p>
          </div>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-number">{order.order_number}</td>
                    <td>{order.users?.name || 'Guest'}</td>
                    <td>{order.users?.email || 'N/A'}</td>
                    <td className="order-amount">${parseFloat(order.total_amount).toFixed(2)}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => fetchOrderDetails(order.id)}
                        className="view-btn"
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content order-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details - {selectedOrder.order_number}</h2>

            <div className="order-details">
              <div className="detail-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.users?.name || 'Guest'}</p>
                <p><strong>Email:</strong> {selectedOrder.users?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {selectedOrder.users?.phone || 'N/A'}</p>
              </div>

              <div className="detail-section">
                <h3>Shipping Address</h3>
                <p>{selectedOrder.shipping_address?.street}</p>
                <p>{selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} {selectedOrder.shipping_address?.zip}</p>
                <p>{selectedOrder.shipping_address?.country}</p>
              </div>

              <div className="detail-section">
                <h3>Order Items</h3>
                <div className="order-items">
                  {selectedOrder.order_items?.map((item, index) => (
                    <div key={index} className="order-item">
                      <span className="item-name">{item.product_name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                      <span className="item-price">${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <strong>Total:</strong> ${parseFloat(selectedOrder.total_amount).toFixed(2)}
                </div>
              </div>

              <div className="detail-section">
                <h3>Update Order Status</h3>
                <div className="websocket-info">
                  📡 <strong>Live Tracking Enabled:</strong> Customers viewing this order will receive instant updates
                </div>
                <form onSubmit={handleStatusUpdate} className="status-form">
                  <div className="form-group">
                    <label>Status *</label>
                    <select
                      value={statusUpdate.status}
                      onChange={(e) =>
                        setStatusUpdate({ ...statusUpdate, status: e.target.value })
                      }
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Tracking Number</label>
                    <input
                      type="text"
                      value={statusUpdate.tracking_number}
                      onChange={(e) =>
                        setStatusUpdate({ ...statusUpdate, tracking_number: e.target.value })
                      }
                      placeholder="Enter tracking number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Comment/Note</label>
                    <textarea
                      value={statusUpdate.comment}
                      onChange={(e) =>
                        setStatusUpdate({ ...statusUpdate, comment: e.target.value })
                      }
                      rows="3"
                      placeholder="Add a note for the customer (optional)"
                    />
                  </div>

                  <div className="form-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={statusUpdate.notify_customer}
                        onChange={(e) =>
                          setStatusUpdate({ ...statusUpdate, notify_customer: e.target.checked })
                        }
                      />
                      Send email notification to customer
                    </label>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="cancel-btn"
                      disabled={updating}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={updating}>
                      {updating ? 'Updating...' : 'Update Order'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
