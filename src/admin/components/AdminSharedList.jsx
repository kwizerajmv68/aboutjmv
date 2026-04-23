import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const AdminSharedList = ({ collectionName, title }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', sourceLink: '', thumbnailLink: '', status: 'visible' });

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [collectionName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, collectionName, editingId), formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, collectionName), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setFormData({ title: '', sourceLink: '', thumbnailLink: '', status: 'visible' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ title: item.title, sourceLink: item.sourceLink, thumbnailLink: item.thumbnailLink, status: item.status || 'visible' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  const toggleVisibility = async (item) => {
    const newStatus = item.status === 'hidden' ? 'visible' : 'hidden';
    await updateDoc(doc(db, collectionName, item.id), { status: newStatus });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-shared-list">
      <h1>Manage {title}</h1>

      <form onSubmit={handleSubmit} className="settings-form" style={{ marginBottom: '3rem' }}>
        <h3>{editingId ? 'Edit Item' : 'Add New Item'}</h3>
        <div className="form-group">
          <label>Title</label>
          <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Source Link (URL)</label>
          <input required value={formData.sourceLink} onChange={e => setFormData({...formData, sourceLink: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Thumbnail Link (Image URL)</label>
          <input required value={formData.thumbnailLink} onChange={e => setFormData({...formData, thumbnailLink: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Initial Status</label>
          <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        <button type="submit" className="btn-auth">
          {editingId ? 'Update Item' : 'Add Item'}
        </button>
        {editingId && (
          <button type="button" onClick={() => {setEditingId(null); setFormData({title:'', sourceLink:'', thumbnailLink:'', status:'visible'})}} style={{marginTop:'1rem', color:'#a0a0a0'}}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {items.map(item => (
          <div key={item.id} className="stat-card" style={{ padding: '1rem', position: 'relative', opacity: item.status === 'hidden' ? 0.6 : 1 }}>
            <img src={item.thumbnailLink} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            <h4>{item.title}</h4>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => handleEdit(item)} style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>EDIT</button>
              <button onClick={() => toggleVisibility(item)} style={{ color: item.status === 'hidden' ? '#16a34a' : '#a0a0a0', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {item.status === 'hidden' ? 'SHOW' : 'HIDE'}
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: 'bold' }}>DELETE</button>
            </div>
            {item.status === 'hidden' && (
              <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#dc2626', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>HIDDEN</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSharedList;
