const ENTER_KEYCODE = 13;
const NOME_INPUT_SELECTOR = 'textarea[name=nome]';
const MENSAGEM_INPUT_SELECTOR = 'textarea[name=msg]';

const nomeInput = document.querySelector(NOME_INPUT_SELECTOR);
nomeInput.addEventListener('keydown', preventSubmitOnShiftEnter);
nomeInput.addEventListener('keydown', preventSubmitOnEnter);

const mensagemInput = document.querySelector(MENSAGEM_INPUT_SELECTOR);
mensagemInput.addEventListener('keydown', (event) => {
  submitOnEnter(event, form);
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
