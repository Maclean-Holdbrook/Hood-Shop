import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaSearch, FaUser, FaEnvelope, FaShoppingCart, FaDollarSign, FaCalendar, FaArrowLeft } from 'react-icons/fa';
import '../Css/AdminCustomers.css';

const AdminCustomers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      toast.error('Please login as admin');
      navigate('/admin/login');
      return;
    }
    fetchCustomers();
  }, [pagination.page, searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/customers`,
        {
          params: {
            page: pagination.page,
            limit: pagination.limit,
            search: searchTerm || undefined
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data) {
        setCustomers(response.data.customers || []);
        setPagination(response.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        navigate('/admin/login');
      } else {
        toast.error('Failed to load customers');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTotalRevenue = () => {
    return customers.reduce((sum, customer) => sum + (customer.total_spent || 0), 0).toFixed(2);
  };

  return (
    <div className="admin-customers">
      <div className="admin-header">
        <div className="header-left">
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1>Customers (Users with Orders)</h1>
        </div>
      </div>

      <div className="customers-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="customers-stats">
          <span className="stat-badge blue">Total Customers: {pagination.total}</span>
          <span className="stat-badge green">Total Revenue: ${calculateTotalRevenue()}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading customers...</div>
      ) : (
        <>
          <div className="customers-table-container">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Last Order</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>
                        <div className="customer-name">
                          <FaUser className="user-icon" />
                          {customer.name}
                        </div>
                      </td>
                      <td>
                        <div className="customer-email">
                          <FaEnvelope className="email-icon" />
                          {customer.email}
                        </div>
                      </td>
                      <td>
                        <div className="order-count">
                          <FaShoppingCart className="cart-icon" />
                          {customer.order_count || 0} orders
                        </div>
                      </td>
                      <td>
                        <div className="total-spent">
                          <FaDollarSign className="dollar-icon" />
                          ${(customer.total_spent || 0).toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <FaCalendar className="calendar-icon" />
                          {formatDate(customer.last_order)}
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <FaCalendar className="calendar-icon" />
                          {formatDate(customer.created_at)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCustomers;
