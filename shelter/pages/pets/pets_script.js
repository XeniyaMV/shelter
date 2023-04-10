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
                console.log('link');
                nav.classList.remove('small_screen');
                burgerMenuIcon.firstElementChild.style.transform = '';
                burgerClickCounter += 1;
                burgerMenuIcon.style.position = 'absolute';
                body.style.overflow = '';
                dark.style.width='0px';
    
            }       
        });
        
        nav.addEventListener('click', function(event) {
            
            if (event.target.tagName == 'A' && nav.classList.contains('small_screen')) {
                nav.classList.remove('small_screen');
                burgerMenuIcon.firstElementChild.style.transform = '';
                burgerClickCounter += 1;
                burgerMenuIcon.style.position = 'absolute';
                body.style.overflow = '';
                dark.style.width='0px';
            }
        });
    
    
        burgerMenuIcon.firstElementChild.addEventListener('click', function(event) {
            burgerClickCounter += 1;
            if (burgerClickCounter % 2 == 1) {
                burgerMenuIcon.firstElementChild.style.transform = 'rotate(90deg)';
                burgerMenuIcon.style.position = 'fixed';
                nav.classList.add('small_screen');
                body.style.overflow = 'hidden';
                console.log(dark);
                dark.style.width = `100vw`;
                body.prepend(dark);
            }
            else {
                burgerMenuIcon.firstElementChild.style.transform = '';
                burgerMenuIcon.style.position = 'absolute';
                nav.classList.remove('small_screen');
                body.style.overflow = '';
                dark.style.width='0px';
            }
        })
    })