const modalHero = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.modal::backdrop');
const modalWrapper = document.querySelector('.modal__contant');
const modalClose = document.querySelector('.modal__close');

const heroImage = document.querySelector('.character__image');
const heroName = document.querySelector('.character__name');
const heroHouse = document.querySelector('.character__house');
const heroBorn = document.querySelector('.character__born');
const heroDied = document.querySelector('.character__died');
const heroChance = document.querySelector('.character__chance');

const changeBtn = document.querySelector('.character__change');

const houseLogo = document.querySelector('.house__logo');
const houseWords = document.querySelector('.coatOfArms__text');
const modalImg = document.querySelector('.modal__background');
const rootEl = document.querySelector('#root');

const openModal = () => {
  document.body.style.overflow = 'hidden';
  modalHero.showModal();
  // rootEl.style.opacity = '0';
};
const closeModal = () => {
  heroHouse.parentElement.classList.remove('editable');
  heroHouse.disabled = true;
  heroDied.parentElement.classList.remove('editable');
  heroDied.disabled = true;
  changeBtn.style.display = 'block';
  // modalImg.src = '';
  houseLogo.src = '';
  houseWords.textContent = '';
  document.body.style.overflow = 'auto';

  rootEl.style.opacity = '1';

  modalHero.close();
};

modalHero.addEventListener('click', (e) => {
  const dialogDimensions = modalWrapper.getBoundingClientRect();

  if (
    ((e.clientX !== 0 && e.clientX < dialogDimensions.left) ||
      (e.clientX !== 0 && e.clientX > dialogDimensions.right) ||
      (e.clientY !== 0 && e.clientY < dialogDimensions.top) ||
      (e.clientY !== 0 && e.clientY > dialogDimensions.bottom)) &&
    (e.target !== changeBtn)
  ) {
    closeModal();
  }
});

modalClose.addEventListener('click', closeModal);

const renderModalData = (hero, chance) => {
  const { imageUrl, fullName, house, born, died } = hero;

  heroImage.src = imageUrl.trim();
  heroImage.alt = fullName;

  heroName.innerHTML = fullName;

  heroHouse.innerHTML = `<option value='${house.name}' selected>${house.name}</option>`;

  heroBorn.innerHTML = born;

  heroDied.innerHTML = `<option value='${died.toLowerCase()}' selected>${died}</option>`;

  heroChance.innerHTML = chance;

  changeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('click');
    heroHouse.parentElement.classList.add('editable');
    heroHouse.disabled = false;
    heroDied.parentElement.classList.add('editable');
    heroDied.disabled = false;
    changeBtn.style.display = 'none';
  });

  if (hero.house.name !== 'Unknown') {
    const files = ['Baratheon', 'Bolton', 'Greyjoy', 'Lannister', 'Stark', 'Targaryen', 'Tyrell'];
    let { name, words } = hero.house;
    name = name.split('House')[1].trim();

    const imageBackground = `url(../dist/img/houseSVG/${name}.svg)`;

    modalHero.style.setProperty('--backgroundImage',
      files.includes(name) ? imageBackground : `url(../dist/img/houseSVG/throne.svg)`);

    houseLogo.src = `./dist/img/houseLogo/${name}.png`;
    houseWords.textContent = words !== 'Unknown' ? words : 'Game Of Thrones';
  } else {
    // modalImg.src = `../dist/img/houseSVG/throne.svg`;
    houseLogo.src = `./dist/img/logo.png`;
    houseWords.textContent = 'Game Of Thrones';
  }

  globalHousesList.forEach(
    (e) => (heroHouse.innerHTML += `<option value='${e.name}'>${e.name}</option>`)
  );

  ['Alive', 'Died'].forEach(
    (e) => (heroDied.innerHTML += `<option value='${e.toLowerCase()}'>${e}</option>`)
  );

  heroHouse.addEventListener('change', (e) => {
    e.preventDefault();
    hero.house = globalHousesList.find((el) => el.name === e.target.value);
    heroChance.textContent = 'If you was an author of original book, chance will be:';

    heroChance.innerHTML =
      'If you was an author of original book, chance will be: <br>' +
      winChance(globalCharacterList, hero);
  });

  heroDied.addEventListener('change', (e) => {
    e.preventDefault();
    hero.died = e.target.value === 'alive' || e.target.value === 'unknown' ? 'Unknown' : 'Died';
    heroChance.innerHTML =
      'If you was an author of original book, chance will be: <br>' +
      winChance(globalCharacterList, hero);
  });
};

/******************* Setup Modal On Click***********************************/
const handleModal = (hero) => {
  if (hero) {
    openModal();

    const chance = winChance(globalCharacterList, hero);
    renderModalData(hero, chance);
  }
};
