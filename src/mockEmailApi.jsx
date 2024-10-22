// mockEmailApi.js
let emails = [
    { id: 1, subject: 'Primeiro Email', body: 'Conteúdo do primeiro email', needsResponse: true },
    { id: 2, subject: 'Segundo Email', body: 'Conteúdo do segundo email', needsResponse: true },
  ];
  
  // Função que retorna emails que precisam de resposta
  export function getEmails() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(emails.filter(email => email.needsResponse));
      }, 1000);
    });
  }

  export function addEmail() {
    const newEmail = {
      id: emails.length + 1,
      subject: `Novo Email ${emails.length + 1}`,
      body: 'Esse é o conteúdo de um novo email',
      needsResponse: true,
    };
    emails.push(newEmail);
  }
  
  // Função para marcar um email como respondido
  export function markEmailAsResponded(id) {
    emails = emails.map(email =>
      email.id === id ? { ...email, needsResponse: false } : email
    );
  }
  