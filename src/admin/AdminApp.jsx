import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import AdminSidebar from './components/AdminSidebar';
import AdminNavbar from './components/AdminNavbar';
import Dashboard from './pages/Dashboard';
import ManageVideos from './pages/ManageVideos';
import ManageGraphics from './pages/ManageGraphics';
import ManageScriptures from './pages/ManageScriptures';
import ManageAboutUs from './pages/ManageAboutUs';
import ManageSettings from './pages/ManageSettings';
import ManageBookings from './pages/ManageBookings';
import Login from './pages/Login';
import './styles/admin.css';

const AdminApp = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Redirect to login if not authenticated and not on login page
      if (!currentUser && location.pathname !== '/admin/login') {
        navigate('/admin/login');
      }
      
      // Redirect to dashboard if authenticated and on login page
      if (currentUser && location.pathname === '/admin/login') {
        navigate('/admin/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  if (loading) {
    return <div className="admin-loading">Loading Admin...</div>;
  }

  if (!user && location.pathname === '/admin/login') {
    return <Login />;
  }

  if (!user) return null;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar user={user} />
        <div className="admin-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/videos" element={<ManageVideos />} />
            <Route path="/graphics" element={<ManageGraphics />} />
            <Route path="/scriptures" element={<ManageScriptures />} />
            <Route path="/about" element={<ManageAboutUs />} />
            <Route path="/settings" element={<ManageSettings />} />
            <Route path="/bookings" element={<ManageBookings />} />
            {/* Default redirect for /admin */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
