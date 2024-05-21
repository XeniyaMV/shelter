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

  return card;
};
