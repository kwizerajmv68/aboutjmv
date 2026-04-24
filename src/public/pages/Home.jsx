import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, limit, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

const Home = () => {
  const [hero, setHero] = useState({
    title: "JMV PORTFOLIO",
    subtitle: "Professional Video Production & Graphic Design"
  });
  const [about, setAbout] = useState({ name: "" });
  const [recentWorks, setRecentWorks] = useState([]);

  useEffect(() => {
    // Hero data
    const unsubHero = onSnapshot(doc(db, "settings", "hero"), (doc) => {
      if (doc.exists()) setHero(doc.data());
    });

    // About data (to get the name)
    const unsubAbout = onSnapshot(doc(db, "pages", "about"), (doc) => {
      if (doc.exists()) setAbout(doc.data());
    });

    // Recent works (mix of graphics and videos)
    const fetchRecent = async () => {
      const vQ = query(collection(db, "videos"), orderBy("createdAt", "desc"), limit(3));
      const gQ = query(collection(db, "graphics"), orderBy("createdAt", "desc"), limit(3));
      
      const [vSnap, gSnap] = await Promise.all([getDocs(vQ), getDocs(gQ)]);
      const combined = [
        ...vSnap.docs.map(doc => ({ id: doc.id, type: 'Video', ...doc.data() })),
        ...gSnap.docs.map(doc => ({ id: doc.id, type: 'Graphic', ...doc.data() }))
      ]
      .filter(item => item.status !== 'hidden')
      .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
      .slice(0, 6);
      
      setRecentWorks(combined);
    };

    fetchRecent();
    return () => unsubHero();
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        {about.name && (
          <span style={{
            color: 'var(--primary)', 
            fontSize: '1.2rem', 
            fontWeight: '600', 
            letterSpacing: '3px',
            marginBottom: '1rem',
            display: 'block'
          }}>
            {about.name.toUpperCase()}
          </span>
        )}
        <h1 style={{color: '#fff', textTransform: 'uppercase', fontSize: '4rem'}}>{hero.title}</h1>
        <p style={{maxWidth: '800px', margin: '1rem auto 2rem'}}>{hero.subtitle}</p>
        <Link to="/book" className="btn-primary">GET STARTED</Link>
      </section>

      <section className="recent-works" style={{padding:'6rem 5%', background:'#050505'}}>
        <h2 style={{textAlign:'center', marginBottom:'4rem', fontSize:'2.5rem'}}>RECENT WORKS</h2>
        <div style={{
          display:'grid', 
          gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', 
          gap:'2rem'
        }}>
          {recentWorks.map(item => (
            <div key={item.id} className="content-card" style={{background:'var(--bg-card)', borderRadius:'12px', overflow:'hidden'}}>
              <img src={item.thumbnailLink} alt={item.title} style={{width:'100%', height:'200px', objectFit:'cover'}} />
              <div style={{padding:'1.5rem'}}>
                <span style={{fontSize:'0.7rem', color:'var(--primary)', fontWeight:'800'}}>{item.type.toUpperCase()}</span>
                <h3 style={{marginTop:'0.5rem'}}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:'4rem'}}>
          <Link to="/videos" style={{color:'var(--primary)', fontWeight:'700', fontSize:'1.1rem'}}>VIEW ALL WORKS →</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
