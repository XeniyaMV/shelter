const getPopupPetCard = (petInfo) => {
  const card = document.createElement('article');
  const closeButton = document.createElement('button');
  const cardContent = document.createElement('div');
  const cardImgContainer = document.createElement('div');
  const petInfoContainer = document.createElement('div');
  const title = document.createElement('div');
  const description = document.createElement('p');
  const list = document.createElement('ul');

  card.className = 'popup-card';
  closeButton.className = 'button button_circle popup-card__close-button';
  cardContent.className = 'popup-card__container';
  cardImgContainer.className = 'popup-card__pet-img';
  petInfoContainer.className = 'popup-card__pet-info';
  title.className = 'popup-card__title';
  description.className = 'popup-card__description';
  list.className = 'popup-card__list';

  closeButton.innerHTML = '<img src="/shelter/shelter/assets/icons/Vector.svg" alt="x">';
  cardImgContainer.innerHTML = `<img class="img" src="${petInfo.img}" alt="${petInfo.name} pic"/>`;
  title.innerHTML = `
    <h3 class="h3 popup-card__pet-name">${petInfo.name}</h3>
    <h4 class="popup-card__sub-title">${petInfo.type} - ${petInfo.breed}</h4>
  `;
  description.innerHTML = petInfo.description;
  list.innerHTML = `
    <li class="popup-card__list-item"><b>Age</b>: ${petInfo.age}</li>
    <li class="popup-card__list-item"><b>Inoculations</b>: ${petInfo.inoculations}</li>
    <li class="popup-card__list-item"><b>Diseases</b>: ${petInfo.diseases}</li>
    <li class="popup-card__list-item"><b>Parasites</b>: ${petInfo.parasites}</li>
  `;

  petInfoContainer.append(title, description, list);
  cardContent.append(cardImgContainer, petInfoContainer);
  card.append(closeButton, cardContent);

  const handleClose = () => {
    const overlay = document.querySelector('.pets__overlay');
    card.remove();
    overlay.classList.remove('pets__overlay_visible');
    document.body.classList.remove('noscroll_pets');
  };

  closeButton.addEventListener('click', handleClose);
  card.addEventListener('click', (event) => {
    if (event.target.className === 'popup-card') {
      handleClose();
    }
  })

  return card;
};
