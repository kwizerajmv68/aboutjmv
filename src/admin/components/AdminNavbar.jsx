import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const AdminNavbar = ({ user }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="admin-navbar">
      <div className="user-info">
        <span>{user.email}</span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </header>
  );
};

export default AdminNavbar;
