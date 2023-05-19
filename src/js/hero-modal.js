const refs = {
  // openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};
const modalHero = document.querySelector('.modal');
const classToKeep = 'modal';

// refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.modal.addEventListener('click', toggleByBackdrop);
document.addEventListener('keydown', handleModalCloseOnESC);

function toggleByBackdrop({ target }) {
  // console.log(target.classList);
  if (target.classList.contains('backdrop')) {
    refs.modal.classList.toggle('backdrop--is-hidden');
    document.body.classList.toggle('modal-open');

    modalHero.className = classToKeep;
  }
}

function handleModalCloseOnESC({ key }) {
  // console.log(key)
  if (key === 'Escape' && !refs.modal.classList.contains('backdrop--is-hidden')) {
    toggleModal();
    modalHero.className = classToKeep;
  }
}

function toggleModal() {
  refs.modal.classList.toggle('backdrop--is-hidden');
  document.body.classList.toggle('modal-open');
}

//=========open hero modal==========//
function setupCardClick() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((char) => {
    const openHeroModal = (e) => {
      const heroImageUrl = e.currentTarget.children[0].children[0].children[0].src;
      const heroImage = document.getElementById('hero-image');
      heroImage.src = heroImageUrl;

      const family = e.currentTarget.children[1].textContent;

      const heroFamily = document.querySelector('.family');
      heroFamily.innerHTML = `Family:&nbsp${family}`;

      const born = e.currentTarget.children[2].textContent;
      const heroBorn = document.querySelector('.born');
      heroBorn.innerHTML = `Born:&nbsp${born}`;

      const died = e.currentTarget.children[3].textContent;
      const heroDied = document.querySelector('.died');
      heroDied.innerHTML = `Died:&nbsp${died}`;

      const normFamily = family.toLowerCase().replace(/\s/g, '');
      modalHero.classList.add(normFamily);

      toggleModal();
    };
    char.addEventListener('click', openHeroModal);
  });
}
//=========open hero modal==========//
