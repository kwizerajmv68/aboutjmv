import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const Dashboard = () => {
  const [stats, setStats] = useState({
    videos: 0,
    graphics: 0,
    scriptures: 0,
    bookings: 0
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const collections = ['videos', 'graphics', 'scriptures', 'bookings'];
      const newStats = {};
      const allItems = [];
      
      for (const col of collections) {
        try {
          const snapshot = await getDocs(collection(db, col));
          newStats[col] = snapshot.size;
          
          // Get items for the list
          snapshot.docs.forEach(doc => {
            allItems.push({
              id: doc.id,
              category: col.toUpperCase(),
              ...doc.data()
            });
          });
        } catch (e) {
          newStats[col] = 0;
        }
      }
      
      // Sort by creation date if available
      allItems.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      
      setStats(newStats);
      setRecentItems(allItems);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div style={{padding:'2rem'}}>Loading Dashboard...</div>;

  return (
    <div className="dashboard">
      <h1 style={{marginBottom:'2rem'}}>Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="dashboard-grid" style={{marginBottom:'4rem'}}>
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

      {/* Content List */}
      <div className="content-list-section">
        <h2 style={{marginBottom:'2rem', borderBottom:'1px solid rgba(255,123,0,0.2)', paddingBottom:'1rem'}}>All Available Content</h2>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%', borderCollapse:'collapse', textAlign:'left'}}>
            <thead>
              <tr style={{borderBottom:'2px solid var(--bg-card)', color:'var(--primary)'}}>
                <th style={{padding:'1rem'}}>TYPE</th>
                <th style={{padding:'1rem'}}>TITLE</th>
                <th style={{padding:'1rem'}}>STATUS</th>
                <th style={{padding:'1rem'}}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.length === 0 ? (
                <tr><td colSpan="4" style={{padding:'2rem', textAlign:'center'}}>No items found.</td></tr>
              ) : (
                recentItems.map(item => (
                  <tr key={item.id} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                    <td style={{padding:'1rem'}}><span style={{fontSize:'0.75rem', fontWeight:'800', opacity:0.7}}>{item.category}</span></td>
                    <td style={{padding:'1rem'}}>{item.title || item.name}</td>
                    <td style={{padding:'1rem'}}>
                      <span style={{
                        color: item.status === 'hidden' ? '#dc2626' : '#16a34a',
                        fontSize:'0.8rem',
                        fontWeight:'bold'
                      }}>
                        {item.status?.toUpperCase() || 'VISIBLE'}
                      </span>
                    </td>
                    <td style={{padding:'1rem', color:'#666', fontSize:'0.9rem'}}>
                      {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
