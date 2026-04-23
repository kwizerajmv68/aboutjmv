import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const AdminNavbar = ({ user, toggleSidebar }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="admin-navbar">
      <div className="navbar-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
      <div className="user-info">
        <span className="user-email">{user.email}</span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </header>
  );
};

export default AdminNavbar;
