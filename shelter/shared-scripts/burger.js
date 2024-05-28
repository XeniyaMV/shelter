const burger = document.querySelector('.menu__burger');
const navMenu = document.querySelector('.menu__nav');
const overlay = document.querySelector('.menu__overlay');

const handleClick = () => {
  burger.classList.toggle('menu__burger_open');
  navMenu.classList.toggle('menu__nav_open');
  overlay.classList.toggle('menu__overlay_visible');
  document.body.classList.toggle('noscroll');
};

const handleBurgerClose = () => {
  burger.classList.remove('menu__burger_open');
  navMenu.classList.remove('menu__nav_open');
  overlay.classList.remove('menu__overlay_visible');
  document.body.classList.remove('noscroll');
};

for (const child of navMenu.children) {
  child.addEventListener('click', handleBurgerClose);
}

burger.addEventListener('click', handleClick);
overlay.addEventListener('click', handleBurgerClose);
window.addEventListener('resize', handleBurgerClose);
