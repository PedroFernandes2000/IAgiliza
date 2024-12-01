import React from 'react';
import { Link } from 'react-router-dom';
import './style/Cabecalho.css';

function Cabecalho({ user }) {
  // Verifica se o usuário está logado
  const isLoggedIn = Boolean(user);

  // Função para pegar a primeira letra do nome
  const getInitial = (name) => name?.charAt(0).toUpperCase();

  return (
    <header className="header">
      {/* Logo */}
      <Link to='/iagiliza/' className="link">
        <img className='logo' src="src/components/images/logoIAgiliza.png" alt="IAgiliza" />
      </Link>

      {/* Navegação */}
      <nav>
        <ul>
          <li>
            <Link to='/iagiliza/Sobre' className="link">Sobre Nós</Link>
          </li>
          <li>
            <Link to="/iagiliza/Servicos" className='link'>Serviços</Link>
          </li>
          <li>
            <Link to='/iagiliza/Depoimentos' className="link">Casos de Sucesso</Link>
          </li>
          <li>
            <Link to='/iagiliza/Blog' className="link">Blog</Link>
          </li>
          <li>
            <Link to='/iagiliza/Contato' className='link'>Fale conosco</Link>
          </li>

          {/* Exibe login ou nome do usuário */}
          {isLoggedIn ? (
            <li className="user-profile">
              <span className="user-name">{user.name}</span>
              {user.profileImage ? (
                <img className="user-avatar" src={user.profileImage} alt={user.name} />
              ) : (
                <div className="user-avatar-placeholder">{getInitial(user.name)}</div>
              )}
            </li>
          ) : (
            <li>
              <Link to='/iagiliza/Cliente' className='link'>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Cabecalho;
