document.addEventListener('DOMContentLoaded', function () {
// *BURGER MENU VARIABLES
    let burgerMenuIcon = document.querySelector('.menu__burger');
    let burgerClickCounter = 0;
    let nav = document.querySelector('nav');
    let body = document.querySelector('body');
    let dark = document.createElement('div');

// *SLIDER VARIABLES 

// *BURGER MENU FUNCTIONS
    dark.classList.add('dark-screen');
    dark.style.cssText = `
        background-color: black;
        opacity: 0.35;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0px;
        left: 0px;
    `;



    body.addEventListener('click', function(event) {
        if (nav.classList.contains('menu__nav_small-screen') && (!event.target.closest('.menu'))) {
            nav.classList.remove('menu__nav_small-screen');
            burgerMenuIcon.firstElementChild.style.transform = '';
            burgerClickCounter += 1;
            burgerMenuIcon.style.position = 'absolute';
            body.classList.remove('active');
            dark.style.width='0px';

        }       
    });
    
    nav.addEventListener('click', function(event) {
        
        if (event.target.tagName == 'A' && nav.classList.contains('menu__nav_small-screen')) {
            nav.classList.remove('menu__nav_small-screen');
            burgerMenuIcon.firstElementChild.style.transform = '';
            burgerClickCounter += 1;
            burgerMenuIcon.style.position = 'absolute';
            body.classList.remove('active');
            dark.style.width='0px';
        }
    });


    burgerMenuIcon.firstElementChild.addEventListener('click', function(event) {
        burgerClickCounter += 1;
        if (burgerClickCounter % 2 == 1) {
            burgerMenuIcon.firstElementChild.style.transform = 'rotate(90deg)';
            burgerMenuIcon.style.position = 'fixed';
            nav.classList.add('menu__nav_small-screen');
            body.classList.add('active');
            dark.style.width = `100vw`;
            body.prepend(dark);
        }
        else {
            burgerMenuIcon.firstElementChild.style.transform = '';
            burgerMenuIcon.style.position = 'absolute';
            nav.classList.remove('menu__nav_small-screen');
            body.classList.remove('active');
            dark.style.width='0px';
        }
    })

    // *SLIDER FUNCTIONS
    // <div class = "clicked_card_container">
    //     <button class="circle_button" > x </button>
    //     <div class="clicked_card">
    //        <div class="pet_img">
    //            <img src="/shelter/assets/images/pets-sophia.svg" alt="Sophia">
    //        </div>
    //        <div class="pet_info">
    //            <div class="title">
    //                <h3 class="pet_name"></h3>
    //                <h4 class="sub_title"></h4>
    //            </div>
    //            <p></p>
    //            <ul>
    //                <li class="item age"></li>
    //                <li class="item inoculations"></li>
    //                <li class="item diseases"></li>
    //                <li class="item parasites"></li>
    //            </ul>
    //        </div>
    //     </div>
    //</div>
    function getMobilePetCard(petInfo) {
        let divPetCardContainer = document.createElement('article');
        let innerText = `
        <button class="button button_circle popup-card__close-button"> <img src="/shelter/assets/icons/Vector.svg" alt="x"> </button>
        <div class="popup-card__container">
            <div class="popup-card__pet-img">
               <img class="img" src="${petInfo.img}" alt="${petInfo.name}">
            </div>
            <div class="popup-card__pet-info">
                <div class="popup-card__title">
                    <h3 class="h3 popup-card__pet-name">${petInfo.name}</h3>
                    <h4 class="popup-card__sub-title">${petInfo.type} - ${petInfo.breed}</h4>
                </div>
                <p class="popup-card__description">${petInfo.description}</p>
                <ul class="popup-card__list">
                    <li class="popup-card__list-item"><b>Age</b>: ${petInfo.age}</li>
                    <li class="popup-card__list-item"><b>Inoculations</b>: ${petInfo.inoculations}</li>
                    <li class="popup-card__list-item"><b>Diseases</b>: ${petInfo.diseases}</li>
                    <li class="popup-card__list-item"><b>Parasites</b>: ${petInfo.parasites}</li>
                </ul>
            </div>
        </div>
        `
        
        divPetCardContainer.classList.add('popup-card');
        divPetCardContainer.innerHTML = innerText;

        return divPetCardContainer;
    }

    // <div class="slider__pet-card">
    //    <div class="slider__pet-img">
    //        <img class="img" src="/shelter/assets/images/pets-sophia.svg" alt="Sophia">
    //    </div>
    //    <p class="slider__pet-name"> Sophia </p>
    //    <button class="button slider__button">Learn more</button>
    // </div>


    function getPetCard(petInfo) {
        let divPetCard = document.createElement('article');
        let divPetImg = document.createElement('div');
        let petImg = document.createElement('img');
        let title = document.createElement('h4');
        let button = document.createElement('button');

        divPetCard.classList.add('pet-card');
        divPetImg.classList.add('pet-card__pet-img');
        petImg.classList.add('img');
        petImg.setAttribute('src', petInfo['img']);
        petImg.setAttribute('alt', petInfo['name']);
        title.classList.add('pet-card__pet-name');
        title.textContent = petInfo['name'];
        button.classList.add('button');
        button.classList.add('pet-card__button');
        button.textContent = 'Learn more';

        divPetImg.append(petImg);
        divPetCard.append(divPetImg);
        divPetCard.append(title);
        divPetCard.append(button);

        divPetCard.addEventListener('click', function() {
            const petsContainer = document.querySelector('.pets');
            const oldCard = document.querySelector('.popup-card');
            const card = getMobilePetCard(petInfo);
            let dark = document.createElement('div');

            dark.style.cssText = `
                background-color: black;
                opacity: 0.35;
                width: 100vw;
                height: 100vh;
                position: fixed;
                top: 0px;
                left: 0px;
            `;

            if (oldCard) {
                oldCard.remove();
            }

            petsContainer.append(card);
            petsContainer.append(dark);
            body.style.overflow = 'hidden';

            let buttonX = document.querySelector('.popup-card .button');
            buttonX.addEventListener('click', function() {
                card.remove();
                dark.remove();
                body.style.overflow = '';

            });

            body.addEventListener('click', function(event) {
                if (event.target.closest('.pet-card')) {
                    return;
                }
                if (!event.target.closest('.popup-card__container')) {
                    card.remove();
                    dark.remove();
                    body.style.overflow = '';
                }
            });

        })

        return divPetCard;
    }

    // The function returns the random sample of k elements from the set of size n (0, 1, 2, ... , n-1)
    function getSample(n, k) {
        let arrN = [];
        let res = [];
        for (let i = 0; i < n; i++) {
            arrN.push(i);
        }

        for (let i = 0; i < k; i++) {
            let index = Math.floor(Math.random()*arrN.length);
            res.push(arrN[index]);
            arrN.splice(index, 1);
        }
        return res;
    }
    
    function getNewSetCardsIndexes(n, previousCardsIndexes, k) {
        let indexes = [];
        let res = [];
        for (let i = 0; i < n; i++) {
            res.push(i);
        }

        res = res.filter((item) => !(previousCardsIndexes.includes(item)));
        indexes = getSample(res.length, k);
        
        res = res.filter((item, i) => indexes.includes(i));
        return res;
    }
    
    
    async function setSlider(jsonPath) {
        const response = await fetch(jsonPath);
        const resJSON = await response.json();
        let sliderContainer = document.querySelector('.slider__content');
        let flag = 0;

        const rightButton = document.querySelector('.slider__right');
        const leftButton = document.querySelector('.slider__left');

        let cards = [];
        
        
        let k = Math.floor(sliderContainer.clientWidth / 270);
        let currentCardsIndexes = getSample(resJSON.length, k);
        let previousCardsIndexes = currentCardsIndexes;
        
        for (let i of currentCardsIndexes) {
            let petDiv = getPetCard(resJSON[i]);
            cards.push(petDiv);
            sliderContainer.append(petDiv);
        }



        
        rightButton.addEventListener('click', function(event) {
            const gap = (sliderContainer.clientWidth == 990) ? (990 - 270*3)/2 : (580 - 270*2);
            let k = 3;
            
            switch(sliderContainer.clientWidth) {
                case 990:
                    k = 3;
                    break;
                case 580:
                    k = 2;
                    break;
                case 270:
                    k = 1
                    break;                    
            }

            if (flag == 0 || flag == 1) {
                previousCardsIndexes = currentCardsIndexes.splice(0);
                for (let i = 0; i < previousCardsIndexes.length - k; i++) {
                    cards[i].remove();
                }
                cards.splice(0,previousCardsIndexes.length-k);
                previousCardsIndexes.splice(0,previousCardsIndexes.length - k);
                currentCardsIndexes = getNewSetCardsIndexes(resJSON.length, previousCardsIndexes, k);
            }
            else {
                for (let i = 0; i < previousCardsIndexes.length - k; i++) {
                    cards[i].remove();
                }
                cards.splice(0,previousCardsIndexes.length-k);
                previousCardsIndexes.splice(0,previousCardsIndexes.length - k);
                [previousCardsIndexes, currentCardsIndexes] = [currentCardsIndexes, previousCardsIndexes];
            }

            for (let i of currentCardsIndexes) {
                if (currentCardsIndexes.indexOf(i) < k) {
                    let petDiv = getPetCard(resJSON[i]);
                    cards.push(petDiv);
                    sliderContainer.append(petDiv);
                }
            }
            
            sliderContainer.scrollLeft += sliderContainer.clientWidth + gap;
            
            setTimeout(() => {
                for (let i = 0; i < previousCardsIndexes.length; i++) {
                    cards[i].remove();
                }
                cards.splice(0,previousCardsIndexes.length);

            }, 600)
            flag = 1;        
        })
        

        
        
        
        leftButton.addEventListener('click', function(event) {
            const gap = (sliderContainer.clientWidth == 990) ? (990 - 270*3)/2 : (580 - 270*2);
            let k = 3;
            
        
            switch(sliderContainer.clientWidth) {
                case 990:
                    k = 3;
                    break;
                case 580:
                    k = 2;
                    break;
                case 270:
                    k = 1
                    break;                    
            }

            if (flag == 0 || flag == -1) {
                previousCardsIndexes = currentCardsIndexes.splice(0);
                for (let i = 0; i < previousCardsIndexes.length - k; i++) {
                    cards[i].remove();
                }
                cards.splice(0,previousCardsIndexes.length-k);
                previousCardsIndexes.splice(0,previousCardsIndexes.length - k);
                currentCardsIndexes = getNewSetCardsIndexes(resJSON.length, previousCardsIndexes, k);


            }
            else {
                for (let i = 0; i < previousCardsIndexes.length - k; i++) {
                    cards[i].remove();
                }
                cards.splice(0,previousCardsIndexes.length-k);
                previousCardsIndexes.splice(0,previousCardsIndexes.length - k);
                [previousCardsIndexes, currentCardsIndexes] = [currentCardsIndexes, previousCardsIndexes];
            }

            let count = 1;
            for (let i of currentCardsIndexes) {
                if (currentCardsIndexes.indexOf(i) < k) {
                    let petDiv = getPetCard(resJSON[i]);
                    petDiv.style.transform = `translateX(${-(270+gap)*count}px)`;
                    sliderContainer.prepend(petDiv);
                    for (let j = 0; j < cards.length; j++) {
                        cards[j].style.transition = 'transform 0s';
                        cards[j].style.transform = `translateX(${-(270+gap)*count}px)`;
                    }
                    cards.push(petDiv);
                    count+=1;
                    
                    setTimeout(() => {
                        for (let j = 0; j < cards.length; j++) {
                            cards[j].style.transition = '';
                            cards[j].style.transform = `translateX(0px)`;
                        }
                    }, 100);
                }

            }


            setTimeout(() => {

                for (let i = 0; i < previousCardsIndexes.length; i++) {
                    cards[i].remove();
                }
                cards.splice(0,previousCardsIndexes.length);
            }, 600)

            flag = -1;

        })


    }
    
    setSlider('/shelter/assets/pets_description.json');




});