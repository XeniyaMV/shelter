document.addEventListener('DOMContentLoaded', function () {
    // *BURGER MENU VARIABLES
        let burgerMenuIcon = document.querySelector('.burger');
        let burgerClickCounter = 0;
        let nav = document.querySelector('nav');
        let body = document.querySelector('body');
        let dark = document.createElement('div');
    
    // *SLIDER VARIABLES
    
    // *BURGER MENU FUNCTIONS
        dark.classList.add('dark_screen');
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
            if (nav.classList.contains('small_screen') && (!event.target.closest('.menu'))) {
                nav.classList.remove('small_screen');
                burgerMenuIcon.firstElementChild.style.transform = '';
                burgerClickCounter += 1;
                burgerMenuIcon.style.position = 'absolute';
                body.classList.remove('active');
                dark.style.width='0px';
    
            }       
        });
        
        nav.addEventListener('click', function(event) {
            
            if (event.target.tagName == 'A' && nav.classList.contains('small_screen')) {
                nav.classList.remove('small_screen');
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
                nav.classList.add('small_screen');
                body.classList.add('active');
                dark.style.width = `100vw`;
                body.prepend(dark);
            }
            else {
                burgerMenuIcon.firstElementChild.style.transform = '';
                burgerMenuIcon.style.position = 'absolute';
                nav.classList.remove('small_screen');
                body.classList.remove('active');
                dark.style.width='0px';
            }
        });

        function getMobilePetCard(petInfo) {
            let divPetCardContainer = document.createElement('div');
            let innerText = `
            <button class="circle_button"> <img src="/xeniyamv-JSFE2023Q1/shelter/assets/icons/Vector.svg" alt="x"> </button>
            <div class="clicked_card">
                <div class="pet_img">
                   <img src="${petInfo.img}" alt="${petInfo.name}">
                </div>
                <div class="pet_info">
                    <div class="title">
                        <h3 class="pet_name">${petInfo.name}</h3>
                        <h4 class="sub_title">${petInfo.type} - ${petInfo.breed}</h4>
                    </div>
                    <p>${petInfo.description}</p>
                    <ul>
                        <li class="item"><b>Age</b>: ${petInfo.age}</li>
                        <li class="item"><b>Inoculations</b>: ${petInfo.inoculations}</li>
                        <li class="item"><b>Diseases</b>: ${petInfo.diseases}</li>
                        <li class="item"><b>Parasites</b>: ${petInfo.parasites}</li>
                    </ul>
                </div>
            </div>
            `
            
            divPetCardContainer.classList.add('clicked_card_container');
            divPetCardContainer.innerHTML = innerText;
    
            return divPetCardContainer;
    
        }
    

        function getPetCard(petInfo) {
            let divPetCard = document.createElement('div');
            let divPetImg = document.createElement('div');
            let petImg = document.createElement('img');
            let p = document.createElement('p');
            let button = document.createElement('button');
    
            divPetCard.classList.add('pet_card');
            divPetImg.classList.add('pet_img');
            petImg.setAttribute('src', petInfo['img']);
            petImg.setAttribute('alt', petInfo['name']);
            p.classList.add('pet_name');
            p.textContent = petInfo['name'];
            button.textContent = 'Learn more';
    
            divPetImg.append(petImg);
            divPetCard.append(divPetImg);
            divPetCard.append(p);
            divPetCard.append(button);

            divPetCard.addEventListener('click', function() {
                const petsContainer = document.querySelector('.pets');
                const sliderContainer = document.querySelector('.slider_content');
                const oldCard = document.querySelector('.clicked_card');
                
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
    
                let buttonX = document.querySelector('.clicked_card_container button');
                buttonX.addEventListener('click', function() {
                    card.remove();
                    dark.remove();
                    body.style.overflow = '';
    
                })
    
                body.addEventListener('click', function(event) {
                    if (event.target.closest('.pet_card')) {
                        return;
                    }
                    if (!event.target.closest('.clicked_card')) {
                        card.remove();
                        dark.remove();
                        body.style.overflow = '';
                    }
                })
    
            })
    
    
            return divPetCard;
        }

        async function setPaginator(jsonPath) {
            const response = await fetch(jsonPath);
            const resJSON = await response.json();
            let paginatorContainer = document.querySelector('.slider_content');

            for (let item of resJSON) {
                let petCard = getPetCard(item);
                paginatorContainer.append(petCard);
            }
        }

        setPaginator('/xeniyamv-JSFE2023Q1/shelter/assets/pets_description.json');


})