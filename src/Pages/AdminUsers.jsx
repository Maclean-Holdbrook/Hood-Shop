import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaSearch, FaUser, FaEnvelope, FaCalendar, FaArrowLeft } from 'react-icons/fa';
import '../Css/AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
      // Save the intended page before redirecting to admin login
      const intendedPage = window.location.pathname + window.location.search;
      navigate(`/admin/login?returnUrl=${encodeURIComponent(intendedPage)}`);
      return;
    }
    fetchUsers();
  }, [pagination.page, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/users`,
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
        setUsers(response.data.users || []);
        setPagination(response.data.pagination || pagination);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        // Save the intended page before redirecting to admin login
        const intendedPage = window.location.pathname + window.location.search;
        navigate(`/admin/login?returnUrl=${encodeURIComponent(intendedPage)}`);
      } else {
        toast.error('Failed to load users');
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-users">
      <div className="admin-header">
        <div className="header-left">
          <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1>All Users</h1>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="users-stats">
          <span className="stat-badge">Total Users: {pagination.total}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered On</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-name">
                          <FaUser className="user-icon" />
                          {user.name}
                        </div>
                      </td>
                      <td>
                        <div className="user-email">
                          <FaEnvelope className="email-icon" />
                          {user.email}
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <FaCalendar className="calendar-icon" />
                          {formatDate(user.created_at)}
                        </div>
                      </td>
                      <td>
                        <div className="date-info">
                          <FaCalendar className="calendar-icon" />
                          {user.updated_at ? formatDate(user.updated_at) : 'N/A'}
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

export default AdminUsers;
