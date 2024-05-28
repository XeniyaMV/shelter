const getPetCard = (petInfo) => {
  const card = document.createElement('article');
  const cardImgContainer = document.createElement('div');
  const cardName = document.createElement('h4');
  const cardButton = document.createElement('button');

  card.className = 'pet-card';
  cardImgContainer.className = 'pet-card__pet-img';
  cardName.className = 'pet-card__pet-name';
  cardButton.className = 'button pet-card__button';

  cardImgContainer.innerHTML = `<img class="img" src="${petInfo.img}" alt="${petInfo.name} pic"/>`;
  cardName.textContent = petInfo.name;
  cardButton.textContent = 'Learn more';

  card.append(cardImgContainer);
  card.append(cardName);
  card.append(cardButton);

  card.addEventListener('click', () => {
    const petsContainer = document.querySelector('.pets');
    const overlay = document.querySelector('.pets__overlay');
    const popupCard = getPopupPetCard(petInfo);

    petsContainer.append(popupCard);
    overlay.classList.add('pets__overlay_visible');
    document.body.classList.add('noscroll_pets');
  })

  return card;
};
