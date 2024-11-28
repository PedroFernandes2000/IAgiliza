import React, { useState } from "react";
import "./style/Blog.css";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    {
      id: 1,
      title: "Como a Automação Está Transformando Empresas em 2024",
      summary: "Descubra como a automação pode aumentar a eficiência e reduzir custos em diversos setores.",
      image: "https://via.placeholder.com/400x200",
      date: "23 de Novembro de 2024",
      category: "Automação",
    },
    {
      id: 2,
      title: "Tendências de Inteligência Artificial para 2024",
      summary: "Conheça as principais inovações e previsões para o futuro da IA.",
      image: "https://via.placeholder.com/400x200",
      date: "15 de Novembro de 2024",
      category: "Tendências de IA",
    },
    {
      id: 3,
      title: "Casos de Sucesso: Empresas que Utilizam IA",
      summary: "Veja como empresas reais estão se beneficiando da inteligência artificial.",
      image: "https://via.placeholder.com/400x200",
      date: "10 de Novembro de 2024",
      category: "Casos de Sucesso",
    },
    // Adicione mais artigos conforme necessário
  ];

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blog">
      <header className="blog-hero">
        <h1 className="blog-title">Fique por Dentro da Revolução da Inteligência Artificial</h1>
        <p className="blog-subtitle">
          Notícias, tendências e insights que conectam você ao futuro da automação e IA.
        </p>
      </header>

      <div className="blog-search">
        <input
          type="text"
          placeholder="Busque por notícias ou categorias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="blog-articles">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-card">
            <img src={article.image} alt={article.title} className="article-image" />
            <div className="article-content">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-summary">{article.summary}</p>
              <p className="article-date">{article.date}</p>
              <button className="article-button">Leia Mais</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Blog;
