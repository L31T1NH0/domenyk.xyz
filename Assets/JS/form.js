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
  const hora = date.toLocaleTimeString('pt-BR', {hour12: true, second: undefined});
  const dataHora = hora + ' ' + date.toLocaleDateString('pt-BR');

  // Enviando os dados do formulário para a API
  const response = await fetch('https://api.sheetmonkey.io/form/3w66mRcD3wLtQvf4fXDkXK', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ Data: dataHora, Nome: nome, Mensagem: mensagem }),
  });
}

// Selecionando o formulário e adicionando listener de evento
const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

// Adicionando listener de evento para o input de mensagem
const mensagemInput = document.querySelector('textarea[name=msg]');
mensagemInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
});
