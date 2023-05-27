const modalHero = document.querySelector('.modal');
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
  // rootEl.style.display = 'none';
  rootEl.style.opacity = '0';

};

const closeModal = () => {
  heroHouse.parentElement.classList.remove('editable');
  heroHouse.disabled = true;
  heroDied.parentElement.classList.remove('editable');
  heroDied.disabled = true;
  changeBtn.style.display = 'block';
  modalImg.src = '';
  houseLogo.src = '';
  houseWords.textContent = '';
  document.body.style.overflow = 'auto';
  rootEl.style.display = 'block';
  rootEl.style.opacity = '1';

  modalHero.close();
};

// Handle click outside the modal container
const handleOutsideClick = (e) => {
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
};

const setHeroProperties = (hero, chance) => {
  const { imageUrl, fullName, house, born, died } = hero;

  heroImage.src = imageUrl.trim();
  heroImage.alt = fullName;
  heroName.innerHTML = fullName;
  heroHouse.innerHTML = `<option value='${house.name}' selected>${house.name}</option>`;
  heroBorn.innerHTML = born;
  heroDied.innerHTML = `<option value='${died.toLowerCase()}' selected>${died}</option>`;
  heroChance.innerHTML = chance;
};

const updateModalImg = (hero) => {
  if (hero.house.name !== 'Unknown') {
    const files = ['Baratheon', 'Bolton', 'Greyjoy', 'Lannister', 'Stark', 'Targaryen', 'Tyrell'];
    let { name, words } = hero.house;

    name = name.split('House')[1].trim();

    const imageBackground = `./dist/img/houseSVG/${name}.svg`;

    modalHero.style.setProperty('::backdrop', 'background-color: #2c2c2c');
    modalImg.src = files.includes(name) ? imageBackground : `./dist/img/houseSVG/throne.svg`;
    houseLogo.src = `./dist/img/houseLogo/${name}.png`;
    houseWords.textContent = words !== 'Unknown' ? words : 'Game Of Thrones';
  } else {
    modalImg.src = `../dist/img/houseSVG/throne.svg`;
    houseLogo.src = `./dist/img/logo.png`;
    houseWords.textContent = 'Game Of Thrones';
  }
};

const handleChangeBtnClick = (e) => {
  e.preventDefault();
  heroHouse.parentElement.classList.add('editable');
  heroHouse.disabled = false;
  heroDied.parentElement.classList.add('editable');
  heroDied.disabled = false;
  changeBtn.style.display = 'none';
};

const handleHouseChange = (e, hero) => {
  e.preventDefault();
  hero.house = globalHousesList.find((el) => el.name === e.target.value);
  heroChance.textContent = 'If you was an author of original book, chance will be:';

  heroChance.innerHTML =
    'If you was an author of original book, chance will be: <br>' +
    winChance(globalCharacterList, hero);
};

const handleDiedChange = (e, hero) => {
  e.preventDefault();
  hero.died = e.target.value === 'alive' || e.target.value === 'unknown' ? 'Unknown' : 'Died';
  heroChance.innerHTML =
    'If you was an author of original book, chance will be: <br>' +
    winChance(globalCharacterList, hero);
};
const renderModalData = (hero, chance) => {

  setHeroProperties(hero, chance);
  updateModalImg(hero);

  globalHousesList.forEach(
    (e) =>
      (heroHouse.innerHTML += `<option value='${e.name}'>${e.name}</option>`)
  );

  ['Alive', 'Died'].forEach(
    (e) =>
      (heroDied.innerHTML += `<option value='${e.toLowerCase()}'>${e}</option>`)
  );

  changeBtn.addEventListener('click', handleChangeBtnClick);
  heroHouse.addEventListener('change', (e) => handleHouseChange(e, hero));
  heroDied.addEventListener('change', (e) => handleDiedChange(e, hero));
};

/******************* Setup Modal On Click ***********************************/
const handleModal = (hero) => {
  if (hero) {
    openModal();

    const chance = winChance(globalCharacterList, hero);
    renderModalData(hero, chance);
  }
};

modalHero.addEventListener('click', handleOutsideClick);
modalClose.addEventListener('click', closeModal);