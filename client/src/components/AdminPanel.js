import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContainer } from "../App";
import axios from "axios";
import "../Styles/AdminPanel.css";

function AdminDashboard() {
  const { CartItem } = useContext(DataContainer);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/users`
        ); // adjust the URL to your backend endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  // Calculate total revenue
  const totalRevenue = CartItem.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );

  return (
    <div className="container" style={{ maxWidth: '1200px', marginTop: '140px' }}>
      {/* Header */}
      <div className="mb-5">
        <h1 className="h3 mb-2" style={{ color: '#333', fontWeight: '600' }}>Admin Dashboard</h1>
        <p className="text-muted mb-0">Manage your blood test platform</p>
      </div>

      {/* Stats Section */}
      <div className="row mb-5">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="bg-white p-4 rounded border" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <div className="rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '48px', height: '48px', backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-users text-muted"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1 text-muted">Total Users</h6>
                <h4 className="mb-0" style={{ color: '#333', fontWeight: '600' }}>{users.length}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="mb-5">
        <h4 className="mb-4" style={{ color: '#333', fontWeight: '500' }}>Quick Actions</h4>
        <div className="row g-3">
          <div className="col-md-6 col-lg-3">
            <Link to="/admin/view-orders" className="text-decoration-none">
              <div className="bg-white p-4 rounded border d-flex align-items-center h-100" 
                   style={{ 
                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                     transition: 'all 0.2s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                     }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                   }}>
                <div className="flex-shrink-0 me-3">
                  <i className="fas fa-shopping-cart text-muted" style={{ fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h6 className="mb-0" style={{ color: '#333' }}>View Orders</h6>
                  <small className="text-muted">Manage customer orders</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 col-lg-3">
            <Link to="/admin/view-users" className="text-decoration-none">
              <div className="bg-white p-4 rounded border d-flex align-items-center h-100" 
                   style={{ 
                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                     transition: 'all 0.2s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                   }}>
                <div className="flex-shrink-0 me-3">
                  <i className="fas fa-user-friends text-muted" style={{ fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h6 className="mb-0" style={{ color: '#333' }}>View Users</h6>
                  <small className="text-muted">User management</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 col-lg-3">
            <Link to="/admin/manage-packages" className="text-decoration-none">
              <div className="bg-white p-4 rounded border d-flex align-items-center h-100" 
                   style={{ 
                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                     transition: 'all 0.2s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                   }}>
                <div className="flex-shrink-0 me-3">
                  <i className="fas fa-box text-muted" style={{ fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h6 className="mb-0" style={{ color: '#333' }}>Manage Packages</h6>
                  <small className="text-muted">Health packages</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-6 col-lg-3">
            <Link to="/admin/manage-tests" className="text-decoration-none">
              <div className="bg-white p-4 rounded border d-flex align-items-center h-100" 
                   style={{ 
                     boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                     transition: 'all 0.2s ease',
                     cursor: 'pointer'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                   }}>
                <div className="flex-shrink-0 me-3">
                  <i className="fas fa-flask text-muted" style={{ fontSize: '1.2rem' }}></i>
                </div>
                <div>
                  <h6 className="mb-0" style={{ color: '#333' }}>Manage Tests</h6>
                  <small className="text-muted">Individual tests</small>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
