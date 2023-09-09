import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPage from './app.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppPage />
  </React.StrictMode>
);
