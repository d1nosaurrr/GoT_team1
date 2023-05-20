window.addEventListener('scroll', () => {
  let headerFixed = document.querySelector('.header__fixed');
  document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ?
    headerFixed.classList.add('scroll')
    :
    headerFixed.classList.remove('scroll');
});

const dropdown = document.querySelector('.header__dropdown');
const filterBlock = document.querySelector('.filter__block');
let isOpen = false;
dropdown.addEventListener('click', () => {
  isOpen ? filterBlock.classList.remove('active') : filterBlock.classList.add('active');
  isOpen ? dropdown.style.transform = 'rotate(0)'
    : dropdown.style.transform = 'rotate(180deg)';
  isOpen = !isOpen;
});