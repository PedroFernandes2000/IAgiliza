import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoResponseConfig = () => {
  const [autoResponse, setAutoResponse] = useState('');
  const navigate = useNavigate();  // Para redirecionar o usuário

  const handleSave = () => {
    alert(`Resposta automática salva: "${autoResponse}"`);
  };

  return (
    <div>
      <h2>Configuração de Respostas Automáticas</h2>
      <textarea
        value={autoResponse}
        onChange={(e) => setAutoResponse(e.target.value)}
        placeholder="Digite como voçê quer a sua resposta automática"
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSave}>Salvar Resposta</button>
    </div>
  );
};

export default AutoResponseConfig;
