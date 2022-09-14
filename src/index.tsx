import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App';
import { GlobalStyles } from './components/style/GlobalStyle.style';

import { VideoProvider } from './context/VideoContext';


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <GlobalStyles/>
      <VideoProvider >
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </VideoProvider>
    </BrowserRouter>
  </React.StrictMode>
);


