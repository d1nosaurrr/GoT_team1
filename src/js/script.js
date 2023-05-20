window.addEventListener('scroll', () => {
  let headerFixed = document.querySelector('.header__fixed');
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
    if(document.querySelector('.container').clientHeight < 560){
      let mainNew = document.querySelector('.main');
      mainNew.classList.add("mainNew");
    }
    headerFixed.classList.add('scroll');
  }
   else{
    if(document.querySelector('.container').clientHeight > 560){
      let mainNew = document.querySelector('.main');
      mainNew.classList.remove("mainNew");
    }
    headerFixed.classList.remove('scroll');
   }
})