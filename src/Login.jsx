import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Autenticação simples
    if (username === 'user' && password === 'senha') {
      setIsAuthenticated(true);  // Define o estado de autenticado
      navigate('/');  // Redireciona para a página principal
    } else {
      setError('Nome de usuário ou senha incorretos');
    }
  };

  return (
    <div style={loginStyle}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Usuário: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Senha: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

// Estilos básicos para a página de login
const loginStyle = {
  width: '300px',
  margin: '100px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  textAlign: 'center',
};

export default Login;
