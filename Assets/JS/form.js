// Selecionando o campo de nome e adicionando ouvinte de evento de teclado
const nomeInput = document.querySelector('textarea[name=nome]');
nomeInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
  if (event.keyCode === 13 && event.shiftKey) {
    event.preventDefault();
  }
});

// Função para obter o endereço IP do usuário
async function getIp() {
  const response = await fetch('https://api.ipify.org/?format=json');
  const data = await response.json();
  return data.ip;
}

// Função para obter a localização a partir das coordenadas geográficas
async function getLocation(latitude, longitude) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=pt-BR`);
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Função para enviar o formulário
async function submitForm(event, location) {
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

    // Obtendo o endereço IP do usuário
    const ip = await getIp();

  // Resetando os campos do formulário
  event.target.reset();

  // Obtendo a data e hora atual formatada
  const date = new Date();
  const hora = date.toLocaleTimeString('pt-BR', {hour12: true});
  const dataHora = hora + ' ' + date.toLocaleDateString('pt-BR');

  // Obtendo informações do navegador e sistema operacional do usuário
  const platform = navigator.userAgentData.platform;

  // Enviando os dados do formulário para a API
  await fetch('https://api.sheetmonkey.io/form/3w66mRcD3wLtQvf4fXDkXK', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({País: location.country, Estado: location.state, Cidade: location.city, 'Endereço IP': ip, Sistema: platform, 'Data e Hora': dataHora, Nome: nome, Mensagem: mensagem}),
  });
}

// Selecionando o formulário e adicionando listener de evento
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

window.addEventListener('load', async function() {
  // Obtendo a localização do usuário
  const successCallback = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = await getLocation(latitude, longitude);

    // Chamando a função submitForm com a localização obtida
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => submitForm(event, location));
  };

  // Obtendo as coordenadas geográficas do usuário
  navigator.geolocation.getCurrentPosition(successCallback);
});

// Adicionando listener de evento para o input de mensagem
const mensagemInput = document.querySelector('textarea[name=msg]');
mensagemInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});
