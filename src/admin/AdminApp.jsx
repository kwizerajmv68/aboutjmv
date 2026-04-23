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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Redirect to login if not authenticated and not on login page
      if (!currentUser && location.pathname !== '/login') {
        navigate('/login');
      }
      
      // Redirect to dashboard if authenticated and on login page
      if (currentUser && location.pathname === '/login') {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return <div className="admin-loading">Loading Admin...</div>;
  }

  // If not logged in, any /admin route shows Login
  if (!user) {
    return <Login />;
  }

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="admin-main">
        <AdminNavbar user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
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
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
};

export default AdminApp;
