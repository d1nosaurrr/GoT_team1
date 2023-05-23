const modalHero = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');

const heroImage = document.querySelector('.character__image');
const heroName = document.querySelector('.character__name');
const heroHouse = document.querySelector('.character__house');
const heroBorn = document.querySelector('.character__born');
const heroDied = document.querySelector('.character__died');
const heroChance = document.querySelector('.character__chance');

const changeBtn = document.querySelector('.character__change');

const openModal = () => modalHero.showModal();
const closeModal = () => {
  heroHouse.parentElement.classList.remove('editable');
  heroHouse.disabled = true;
  heroDied.parentElement.classList.remove('editable');
  heroDied.disabled = true;
  changeBtn.style.display = 'block';
  modalHero.close();
};

modalHero.addEventListener('click', e => {
  const dialogDimensions = modalHero.getBoundingClientRect();
  if (
    (e.clientX !== 0 && e.clientX < dialogDimensions.left) ||
    (e.clientX !== 0 && e.clientX > dialogDimensions.right) ||
    (e.clientY !== 0 && e.clientY < dialogDimensions.top) ||
    (e.clientY !== 0 && e.clientY > dialogDimensions.bottom)
  ) {
    console.log(e.clientX < dialogDimensions.left);
    console.log(e.clientX > dialogDimensions.right);
    console.log(e.clientY < dialogDimensions.top);
    console.log(e.clientY > dialogDimensions.bottom);
    console.log(e.clientX);
    console.log(e.clientX);
    console.log(e.clientY);
    console.log(e.clientY);
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
  const normFamily = house.name.toLowerCase().replace(/\s/g, '');

  changeBtn.addEventListener('click', () => {
    heroHouse.parentElement.classList.add('editable');
    heroHouse.disabled = false;
    heroDied.parentElement.classList.add('editable');
    heroDied.disabled = false;
    changeBtn.style.display = 'none';

  });
  globalHousesList.forEach(e =>
    heroHouse.innerHTML += `<option value='${e.name}'>${e.name}</option>`);

  ['Alive', 'Died'].forEach(e =>
    heroDied.innerHTML += `<option value='${e.toLowerCase()}'>${e}</option>`);

  heroHouse.addEventListener('change', (e) => {
    e.preventDefault();
    hero.house = globalHousesList.find(el => el.name === e.target.value);
    heroChance.textContent = 'If you was an author of original book, chance will be:';

    heroChance.innerHTML = 'If you was an author of original book, chance will be: <br>' + winChance(globalCharacterList, hero);
  });

  heroDied.addEventListener('change', (e) => {
    e.preventDefault();
    hero.died = e.target.value === 'alive' || e.target.value === 'unknown' ? 'Unknown' : 'Died';
    heroChance.innerHTML = 'If you was an author of original book, chance will be: <br>' + winChance(globalCharacterList, hero);
  });
  modalHero.classList.add(greatHouses.includes(normFamily) ? 'unknown' : normFamily);
};

/******************* Setup Modal On Click***********************************/
const handleModal = (hero) => {
  if (hero) {
    openModal();

    const chance = winChance(globalCharacterList, hero);
    renderModalData(hero, chance);
  }
};

