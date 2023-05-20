const refs = {
  // openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]')
};
const modalHero = document.querySelector('.modal');
const classToKeep = 'modal';



const toggleByBackdrop = ({ target }) => {
  // console.log(target.classList);
  if (target.classList.contains('backdrop')) {
    refs.modal.classList.toggle('backdrop--is-hidden');
    document.body.classList.toggle('modal-open');
    klassToKeep();
  }
};

const klassToKeep = () => {
  setTimeout(function() {
    modalHero.className = classToKeep;
  }, 100);
};
const toggleModal = () => {
  refs.modal.classList.toggle('backdrop--is-hidden');
  document.body.classList.toggle('modal-open');
};
const handleModalCloseOnESC = ({ key }) => {
  // console.log(key)
  if (key === 'Escape' && !refs.modal.classList.contains('backdrop--is-hidden')) {
    toggleModal();
    klassToKeep();
  }
};

// =========open hero modal==========//

const setupCardClick = (list) => {
  const cards = document.querySelectorAll('.card');

  cards.forEach((char) => {
    char.addEventListener('click', () => {
      const heroName = char.querySelector('.card__text').textContent;

      const hero = list.find(
        ({ fullName }) =>
          fullName.toLowerCase().trim() === heroName.toLowerCase().trim()
      );

      if (hero) {
        console.log('hero.image', hero.image);
        const heroImage = document.getElementById('hero-image');
        heroImage.src = hero.imageUrl;

        const heroFamily = document.querySelector('.family');
        heroFamily.innerHTML = `Family:&nbsp${hero.family}`;

        const heroBorn = document.querySelector('.born');
        heroBorn.innerHTML = `Born:&nbsp${hero.born}`;

        const heroDied = document.querySelector('.died');
        heroDied.innerHTML = `Died:&nbsp${hero.died}`;

        const normFamily = hero.family.toLowerCase().replace(/\s/g, '');
        const excludedFamilies = [
          '',
          'none',
          'unknown',
          'unkown',
          'naharis',
          'lorathi',
          'lorath',
          'sparrow',
          'viper',
          'sand'
        ];

        if (excludedFamilies.includes(normFamily)) {
          modalHero.classList.add('unknown');
        } else {
          modalHero.classList.add(normFamily);
        }
        console.log('normFamily', normFamily);
        toggleModal();
      } else {
        console.log('Hero not found');
      }
    });
  });
};

// refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', klassToKeep);
refs.modal.addEventListener('click', toggleByBackdrop);
document.addEventListener('keydown', handleModalCloseOnESC);