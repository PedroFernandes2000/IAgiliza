// mockReplyApi.js - Simulando uma API para respostas prontas
export function getReplyTemplates() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "Obrigado pelo seu email. Estamos analisando sua solicitação e retornaremos em breve.",
          "Agradecemos seu contato. Por favor, aguarde enquanto processamos seu pedido."
        ]);
      }, 500);
    });
  }
  