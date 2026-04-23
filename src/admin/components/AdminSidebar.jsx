import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">JMV ADMIN</div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          DASHBOARD
        </NavLink>
        <NavLink to="/admin/videos" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          VIDEOS
        </NavLink>
        <NavLink to="/admin/graphics" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          GRAPHICS
        </NavLink>
        <NavLink to="/admin/scriptures" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          SCRIPTURES
        </NavLink>
        <NavLink to="/admin/about" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          ABOUT US
        </NavLink>
        <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          BOOKINGS
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          SETTINGS
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
