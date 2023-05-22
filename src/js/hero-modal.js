const refs = {
  // openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};
const modalHero = document.querySelector('.modal');
const classToKeep = 'modal';

// refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', klassToKeep);
refs.modal.addEventListener('click', toggleByBackdrop);
document.addEventListener('keydown', handleModalCloseOnESC);

function toggleByBackdrop({ target }) {
  // console.log(target.classList);
  if (target.classList.contains('backdrop')) {
    refs.modal.classList.toggle('backdrop--is-hidden');
    document.body.classList.toggle('modal-open');
    klassToKeep();
  }
}

function klassToKeep() {
  setTimeout(function () {
    modalHero.className = classToKeep;
  }, 100);
}
function handleModalCloseOnESC({ key }) {
  // console.log(key)
  if (key === 'Escape' && !refs.modal.classList.contains('backdrop--is-hidden')) {
    toggleModal();
    klassToKeep();
  }
}

function toggleModal() {
  refs.modal.classList.toggle('backdrop--is-hidden');
  document.body.classList.toggle('modal-open');
}

// =========open hero modal==========//

function setupCardClick() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((char) => {
    const openHeroModal = async (e) => {
      const heroName = e.currentTarget.children[0].children[1].children[0].textContent;
      // console.log(heroName.toLowerCase().replace(/\s/g, ''));
      try {
        const response = await axios.get('https://64687c8760c8cb9a2caac9fc.mockapi.io/fire/fire');
        const data = response.data;

        const hero = data.find(
          (char) =>
            char.fullName.toLowerCase().replace(/\s/g, '') ===
            heroName.toLowerCase().replace(/\s/g, '')
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
            'sand',
            'worm',
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
      } catch (error) {
        console.error(error);
      }
    };

    char.addEventListener('click', openHeroModal);
  });
}
