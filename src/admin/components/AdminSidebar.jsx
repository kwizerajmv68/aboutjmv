import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">JMV ADMIN</div>
        <button className="sidebar-close" onClick={() => setIsOpen(false)}>✕</button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          DASHBOARD
        </NavLink>
        <NavLink to="/videos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          VIDEOS
        </NavLink>
        <NavLink to="/graphics" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          GRAPHICS
        </NavLink>
        <NavLink to="/scriptures" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          SCRIPTURES
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          ABOUT US
        </NavLink>
        <NavLink to="/bookings" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          BOOKINGS
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          SETTINGS
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
