const ENTER_KEYCODE = 13;
const NOME_INPUT_SELECTOR = 'textarea[name=nome]';
const MENSAGEM_INPUT_SELECTOR = 'textarea[name=msg]';

const nomeInput = document.querySelector(NOME_INPUT_SELECTOR);
nomeInput.addEventListener('keydown', preventSubmitOnShiftEnter);
nomeInput.addEventListener('keydown', preventSubmitOnEnter);

const mensagemInput = document.querySelector(MENSAGEM_INPUT_SELECTOR);
mensagemInput.addEventListener('keydown', (event) => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  if (isFirefox) {
    // Impedir o envio da mensagem quando a tecla Enter for pressionada no Firefox
    if (event.keyCode === ENTER_KEYCODE && !event.shiftKey) {
      event.preventDefault();
    }
  } else {
    // Enviar a mensagem quando a tecla Enter for pressionada em outros navegadores
    submitOnEnter(event, form);
  }
});

function preventSubmitOnEnter(event) {
  if (event.keyCode === ENTER_KEYCODE) {
    event.preventDefault();
  }
}

function preventSubmitOnShiftEnter(event) {
  if (event.keyCode === ENTER_KEYCODE && event.shiftKey) {
    event.preventDefault();
  }
}

function submitOnEnter(event, form) {
  if (event.keyCode === ENTER_KEYCODE && !event.shiftKey) {
    event.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
}
