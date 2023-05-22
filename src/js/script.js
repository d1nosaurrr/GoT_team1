window.addEventListener('scroll', () => {
  let headerFixed = document.querySelector('.header__fixed');
  let mainNew = document.querySelector('.main');

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    if (document.querySelector('.container').clientHeight < 560) {
      mainNew.classList.add('mainNew');
    }
    headerFixed.classList.add('scroll');
  } else {
    if (document.querySelector('.container').clientHeight > 560) {
      mainNew.classList.remove('mainNew');
    }
    headerFixed.classList.remove('scroll');
  }
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