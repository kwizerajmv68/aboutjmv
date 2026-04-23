import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Dashboard = () => {
  const [stats, setStats] = useState({
    videos: 0,
    graphics: 0,
    scriptures: 0,
    bookings: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const collections = ['videos', 'graphics', 'scriptures', 'bookings'];
      const newStats = {};
      
      for (const col of collections) {
        try {
          const snapshot = await getDocs(collection(db, col));
          newStats[col] = snapshot.size;
        } catch (e) {
          newStats[col] = 0;
        }
      }
      setStats(newStats);
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1 style={{marginBottom:'2rem'}}>Dashboard Overview</h1>
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>Total Videos</h3>
          <p style={{fontSize:'2.5rem', fontWeight:'700', color:'var(--primary)'}}>{stats.videos}</p>
        </div>
        <div className="stat-card">
          <h3>Total Graphics</h3>
          <p style={{fontSize:'2.5rem', fontWeight:'700', color:'var(--primary)'}}>{stats.graphics}</p>
        </div>
        <div className="stat-card">
          <h3>Total Scriptures</h3>
          <p style={{fontSize:'2.5rem', fontWeight:'700', color:'var(--primary)'}}>{stats.scriptures}</p>
        </div>
        <div className="stat-card">
          <h3>New Bookings</h3>
          <p style={{fontSize:'2.5rem', fontWeight:'700', color:'var(--accent)'}}>{stats.bookings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
