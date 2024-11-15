import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmailList from './EmailList';
import AutoResponseConfig from './AutoResponseConfig';
import EmailReply from './EmailReply';
import Login from './Login';
import Sidebar from './Sidebar';
import './App.css';

// Componente que protege as rotas
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}  {/* Mostra a barra lateral se estiver autenticado */}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            {/* Rota de Login */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            {/* Rotas Protegidas */}
            <Route
              path="/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <EmailList />
                </PrivateRoute>
              }
            />
            <Route
              path="/config"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AutoResponseConfig />
                </PrivateRoute>
              }
            />
            <Route
              path="/responder/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <EmailReply />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
