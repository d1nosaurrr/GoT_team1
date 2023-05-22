const modalHero = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__card');
const modalClose = document.querySelector('.modal__close');

const openModal = () => modalHero.showModal();
const closeModal = () => modalHero.close();

modalHero.addEventListener('click', e => {
  const dialogDimensions = modalHero.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modalHero.close();
  }
});

modalClose.addEventListener('click', closeModal);

/******************* Setup Modal On Click***********************************/
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
        modalContent.innerHTML = '';
        const { imageUrl, fullName, house, born, died } = hero;
        const heroImage = document.createElement('img');
        heroImage.className = 'character__image';
        heroImage.width = 150;
        heroImage.height = 150;
        heroImage.src = imageUrl.trim();

        const heroName = document.createElement('p');
        heroName.className = 'character__name';
        heroName.textContent = 'Name: ' + fullName;
        const heroHouse = document.createElement('p');
        heroHouse.className = 'character__house';
        heroHouse.textContent = 'House: ' + house.name;

        const heroBorn = document.createElement('p');
        heroBorn.className = 'character__born';
        heroBorn.textContent = 'Born: ' + born;

        const heroDied = document.createElement('p');
        heroDied.className = 'character__died';
        heroDied.textContent = 'Died: ' + died;

        const normFamily = house.name.toLowerCase().replace(/\s/g, '');
        const excludedFamilies = [
          'unknown',
          'unkown',
          'naharis',
          'lorathi',
          'lorath',
          'sparrow',
          'viper',
          'sand'
        ];
        modalHero.classList.add(excludedFamilies.includes(normFamily) ? 'unknown' : normFamily);

        modalContent.append(heroImage, heroName, heroHouse, heroBorn, heroDied);
        openModal();
      }
    });
  });
};
