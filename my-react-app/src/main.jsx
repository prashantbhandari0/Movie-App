// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { FavouritesProvider } from './Context/FavouritesContext'; // Updated import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </BrowserRouter>
  </StrictMode>,
);