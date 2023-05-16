window.addEventListener('scroll', () => {
  let headerFixed = document.querySelector('.header__fixed');
  document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ?
    headerFixed.classList.add('scroll')
    :
    headerFixed.classList.remove('scroll');
});