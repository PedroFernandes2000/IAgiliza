import React, { useState } from "react";
import "./style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de autenticação
    if (email === "pedro@eu" && password === "123") {
      window.location.href = "/dashboard"; // Redireciona para a área do cliente
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="login">
      <header className="login-header">
        <h1>Bem-vindo à sua Área Exclusiva!</h1>
        <p>Acesse suas informações e acompanhe os serviços contratados.</p>
      </header>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">E-mail cadastrado</label>
          <input
            type="email"
            id="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Entrar</button>
        <a href="#" className="forgot-password">Esqueceu sua senha?</a>
      </form>
      <footer className="login-footer">
        <p>Novo aqui? <a href="#">Cadastre-se agora.</a></p>
        <small>&copy; 2024 IAgiliza - Todos os direitos reservados.</small>
      </footer>
    </div>
  );
};

export default Login;
