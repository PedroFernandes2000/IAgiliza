import React from 'react';
import './style/IntegrationSection.css';

function IntegrationSection() {
  return (
    <section className="integration">
      <h2>O melhor meio de integrar IA com:</h2>
      <div className="integration-grid">
        <div className="integration-item">
          <h3>Whatsapp</h3>
          <p>Faça que seus clientes tenham uma resposta automática para toda pergunta que ele faça sobre seus serviços.</p>
        </div>
        <div className="integration-item">
          <h3>ClickUP</h3>
          <p>Crie tarefas ou espaços automaticamente através de descrições simples nos próprios grupos com os funcionários ou colaboradores.</p>
        </div>
        <div className="integration-item">
          <h3>Gmail</h3>
          <p>Responda e-mails sem estresse com respostas automáticas em qualquer idioma.</p>
        </div>
        <div className="integration-item">
          <h3>Chat Bot</h3>
          <p>Use seu chat bot em seu site, empresa e muito mais. A tecnologia não tem limite.</p>
        </div>
      </div>
    </section>
  );
}

export default IntegrationSection;
