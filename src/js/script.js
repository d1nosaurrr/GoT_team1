const root = document.querySelector('#root');
root.style.display = 'none';

const loader = document.querySelector('.loader__wrapper');
const charactersList = document.querySelector('.characters__list');
const inputBlock = document.querySelector('.filter__block');

const headerFixed = document.querySelector('.header__fixed');

const dropdown = document.querySelector('.header__dropdown');
const filterBlock = document.querySelector('.filter__block');

let header = document.querySelector('.header__fixed');
let main = document.querySelector('.main');
const cards = document.querySelectorAll('.list');
const container = document.querySelector('.container');

const handleHeaderSrcoll = () => {
  if (window.scrollY > 240) {
    header.classList.add('scroll');
    if (container.clientHeight < 560) main.style.height = '100vh';
  } else {
    header.classList.remove('scroll');
  }
};

window.addEventListener('scroll', () => {
  handleHeaderSrcoll();
});

let isOpen = false;
dropdown.addEventListener('click', () => {
  isOpen ? filterBlock.classList.remove('active') : filterBlock.classList.add('active');
  isOpen ? (dropdown.style.transform = 'rotate(0)') : (dropdown.style.transform = 'rotate(180deg)');
  isOpen = !isOpen;
});

getFullInfo().then(({ characterList, houseList }) => {
  renderCharacters(characterList);
  renderFamiliesList(houseList);
  root.style.display = 'block';
  loader.remove();

  /***********************************FILTER**********************************/
  const nameFind = document.querySelector('.input');
  const houseSort = document.querySelector('#houseSort');
  const alphabetSort = document.querySelector('#alphabetSort');
  const clearInput = document.querySelector('#clearInput');
  alphabetSort.addEventListener('change', ({ target }) =>
    handleFilter('alphabetic', target.value, characterList)
  );

  document.querySelectorAll('form').forEach(e =>
    e.addEventListener('submit', (e) => e.preventDefault()));

  nameFind.addEventListener('input', (e) => {
      e.preventDefault();
      handleFilter('name', e.target.value, characterList);
    }
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
