import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/Dashboard.css';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aqui você pode adicionar lógica para limpar dados do usuário, se necessário
        console.log('Usuário desconectado');
        navigate('/'); // Redireciona para a página principal
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};


// Páginas da Dashboard
const Main = () => (
    <main className="main-content">
        <h1 className="page-title">Bem-vindo, Pedro!</h1>
        <div className="widgets">
            <div className="widget">
                <h2>Status Atual dos Serviços</h2>
                <div className="chart-placeholder">[Gráfico]</div>
            </div>
            <div className="widget">
                <h2>Atividades Recentes</h2>
                <ul className="activity-list">
                    <li className="activity-item">Interação do Chatbot - Sucesso</li>
                    <li className="activity-item">E-mail Automático Enviado</li>
                    <li className="activity-item">Solicitação Aberta</li>
                </ul>
            </div>
        </div>
    </main>
);

const Relatorios = () => (
    <div className="relatorios-page">
        <h1>Relatórios</h1>
        <p>Aqui você pode acessar seus relatórios mensais e de desempenho.</p>
    </div>
);

const Servicos = () => (
    <div className="servicos-page">
        <h1>Serviços Contratados</h1>
        <p>Gerencie os serviços contratados e acompanhe o status.</p>
    </div>
);

const Suporte = () => (
    <div className="suporte-page">
        <h1>Solicitações e Suporte</h1>
        <p>Veja solicitações abertas e entre em contato com nosso suporte.</p>
    </div>
);

const Configuracoes = () => (
    <div className="configuracoes-page">
        <h1>Configurações</h1>
        <p>Atualize suas preferências e informações pessoais.</p>
    </div>
);

const Dashboard = () => {
    const [activePage, setActivePage] = useState('main'); // Estado para controlar a página ativa

    const renderContent = () => {
        switch (activePage) {
            case 'relatorios':
                return <Relatorios />;
            case 'servicos':
                return <Servicos />;
            case 'suporte':
                return <Suporte />;
            case 'configuracoes':
                return <Configuracoes />;
            default:
                return <Main />;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <ul className="nav-list">
                    <li
                        className={`nav-item ${activePage === 'main' ? 'active' : ''}`}
                        onClick={() => setActivePage('main')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`nav-item ${activePage === 'relatorios' ? 'active' : ''}`}
                        onClick={() => setActivePage('relatorios')}
                    >
                        Relatórios
                    </li>
                    <li
                        className={`nav-item ${activePage === 'servicos' ? 'active' : ''}`}
                        onClick={() => setActivePage('servicos')}
                    >
                        Serviços Contratados
                    </li>
                    <li
                        className={`nav-item ${activePage === 'suporte' ? 'active' : ''}`}
                        onClick={() => setActivePage('suporte')}
                    >
                        Solicitações e Suporte
                    </li>
                    <li
                        className={`nav-item ${activePage === 'configuracoes' ? 'active' : ''}`}
                        onClick={() => setActivePage('configuracoes')}
                    >
                        Configurações
                    </li>
                    <li className="nav-item">
                        <LogoutButton />
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <div className="content">{renderContent()}</div>


        </div>
    );
};

export default Dashboard;
