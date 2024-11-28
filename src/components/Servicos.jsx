import React, { useState } from "react";
import "./style/Servicos.css";

function Servicos() {
    const [messages, setMessages] = useState([
        { id: 1, sender: "bot", text: "Olá! Como posso ajudar você hoje?" },
    ]);
    const [userInput, setUserInput] = useState("");

    // Função para enviar mensagem para a API do ChatGPT
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessage = { id: Date.now(), sender: "user", text: userInput };
        setMessages((prev) => [...prev, newMessage]);
        setUserInput("");

        // Envia a mensagem para a API do ChatGPT
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer YOUR_API_KEY_HERE`, // Substitua pela sua chave API
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        ...messages.map((msg) => ({
                            role: msg.sender === "user" ? "user" : "assistant",
                            content: msg.text,
                        })),
                        { role: "user", content: userInput },
                    ],
                }),
            });

            const data = await response.json();
            const botMessage = {
                id: Date.now() + 1,
                sender: "bot",
                text: data.choices[0].message.content,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Erro ao conectar com o ChatGPT:", error);
            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, sender: "bot", text: "Desculpe, algo deu errado. Tente novamente mais tarde." },
            ]);
        }
    };

    const initialServices = [
        {
            id: 1,
            icon: "🧠",
            name: "Chatbots Personalizados",
            summary: "Automatize atendimentos com chatbots adaptados às necessidades do seu negócio.",
            details: `Criamos chatbots sob medida para empresas, capazes de atender às necessidades específicas de cada negócio. 
      Os chatbots podem ser integrados a plataformas como sites, aplicativos e redes sociais, proporcionando atendimento rápido e eficiente. 
      Benefícios: Atendimento 24/7, Redução de custos operacionais, Respostas consistentes e precisas.`,
        },
        {
            id: 2,
            icon: "💬",
            name: "Automação de WhatsApp com ChatGPT",
            summary: "Leve a eficiência da IA para conversas no WhatsApp com respostas naturais e rápidas.",
            details: `Integramos o poder do ChatGPT ao WhatsApp para criar interações automatizadas com um toque humano. 
      Benefícios: Respostas rápidas e personalizadas, Aumento na eficiência do atendimento, Redução da necessidade de intervenção humana.`,
        },
        {
            id: 3,
            icon: "📧",
            name: "Resposta Automática de E-mails",
            summary: "Agilize a comunicação empresarial com respostas automáticas configuráveis.",
            details: `Configure respostas automáticas para e-mails, agilizando a comunicação com clientes e parceiros. 
      Benefícios: Economia de tempo, Garantia de resposta imediata, Melhoria na organização da comunicação.`,
        },
        {
            id: 4,
            icon: "🎙️",
            name: "Resposta de WhatsApp com Voz",
            summary: "Automatize mensagens de voz para oferecer uma experiência mais humana no atendimento.",
            details: `Automatize mensagens de voz para WhatsApp, proporcionando um toque mais humano e interativo no atendimento. 
      Benefícios: Experiência diferenciada para o cliente, Capacidade de oferecer respostas claras e dinâmicas.`,
        },
        {
            id: 5,
            icon: "🌐",
            name: "Soluções de IA para Sites",
            summary: "Integre chatbots com IA diretamente no seu site para atender clientes e automatizar interações.",
            details: `Integre chatbots e outras soluções de IA diretamente ao seu site, oferecendo interações automatizadas para visitantes. 
      Benefícios: Atendimento direto no site, Melhoria na experiência do cliente, Aumento no engajamento e conversão de visitantes.`,
        },
    ];

    const [services, setServices] = useState(initialServices);
    const [expandedCard, setExpandedCard] = useState(1);

    const toggleCard = (id) => {
        const isMobileView = window.innerWidth < 800;

        // Se a largura for maior que 800px, reordene os cards
        if (!isMobileView) {
            const clickedService = services.find((service) => service.id === id);
            const remainingServices = services.filter((service) => service.id !== id);
            setServices([clickedService, ...remainingServices]);
        }

        // Expande ou recolhe o card
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="servicos">
            <header className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Soluções Inteligentes que Transformam Negócios</h1>
                    <p className="hero-subtitle">
                        Conheça nossos serviços e descubra como a inteligência artificial pode trazer mais eficiência para a sua empresa.
                    </p>
                </div>
                <div className="hero-chat">
                    <div className="chat-container">
                        <div className="chat-header">IAgiliza Chat</div>
                        <div className="chat-messages">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder="Digite sua mensagem..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                            <button onClick={sendMessage}><img src="src\components\images\imageSend.png" alt="" /></button>
                        </div>
                    </div>
                </div>
            </header>

            <section className="services-overview">
                <h2 className="section-title">O que Podemos Fazer por Você</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`service-card ${expandedCard === service.id ? "expanded" : ""} ${services.length % 2 === 1 && index === services.length - 1 ? "last-card-centered" : ""
                                }`}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-name">{service.name}</h3>
                            <p className="service-summary">
                                {expandedCard === service.id ? service.details : service.summary}
                            </p>
                            <button className="service-button" onClick={() => toggleCard(service.id)}>
                                {expandedCard === service.id ? "Mostrar Menos" : "Saiba Mais"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Servicos;
