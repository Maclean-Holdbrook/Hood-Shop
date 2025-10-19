import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaSignOutAlt, FaUserFriends } from 'react-icons/fa';
import '../Css/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Please login as admin');
      navigate('/admin/login');
      return;
    }
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#3b82f6' }}>
            <FaBox />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalProducts || 0}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}>
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalOrders || 0}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}>
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalCustomers || 0}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#8b5cf6' }}>
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>${stats?.totalRevenue?.toFixed(2) || '0.00'}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate('/admin/products')} className="action-btn primary">
          <FaBox /> Manage Products
        </button>
        <button onClick={() => navigate('/admin/orders')} className="action-btn secondary">
          <FaShoppingCart /> Manage Orders
        </button>
        <button onClick={() => navigate('/admin/users')} className="action-btn tertiary">
          <FaUsers /> All Users
        </button>
        <button onClick={() => navigate('/admin/customers')} className="action-btn quaternary">
          <FaUserFriends /> Customers
        </button>
        <button onClick={() => navigate('/')} className="action-btn quinary">
          View Site
        </button>
      </div>

      {stats?.pendingOrders > 0 && (
        <div className="alert-box">
          <h3>⚠️ Attention Required</h3>
          <p>You have {stats.pendingOrders} pending orders that need processing.</p>
          <button onClick={() => navigate('/admin/orders')} className="alert-btn">
            View Pending Orders
          </button>
        </div>
      )}

      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.order_number}</td>
                    <td>{order.users?.name || 'Guest'}</td>
                    <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
