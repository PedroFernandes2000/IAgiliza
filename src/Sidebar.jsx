import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={sidebarStyle}>
      <nav>
        <ul>
          <li>
            <Link to="/">📧 Emails a Responder</Link>
          </li>
          <li>
            <Link to="/config">⚙️ Configurar Resposta Automática</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const sidebarStyle = {
  width: '200px',
  background: '#f4f4f4',
  padding: '20px',
  borderRight: '1px solid #ddd',
  height: '100vh',
};

export default Sidebar;
