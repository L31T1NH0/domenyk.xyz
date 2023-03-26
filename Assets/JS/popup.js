// Selecionando elementos da DOM
const openBtn = document.querySelector('.open-popup');
const closeBtn = document.querySelector('.close-popup');
const popup = document.querySelector('.popup');

// Função para mostrar a popup
function showPopup() {
  popup.style.visibility = 'visible';
}

// Função para esconder a popup
function hidePopup() {
  popup.style.visibility = 'hidden';
}

// Adicionando listeners de evento aos botões
openBtn.addEventListener('click', showPopup);
closeBtn.addEventListener('click', hidePopup);

// Adicionando listener de evento ao documento
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    hidePopup();
  }
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.popup') && !event.target.closest('.open-popup')) {
    hidePopup();
  }
});
