import React, { useState } from "react";
import "./style/Home.css";

const Home = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "João Silva",
      role: "CEO, Empresa X",
      text: "A IAgiliza nos ajudou a transformar nosso atendimento ao cliente. Um verdadeiro divisor de águas!",
    },
    {
      id: 2,
      name: "Ana Costa",
      role: "CTO, Startup Y",
      text: "Implementamos a automação com a IAgiliza e economizamos 30% do nosso tempo operacional.",
    },
    {
      id: 3,
      name: "Carlos Pereira",
      role: "Gerente, Loja Z",
      text: "Com os chatbots personalizados, dobramos nossas vendas online em apenas 6 meses.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Soluções de Automação e Inteligência Artificial</h1>
          <p className="hero-subtitle">
            Transforme seus processos e otimize o atendimento com as soluções inovadoras da IAgiliza.
          </p>
          <div className="hero-cta">
            <button className="cta-button primary">Solicitar Orçamento</button>
            <button className="cta-button secondary">Conheça Nossos Serviços</button>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="services">
        <h2 className="section-title">Nossos Serviços</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Chatbots Personalizados</h3>
            <p>
              Automatize o atendimento ao cliente com chatbots sob medida para o seu negócio.
            </p>
          </div>
          <div className="service-card">
            <h3>Automação de WhatsApp</h3>
            <p>Melhore a comunicação usando inteligência artificial no WhatsApp.</p>
          </div>
          <div className="service-card">
            <h3>Respostas Automáticas de E-mails</h3>
            <p>
              Agilize suas respostas com e-mails automáticos configurados com IA avançada.
            </p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="testimonials">
        <h2 className="section-title">Depoimentos de Clientes</h2>
        <div className="testimonial-carousel">
          <button className="carousel-button left" onClick={previousTestimonial}>
            &lt;
          </button>
          <div className="testimonial-card">
            <p>{testimonials[currentTestimonialIndex].text}</p>
            <h4>{testimonials[currentTestimonialIndex].name}</h4>
            <p>{testimonials[currentTestimonialIndex].role}</p>
          </div>
          <button className="carousel-button right" onClick={nextTestimonial}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
