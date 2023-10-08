import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPage from './app.tsx';
import './index.css';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toaster richColors />
    <AppPage />
  </React.StrictMode>
);
