import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';

export const server = "https://reception-backend.onrender.com";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


