import React from 'react';
import Header from './components/Cabecalho.jsx';
import HeroSection from './components/Titulo.jsx';
import IntegrationSection from './components/IntegrationSection.jsx';
import Footer from './components/Rodape.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <IntegrationSection />


      <Footer />
    </div>
  );
}

export default App;
