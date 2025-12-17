import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// Esto permite usar algunos componentes de Ionic en PWA
defineCustomElements(window);
