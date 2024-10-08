import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primereact/resources/themes/saga-blue/theme.css';  // Cambia el tema si lo prefieres
import 'primereact/resources/primereact.min.css';          // Estilos de PrimeReact
import 'primeicons/primeicons.css';                        // Iconos de PrimeReact
import 'primeflex/primeflex.css';                          // Grid y Flexbox de PrimeFlex
import './index.css';    
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
