import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const SharedContentPage = ({ collectionName, title }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch items that are visible
    const q = query(
      collection(db, collectionName), 
      where("status", "!=", "hidden"),
      orderBy("status"), // Required for inequality filter
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    }, (error) => {
      // Fallback if index isn't ready yet or other error
      console.error(error);
      const simpleQ = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      onSnapshot(simpleQ, (snapshot) => {
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.status !== 'hidden');
        setItems(data);
        setLoading(false);
      });
    });
    
    return () => unsubscribe();
  }, [collectionName]);

  if (loading) return <div style={{padding:'10rem', textAlign:'center'}}>Loading {title}...</div>;

  return (
    <div style={{padding:'6rem 5%', minHeight:'80vh'}}>
      <h1 style={{fontSize:'3rem', marginBottom:'3rem', textAlign:'center'}}>{title.toUpperCase()}</h1>
      
      <div style={{
        display:'grid', 
        gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', 
        gap:'2.5rem'
      }}>
        {items.length === 0 ? (
          <p style={{textAlign:'center', gridColumn:'1/-1', color:'var(--text-muted)'}}>No {title} available at the moment.</p>
        ) : (
          items.map(item => (
            <a key={item.id} href={item.sourceLink} target="_blank" rel="noopener noreferrer" className="content-card" style={{
              background:'var(--bg-card)', 
              borderRadius:'15px', 
              overflow:'hidden',
              transition:'transform 0.3s ease',
              display:'block'
            }}>
              <div style={{height:'200px', overflow:'hidden'}}>
                <img src={item.thumbnailLink} alt={item.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <div style={{padding:'1.5rem'}}>
                <h3 style={{color:'var(--text-main)', fontSize:'1.2rem'}}>{item.title}</h3>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default SharedContentPage;
