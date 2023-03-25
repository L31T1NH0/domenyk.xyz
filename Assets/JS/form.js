// Função assíncrona para obter o endereço IP do usuário
async function getIp() {
  const response = await fetch('https://api.ipify.org/?format=json');
  const { ip } = await response.json();
  return ip;
}

// Função assíncrona para enviar o formulário
async function submitForm(event) {
  event.preventDefault();

  // Selecionando os campos do formulário
  const nomeInput = document.querySelector('textarea[name=nome]');
  const mensagemInput = document.querySelector('textarea[name=msg]');

  // Obtendo os valores dos campos
  const nome = nomeInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  // Verificando se os campos estão preenchidos
  if (!mensagem) {
    mensagemInput.focus();
    return;
  }

  // Resetando os campos do formulário
  event.target.reset();

  // Obtendo a data e hora atual formatada
  const date = new Date();
  const hora = date.toLocaleTimeString('pt-BR', { hour12: true });
  const dataHora = `${hora} ${date.toLocaleDateString('pt-BR')}`;

  // Obtendo informações do navegador e sistema operacional do usuário
  const platform = navigator.userAgentData.platform;

  // Obtendo o endereço IP do usuário
  const ip = await getIp();

  // Enviando os dados do formulário para a API
  await fetch('https://api.sheetmonkey.io/form/3w66mRcD3wLtQvf4fXDkXK', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'Endereço IP': ip,
      Sistema: platform,
      'Data e Hora': dataHora,
      Nome: nome,
      Mensagem: mensagem,
    }),
  });
}

// Selecionando o formulário e adicionando um listener de evento
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);
