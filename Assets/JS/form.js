async function getIp() {
  const response = await fetch('https://api.ipify.org/?format=json');
  const data = await response.json();
  
  // Adicionando alerta para verificar se a solicitação foi bem-sucedida ou não
  if (response.ok) {
    alert(`Endereço IP obtido com sucesso: ${data.ip}`);
  } else {
    alert(`Não foi possível obter o endereço IP. Código do erro: ${response.status}`);
  }
  
  return data.ip;
}

// Função para enviar o formulário
async function submitForm(event) {
  event.preventDefault();

  // Selecionando os campos do formulário
  const nomeInput = document.querySelector('textarea[name=nome]');
  const mensagemInput = document.querySelector('textarea[name=msg]');

  // Obtendo os valores dos campos
  const nome = nomeInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  // Verificando se os campos estão preenchidos
  if (mensagem === '') {
    mensagemInput.focus();
    return;
  }

  // Resetando os campos do formulário
  event.target.reset();

  // Obtendo a data e hora atual formatada
  const date = new Date();
  const hora = date.toLocaleTimeString('pt-BR', {hour12: true});
  const dataHora = hora + ' ' + date.toLocaleDateString('pt-BR');

  // Obtendo informações do navegador e sistema operacional do usuário
  const platform = navigator.userAgentData.platform;

  try {
    // Obtendo o endereço IP do usuário
    const ip = await getIp();

    // Enviando os dados do formulário para a API
    const response = await fetch('https://api.sheetmonkey.io/form/3w66mRcD3wLtQvf4fXDkXK', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({'Endereço IP': ip, Sistema: platform, 'Data e Hora': dataHora, Nome: nome, Mensagem: mensagem}),
    });

    // Verificando se o envio foi bem-sucedido
    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
    } else {
      throw new Error('Erro ao enviar a mensagem.');
    }
  } catch (error) {
    alert('Ocorreu um erro ao enviar a mensagem:\n' + error.message);
  }
}

// Selecionando o formulário e adicionando listener de evento
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);
