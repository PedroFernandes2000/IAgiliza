import React, { useState } from "react";
import "./style/ChatButton.css";

const ChatButton = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: "bot", text: "Olá! Como posso ajudar você hoje?" },
    ]);
    const [userInput, setUserInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Função para enviar mensagem para a API do ChatGPT
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessage = { id: Date.now(), sender: "user", text: userInput };
        setMessages((prev) => [...prev, newMessage]);
        setUserInput("");

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
                {
                    id: Date.now() + 1,
                    sender: "bot",
                    text: "Desculpe, algo deu errado. Tente novamente mais tarde.",
                },
            ]);
        }
    };

    return (
        <>
            {/* Botão para abrir o chat */}
            <button
                className="chat-button"
                aria-label="Abrir chat com a IAgiliza"
                onClick={() => setIsChatOpen((prev) => !prev)}
            >
                💬
            </button>

            {/* Chatbox */}
            {isChatOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <span>IAgiliza Chat</span>
                        <button
                            className="chatbox-close"
                            aria-label="Fechar chat"
                            onClick={() => setIsChatOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                    <div className="chatbox-body">
                        <div className="chatbox-messages">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`chatbox-message ${msg.sender === "user" ? "user" : "bot"}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="chatbox-input">
                            <input
                                type="text"
                                placeholder="Digite sua mensagem..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                aria-label="Digite sua mensagem"
                            />
                            <button onClick={sendMessage} aria-label="Enviar mensagem">
                                <img className="img-button" src="src\components\images\imageSend.png" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatButton;
