const petsOverlay = document.querySelector('.pets__overlay');

petsOverlay.addEventListener('click', () => {
  const popupCard = document.querySelector('.popup-card');

  petsOverlay.classList.remove('pets__overlay_visible');
  document.body.classList.remove('noscroll_pets');
  popupCard.remove();
});
