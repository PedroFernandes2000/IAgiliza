import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Transpilar o JSX manualmente para React.createElement
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(App, null)
  )
);
