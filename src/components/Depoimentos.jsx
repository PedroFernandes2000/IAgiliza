import React from "react";
import "./style/Depoimentos.css";

const cases = [
  {
    id: 1,
    title: "Imobiliária X reduziu o tempo de resposta em 70%",
    summary:
      "Com a implementação de chatbots personalizados, a Imobiliária X alcançou uma eficiência significativa no atendimento aos clientes.",
    image: "https://via.placeholder.com/400x200",
    sector: "Imobiliárias",
    results: [
      "Redução de 70% no tempo de resposta.",
      "Aumento de 25% na conversão de leads.",
    ],
    solution:
      "Implementamos um chatbot integrado ao WhatsApp e ao site, permitindo atendimento 24/7 e respostas rápidas para dúvidas frequentes.",
  },
  {
    id: 2,
    title: "E-commerce aumentou vendas em 40%",
    summary:
      "A integração de automação de e-mails ajudou a melhorar a retenção de clientes e impulsionou as conversões de carrinhos abandonados.",
    image: "https://via.placeholder.com/400x200",
    sector: "E-commerce",
    results: [
      "40% de aumento nas vendas.",
      "50% de recuperação de carrinhos abandonados.",
    ],
    solution:
      "Automação de e-mails com respostas personalizadas e acompanhamento de carrinhos.",
  },
  // Adicione mais casos conforme necessário
];

const CasosSucesso = () => {
  return (
    <div className="casos-sucesso">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">Transformando Negócios com Inteligência Artificial</h1>
        <p className="hero-subtitle">
          Descubra como nossas soluções ajudaram empresas de diferentes setores a alcançar agilidade, eficiência e inovação.
        </p>
        <button className="cta-button">Solicite uma Consultoria</button>
      </header>

      {/* Resultados em Números */}
      <section className="resultados">
        <h2 className="section-title">Resultados em Números</h2>
        <div className="resultados-grid">
          <div className="resultado-card">
            <h3>40%</h3>
            <p>Redução no tempo de atendimento para e-commerce.</p>
          </div>
          <div className="resultado-card">
            <h3>25%</h3>
            <p>Aumento na conversão de leads para imobiliárias.</p>
          </div>
          <div className="resultado-card">
            <h3>50+</h3>
            <p>Empresas atendidas em diversos setores.</p>
          </div>
        </div>
      </section>

      {/* Casos de Sucesso */}
      <section className="casos">
        <h2 className="section-title">Casos de Sucesso</h2>
        <div className="casos-grid">
          {cases.map((item) => (
            <div key={item.id} className="caso-card">
              <img src={item.image} alt={item.title} className="caso-image" />
              <div className="caso-content">
                <h3 className="caso-title">{item.title}</h3>
                <p className="caso-summary">{item.summary}</p>
                <button className="caso-button">Leia o Caso Completo</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Final */}
      <footer className="cta-final">
        <h2>Pronto para transformar o seu negócio com inteligência artificial?</h2>
        <button className="cta-button">Solicitar Consultoria</button>
        <button className="cta-secondary">Agendar Demonstração Gratuita</button>
      </footer>
    </div>
  );
};

export default CasosSucesso;
