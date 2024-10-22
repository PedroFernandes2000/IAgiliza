import React, { useState, useEffect } from 'react';
import { getReplyTemplates } from './mockReplyApi';
import { markEmailAsResponded } from './mockEmailApi';
import { useParams, useNavigate } from 'react-router-dom';

const EmailReply = () => {
  const { id } = useParams();  // Pega o ID do email da URL
  const [replyTemplates, setReplyTemplates] = useState([]);  // Guarda os templates de resposta
  const [selectedReply, setSelectedReply] = useState('');  // Guarda a resposta selecionada e editada
  const [isEditing, setIsEditing] = useState(false);  // Indica se o campo está sendo editado
  const navigate = useNavigate();  // Para redirecionar o usuário

  useEffect(() => {
    const fetchReplies = async () => {
      const replies = await getReplyTemplates();
      setReplyTemplates(replies);  // Carrega as respostas automáticas da API simulada
    };

    fetchReplies();
  }, []);

  const handleSelectReply = (reply) => {
    setSelectedReply(reply);  // Define a resposta selecionada
    setIsEditing(true);  // Ativa o modo de edição
  };

  const handleSend = () => {
    markEmailAsResponded(Number(id));  // Marca o email como respondido na "API"
    alert(`Email com ID ${id} enviado com a seguinte resposta: \n${selectedReply}`);
    navigate('/');  // Redireciona para a rota raiz ("/")
  };

  return (
    <div>
      <h2>Responder Email {id}</h2>

      {/* Exibe as opções de respostas automáticas */}
      {replyTemplates.length > 0 ? (
        <div className="textArea">
          {replyTemplates.map((reply, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <textarea
                value={selectedReply === reply ? selectedReply : reply}
                onChange={(e) => setSelectedReply(e.target.value)}
                rows="4"
                cols="50"
              />
              <br />
              {/* Botão para escolher a resposta automática */}
              <button className="Button" onClick={() => handleSelectReply(reply)}>
                Escolher essa Resposta
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando respostas...</p>
      )}

      {/* Mostra a resposta selecionada em um campo editável */}
      {isEditing && (
        <div>
          <h3>Resposta Selecionada</h3>
          <textarea
            value={selectedReply}
            onChange={(e) => setSelectedReply(e.target.value)}  // Permite que o usuário edite o conteúdo
            rows="6"
            cols="60"
          />
          <br />
          {/* Botão para enviar a resposta */}
          <button onClick={handleSend}>Enviar Resposta</button>
          
        </div>
      )}
    </div>
  );
};

export default EmailReply;
