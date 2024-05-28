function getPetInds (petsNumber, requiredArrayLen) {
  let firstInd = Math.floor(Math.random() * petsNumber);
  let result = [];
  let start = firstInd;
  let count = 0;
  for (let i = 0; i < requiredArrayLen; i++) {
    if (start >= petsNumber) {
      start = 0;
    }

    if (count === 8) {
      count = 0;
      firstInd = firstInd === 7 ? 0 : firstInd + 1;
      start = firstInd;
    }

    result.push(start);
    start += 1;
    count += 1;
  }

  return result;
}

async function setPagination() {
  const pagination = {
    paginationContainer: document.querySelector('.pagination__cards'),
    nextPage: document.querySelector('.pagination__right'),
    lastPage: document.querySelector('.pagination__right_fast'),
    prevPage: document.querySelector('.pagination__left'),
    firstPage: document.querySelector('.pagination__left_fast'),
    pageNumberContainer: document.querySelector('.pagination__page'),
    pNumber: 1,
    currentWidth: document.querySelector('.pagination__cards').getBoundingClientRect().width,
    petInds: [],
    get cardsNumber() {
      switch (this.currentWidth) {
        case 270:
          return 3;
        case 1200:
          return 8;
        default:
          return 6;
      }
    },

    get pageNumber() {
      return this.pNumber;
    },

    set pageNumber(number) {
      this.pNumber = number;
      this.pageNumberContainer.innerHTML = number;
    }
  };


  const pets = await getPetDescriptions('/shelter/assets/pets.json');

  if (pets !== 'FAIL') {
    const setCurrentPageCards = (startInd, endInd) => {
      pagination.petInds
        .slice(startInd, endInd)
        .map((i) => getPetCard(pets[i]))
        .forEach((pet) => pagination.paginationContainer.append(pet));
    };

    pagination.petInds = getPetInds(pets.length, 48);
    setCurrentPageCards(0, pagination.cardsNumber);

    const handlePaginationResize = () => {
      const newPaginationWidth = pagination.paginationContainer.getBoundingClientRect().width;
      if (pagination.currentWidth !== newPaginationWidth) {
        pagination.currentWidth = newPaginationWidth;
        pagination.paginationContainer.innerHTML = '';
        setCurrentPageCards(0, pagination.cardsNumber);

        pagination.pageNumber = 1;
        pagination.nextPage.disabled = false;
        pagination.lastPage.disabled = false;
        pagination.prevPage.disabled = true;
        pagination.firstPage.disabled = true;
      }
    }

    pagination.nextPage.addEventListener('click', () => {
      pagination.pageNumber = pagination.pageNumber + 1;

      if (pagination.pageNumber === 2) {
        pagination.prevPage.disabled = false;
        pagination.firstPage.disabled =false;
      }

      const startInd = (pagination.pageNumber - 1) * pagination.cardsNumber;

      pagination.paginationContainer.innerHTML = '';
      setCurrentPageCards(startInd, startInd + pagination.cardsNumber);

      if (pagination.pageNumber === 48 / pagination.cardsNumber) {
        pagination.nextPage.disabled = true;
        pagination.lastPage.disabled = true;
      }
    });

    pagination.lastPage.addEventListener('click', () => {
      pagination.pageNumber = 48 / pagination.cardsNumber;

      pagination.nextPage.disabled = true;
      pagination.lastPage.disabled = true;
      pagination.prevPage.disabled = false;
      pagination.firstPage.disabled = false;

      const startInd = (pagination.pageNumber - 1) * pagination.cardsNumber;

      pagination.paginationContainer.innerHTML = '';
      setCurrentPageCards(startInd, startInd + pagination.cardsNumber);
    });

    pagination.prevPage.addEventListener('click', () => {
      pagination.pageNumber = pagination.pageNumber - 1;

      if (pagination.pageNumber === 48 / pagination.cardsNumber - 1) {
        pagination.nextPage.disabled = false;
        pagination.lastPage.disabled =false;
      }

      const startInd = (pagination.pageNumber - 1) * pagination.cardsNumber;

      pagination.paginationContainer.innerHTML = '';
      setCurrentPageCards(startInd, startInd + pagination.cardsNumber);

      if (pagination.pageNumber === 1) {
        pagination.prevPage.disabled = true;
        pagination.firstPage.disabled = true;
      }
    });

    pagination.firstPage.addEventListener('click', () => {
      pagination.pageNumber = 1;

      pagination.prevPage.disabled = true;
      pagination.firstPage.disabled = true;
      pagination.nextPage.disabled = false;
      pagination.lastPage.disabled = false;

      pagination.paginationContainer.innerHTML = '';
      setCurrentPageCards(0, pagination.cardsNumber);
    });

    window.addEventListener('resize', handlePaginationResize);
  }

}

setPagination();
