import React, { useState } from "react";
import "./style/Contato.css";

const FaleConosco = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // Remove a mensagem após 5 segundos
  };

  return (
    <div className="fale-conosco">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">Estamos Aqui para Ajudar Você!</h1>
        <p className="hero-subtitle">
          Entre em contato conosco pelos canais abaixo ou envie uma mensagem diretamente por nosso formulário.
        </p>
      </header>

      {/* Contato Rápido */}
      <section className="contato-rapido">
        <h2 className="section-title">Canais de Contato</h2>
        <div className="contato-grid">
          <div className="contato-item">
            <i className="contato-icon whatsapp"></i>
            <p>Atendimento Rápido via WhatsApp</p>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
              Clique aqui para iniciar uma conversa
            </a>
          </div>
          <div className="contato-item">
            <i className="contato-icon email"></i>
            <p>Envie-nos um e-mail:</p>
            <a href="mailto:contato@iagiliza.com.br">contato@iagiliza.com.br</a>
          </div>
          <div className="contato-item">
            <i className="contato-icon phone"></i>
            <p>Fale diretamente conosco:</p>
            <span>+55 (XX) XXXX-XXXX</span>
          </div>
          <div className="contato-item">
            <i className="contato-icon location"></i>
            <p>Nossa sede:</p>
            <span>Rua Exemplo, 123, São Paulo - SP</span>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="formulario-contato">
        <h2 className="section-title">Envie-nos uma Mensagem</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Como podemos chamar você?"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Para onde devemos responder?"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              placeholder="Opcional, mas ajuda a agilizar o contato."
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="assunto">Assunto</label>
            <select
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Escolha um assunto
              </option>
              <option value="Solicitar Orçamento">Solicitar Orçamento</option>
              <option value="Dúvidas sobre Serviços">Dúvidas sobre Serviços</option>
              <option value="Suporte Técnico">Suporte Técnico</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mensagem">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="Descreva sua necessidade ou pergunta aqui."
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Enviar Mensagem
          </button>
          {isSubmitted && (
            <p className="success-message">
              Obrigado por entrar em contato! Nossa equipe responderá em até 24 horas.
            </p>
          )}
        </form>
      </section>

      {/* Call-to-Action Final */}
      <footer className="cta-final">
        <h2>Pronto para acelerar o seu negócio com inteligência artificial?</h2>
        <button className="cta-button">Fale pelo WhatsApp</button>
        <button className="cta-secondary">Enviar E-mail</button>
      </footer>
    </div>
  );
};

export default FaleConosco;
