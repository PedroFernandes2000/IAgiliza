import React from 'react';
import './style/Cabecalho.css';

function Header() {
    //720 - 211   180 - 53
  return (
    <header className="header">
      
        <img className='logo' src="src\components\logoIAgiliza.png" alt="IAgiliza"/>
      
      <nav>
        <ul>
          <li><button>Quem somos?</button></li>
          <li><button>Soluções</button></li>
          <li><button>Contacte-nos</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
