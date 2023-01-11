const open_btn = document.querySelector('.open-popup');
const close_btn = document.querySelector('.close-popup');
const popup = document.querySelector('.popup');
open_btn.addEventListener('click', () => {
 popup.style.visibility = 'visible';
});
close_btn.addEventListener('click', () => {
    popup.style.visibility = 'hidden';
});
