const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.modal.addEventListener('click', toggleByBackdrop);
document.addEventListener('keydown', handleModalCloseOnESC);

function toggleByBackdrop({ target }) {
  // console.log(target.classList);
  if (target.classList.contains('backdrop')) {
    refs.modal.classList.toggle('backdrop--is-hidden');
    document.body.classList.toggle('modal-open');
  }
}

function handleModalCloseOnESC({ key }) {
  // console.log(key)
  if (key === 'Escape' && !refs.modal.classList.contains('backdrop--is-hidden')) {
    toggleModal();
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
      toggleModal();
    };
    char.addEventListener('click', openHeroModal);
  });
}
//=========open hero modal==========//
