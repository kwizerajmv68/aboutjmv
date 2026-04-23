import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status: newStatus });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteDoc(doc(db, "bookings", id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading Bookings...</div>;

  return (
    <div className="manage-bookings">
      <h1 style={{marginBottom:'2rem'}}>Manage Bookings</h1>
      
      <div className="bookings-list" style={{display:'grid', gap:'1.5rem'}}>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} style={{
              background:'#111111', 
              padding:'2rem', 
              borderRadius:'12px', 
              border:'1px solid rgba(255, 123, 0, 0.1)',
              display:'grid',
              gridTemplateColumns:'1fr auto',
              gap:'2rem'
            }}>
              <div>
                <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem'}}>
                  <h3 style={{color:'var(--primary)'}}>{booking.name}</h3>
                  <span style={{
                    padding:'0.3rem 0.8rem', 
                    borderRadius:'20px', 
                    fontSize:'0.8rem', 
                    fontWeight:'600',
                    textTransform:'uppercase',
                    backgroundColor: booking.status === 'confirmed' ? '#16a34a' : (booking.status === 'pending' ? '#ff7b00' : '#dc2626'),
                    color: booking.status === 'confirmed' ? 'white' : 'black'
                  }}>
                    {booking.status}
                  </span>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', fontSize:'0.9rem', color:'#a0a0a0', marginBottom:'1.5rem'}}>
                  <p><strong>Email:</strong> {booking.email}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>Service:</strong> {booking.service}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                </div>
                <div style={{background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'8px'}}>
                  <p style={{fontSize:'0.95rem', fontStyle:'italic'}}>"{booking.message}"</p>
                </div>
              </div>
              
              <div style={{display:'flex', flexDirection:'column', gap:'0.5rem', justifyContent:'center'}}>
                <button 
                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                  style={{padding:'0.8rem 1.2rem', borderRadius:'6px', background:'#16a34a', color:'white', fontWeight:'600', fontSize:'0.85rem'}}
                >
                  CONFIRM
                </button>
                <button 
                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                  style={{padding:'0.8rem 1.2rem', borderRadius:'6px', background:'#dc2626', color:'white', fontWeight:'600', fontSize:'0.85rem'}}
                >
                  CANCEL
                </button>
                <button 
                  onClick={() => handleDelete(booking.id)}
                  style={{padding:'0.8rem 1.2rem', borderRadius:'6px', border:'1px solid #dc2626', color:'#dc2626', fontWeight:'600', fontSize:'0.85rem', marginTop:'1rem'}}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
