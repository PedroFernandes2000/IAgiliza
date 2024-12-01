import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cabecalho from './components/Cabecalho.jsx';
import ChatButton from './components/ChatButton.jsx';
import Principal from './components/Home.jsx';
import Sobre from './components/Sobre.jsx';
import Servicos from './components/Servicos.jsx';
import Depoimentos from './components/Depoimentos.jsx';
import Contato from './components/Contato.jsx';
import Blog from './components/Blog.jsx';
import Cliente from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import Rodape from './components/Rodape.jsx';


function App() {

  return (
    <Router>

      <Cabecalho />
      <ChatButton />

      <Routes>
        <Route path="/iagiliza" element={<Principal />} />
        <Route path="/iagiliza/Sobre" element={<Sobre />} />
        <Route path="/iagiliza/Servicos" element={<Servicos />} />
        <Route path="/iagiliza/Depoimentos" element={<Depoimentos />} />
        <Route path="/iagiliza/Contato" element={<Contato />} />
        <Route path="/iagiliza/Blog" element={<Blog />} />
        <Route path="/iagiliza/Cliente" element={<Cliente />} />
        <Route path="/iagiliza/Dashboard" element={<Dashboard />} />
      </Routes>

      <Rodape />

    </Router>
  );
}

export default App;
