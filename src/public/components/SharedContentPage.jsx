import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const SharedContentPage = ({ collectionName, title }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName), 
      where("status", "!=", "hidden"),
      orderBy("status"),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    }, (error) => {
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

  const getEmbedUrl = (url) => {
    if (!url) return "";
    // Convert Google Drive links to preview mode for iframe
    if (url.includes('drive.google.com')) {
      if (url.includes('/view')) {
        return url.replace('/view', '/preview');
      } else if (url.includes('id=')) {
        const id = new URL(url).searchParams.get('id');
        return `https://drive.google.com/file/d/${id}/preview`;
      }
    }
    return url;
  };

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
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="content-card" 
              style={{
                background:'var(--bg-card)', 
                borderRadius:'15px', 
                overflow:'hidden',
                transition:'transform 0.3s ease',
                cursor:'pointer'
              }}
            >
              <div style={{height:'200px', overflow:'hidden'}}>
                <img src={item.thumbnailLink} alt={item.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <div style={{padding:'1.5rem'}}>
                <h3 style={{color:'var(--text-main)', fontSize:'1.2rem'}}>{item.title}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Iframe Modal */}
      {selectedItem && (
        <div style={{
          position:'fixed', top:0, left:0, width:'100%', height:'100%', 
          background:'rgba(0,0,0,0.95)', zIndex:2000, 
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'2rem'
        }}>
          <div style={{width:'100%', maxWidth:'1200px', display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
            <h2 style={{color:'var(--primary)'}}>{selectedItem.title}</h2>
            <button 
              onClick={() => setSelectedItem(null)}
              style={{color:'white', fontSize:'1.5rem', fontWeight:'800'}}
            >
              ✕ CLOSE
            </button>
          </div>
          <div style={{width:'100%', maxWidth:'1200px', height:'80vh', background:'#111', borderRadius:'12px', overflow:'hidden'}}>
            <iframe 
              src={getEmbedUrl(selectedItem.sourceLink)} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title={selectedItem.title}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedContentPage;
