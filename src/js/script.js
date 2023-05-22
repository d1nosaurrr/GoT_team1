window.addEventListener('scroll', () => {
  let headerFixed = document.querySelector('.header__fixed');
  let mainNew = document.querySelector('.main');

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
    if(document.querySelector('.container').clientHeight < 560){
      mainNew.classList.add("mainNew");
    }
    headerFixed.classList.add('scroll');
  }
   else{
    if(document.querySelector('.container').clientHeight > 560){
      mainNew.classList.remove("mainNew");
    }
    headerFixed.classList.remove('scroll');
   }
})