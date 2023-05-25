const root = document.querySelector('#root');
root.style.display = 'none';

const loader = document.querySelector('.loader__wrapper');
const charactersList = document.querySelector('.characters__list');
const inputBlock = document.querySelector('.filter__block');

const headerFixed = document.querySelector('.header__fixed');

const dropdown = document.querySelector('.header__dropdown');
const filterBlock = document.querySelector('.filter__block');

window.addEventListener('scroll', () => {
  let mainNew = document.querySelector('.main');
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    if (document.querySelector('.container').clientHeight < 560) {
      mainNew.classList.add('mainNew');
    }
    headerFixed.classList.add('scroll');
  } else {
    if (document.querySelector('.container').clientHeight > 560) {
      mainNew.classList.remove('mainNew');
    }
    headerFixed.classList.remove('scroll');
  }
});

let isOpen = false;
dropdown.addEventListener('click', () => {
  isOpen ? filterBlock.classList.remove('active') : filterBlock.classList.add('active');
  isOpen ? (dropdown.style.transform = 'rotate(0)') : (dropdown.style.transform = 'rotate(180deg)');
  isOpen = !isOpen;
});

getFullInfo().then(({ characterList, houseList }) => {
  // renderCharacters(characterList);
  // renderFamiliesList(houseList);
  // root.style.display = 'block';
  // loader.remove();

  /***********************************FILTER**********************************/
  const nameFind = document.querySelector('.input');
  const houseSort = document.querySelector('#houseSort');
  const alphabetSort = document.querySelector('#alphabetSort');
  const clearInput = document.querySelector('#clearInput');
  alphabetSort.addEventListener('change', ({ target }) =>
    handleFilter('alphabetic', target.value, characterList)
  );

  nameFind.addEventListener('input', ({ target }) =>
    handleFilter('name', target.value, characterList)
  );

  houseSort.addEventListener('change', ({ target }) =>
    handleFilter('houses', target.value, characterList)
  );

  clearInput.addEventListener('click', () => {
    nameFind.value = '';
    handleFilter('name', '', characterList);
  });
  /***************************************************************************/
});
