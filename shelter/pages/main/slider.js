function scroll(slider, pets, cardSize, direction) {
  const gap = slider.currentCardsNumber !== 1 ? (slider.currentWidth - slider.currentCardsNumber * cardSize) / (slider.currentCardsNumber - 1) : 40;
  const currentPetInds = slider.currentPetInds;
  const scrollDistance = slider.currentWidth + gap;


  if (slider.prevPetInds.inds.length !== 0 && slider.prevPetInds.side === ((direction === 'right') ? 1 : 0)) {
    slider.currentPetInds = slider.prevPetInds.inds;
  } else {
    const availablePetInds = pets.map((_, i) => i).filter((i) => !slider.currentPetInds.includes(i));
    const newSample = getSemple(availablePetInds.length, slider.currentCardsNumber);
    slider.currentPetInds = newSample.map((i) => availablePetInds[i]);
  }

  slider.prevPetInds = {
    inds: currentPetInds,
    side: direction === 'right' ? 0 : 1,
  };

  if (direction === 'right') {
    slider.currentPetInds
      .map((i) => getPetCard(pets[i]))
      .forEach((pet) => slider.sliderContainer.append(pet));
  } else {
    slider.currentPetInds
      .map((i) => getPetCard(pets[i]))
      .reverse()
      .forEach((pet) => slider.sliderContainer.prepend(pet));

    slider.sliderContainer.scrollBy({
      left: scrollDistance,
      behavior: 'instant',
    });
  }

  return (direction === 'right') ? scrollDistance : -scrollDistance;
}

async function setSlider() {
  const slider = {
    sliderContainer: document.querySelector('.slider__content'),
    currentWidth: document.querySelector('.slider__content').getBoundingClientRect().width,
    currentPetInds: [],
    prevPetInds: {inds: [], side: null},
    scrollRight: document.querySelector('.slider__right'),
    scrollLeft: document.querySelector('.slider__left'),

    get currentCardsNumber() {
      switch (this.currentWidth) {
        case 270:
          return 1;
        case 580:
          return 2;
        default:
          return 3;
      }
    }
  };

  const handleSliderResize = () => {
    const newSliderWidth = slider.sliderContainer.getBoundingClientRect().width;
    if (slider.currentWidth !== newSliderWidth) {
      slider.sliderContainer.innerHTML = '';
      slider.currentWidth = newSliderWidth;
      slider.currentPetInds = getSemple(pets.length, slider.currentCardsNumber);
      slider.currentPetInds.map((i) => getPetCard(pets[i])).forEach((pet) => slider.sliderContainer.append(pet));
      slider.prevPetInds.inds = [];
      slider.prevPetInds.side = null;
    }
  }

  const pets = await getPetDescriptions();

  if (pets !== 'FAIL') {
    slider.currentPetInds = getSemple(pets.length, slider.currentCardsNumber);
    slider.currentPetInds.map((i) => getPetCard(pets[i])).forEach((pet) => slider.sliderContainer.append(pet));
    let isScrolling = false;

    slider.scrollRight.addEventListener('click', () => {
      if (!isScrolling) {
        const scrollDistance = scroll(slider, pets, 270, 'right');
        isScrolling = true;

        slider.sliderContainer.scrollBy({
          left: scrollDistance,
          behavior: 'smooth',
        });

        const removeOldCards = () => {
          if (Math.abs(slider.sliderContainer.scrollLeft - scrollDistance) < 1) {
            for (let i = 0; i < slider.currentCardsNumber; i++) {
              slider.sliderContainer.firstChild.remove();
            }

            slider.sliderContainer.removeEventListener('scroll', removeOldCards);
            isScrolling = false;
          }
        };

        slider.sliderContainer.addEventListener('scroll', removeOldCards);

      }
    });

    slider.scrollLeft.addEventListener('click', () => {
      if (!isScrolling) {
        const scrollDistance = scroll(slider, pets, 270, 'left');
        isScrolling = true;

        slider.sliderContainer.scrollBy({
          left: scrollDistance,
          behavior: 'smooth',
        });

        const removeOldCards = () => {
          if (slider.sliderContainer.scrollLeft === 0) {
            for (let i = 0; i < slider.currentCardsNumber; i++) {
              slider.sliderContainer.lastChild.remove();
            }

            slider.sliderContainer.removeEventListener('scroll', removeOldCards);
            isScrolling = false;
          }
        };
  
        slider.sliderContainer.addEventListener('scroll', removeOldCards);
      }
    })
  }

  window.addEventListener('resize', handleSliderResize);
}

setSlider();
