import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VideoProvider } from './context/Video_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VideoProvider>
      <App />
    </VideoProvider>
  </React.StrictMode>
);
