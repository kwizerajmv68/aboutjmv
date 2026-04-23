import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicApp from './public/PublicApp';
import AdminApp from './admin/AdminApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin Site Routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* Public Site Routes */}
        <Route path="/*" element={<PublicApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
