// Função para enviar o formulário
async function submitForm(event) {
    event.preventDefault();
    
    // Selecionando os campos do formulário
    const nomeInput = document.querySelector('textarea[name=nome]');
    const mensagemInput = document.querySelector('textarea[name=msg]');
    
    // Obtendo os valores dos campos
    const nome = nomeInput.value;
    const mensagem = mensagemInput.value;
    
    // Enviando os dados do formulário para a API
    const response = await fetch('https://api.sheetmonkey.io/form/eJP734LDjojFFx6Ztu1g4N', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ nome, mensagem }),
    });
    
    // Verificando se a requisição foi bem-sucedida
    if (response.ok) {
      // Resetando os campos do formulário
      document.getElementById('myForm').reset();
    } else {
      console.error('Erro ao enviar formulário:', response.statusText);
    }
  }
  
  // Selecionando o formulário e adicionando listener de evento
  const form = document.querySelector('form');
  form.addEventListener('submit', submitForm);
  