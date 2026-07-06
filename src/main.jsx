import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App';
import './styles.css';
import { AudioProvider } from './components/AudioContext';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AudioProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AudioProvider>
);
