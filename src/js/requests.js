const root = document.querySelector('#root');
const loader = document.querySelector('.loader__wrapper');
const charactersList = document.querySelector('.characters__list');
const inputBlock = document.querySelector('.filter__block');

root.style.display = 'none';

let characters = [];
let families = [];

const getCharactersList = async () => {
  const info = await axios.get('../.././index.json');
  // const res = await getAdditionalInfo(data);
  return info.data;
};


getCharactersList().then((characters) => {
  getAdditionalInfo(characters).then((data) => {
    console.log(data);
  });
  // const res = await getAdditionalInfo(e);
  renderCharacters(characters);
  root.style.display = 'block';
  loader.remove();
// }).then(() => {
//   const inputBlock = document.querySelector('.input__block');
//   const familiesList = document.createElement('select');
//   console.log(families);
//   new Set(families).forEach((el) => {
//     console.log(el);
//     const listItem = `<option value='${el}'>${el}</option>`;
//     familiesList.innerHTML += listItem;
//   });
//   inputBlock.append(familiesList);
//
})
;
const renderCharacters = (list) => {
  list.forEach((el) => {
    !el.family ? families.push('None') : families.push(el.family);
    const listItem = `
        <li class='list__item card'>
                    <div class='card__body blur'>
                        <div class='card__img'>
                            <img class='img' src='${el.imageUrl}' alt='${el.fullName}' width='150' height='150'>
                        </div>
                        <div class='card__description'>
                            <p class='card__text'>${el.fullName}</p>
                        </div>
                    </div>
                </li>
        `;
    charactersList.innerHTML += listItem;
  });
  const familyLabel = document.createElement('label');
  familyLabel.for = 'familySort';
  const familiesList = document.createElement('select');
  familiesList.id = 'familySort';
  new Set(families).forEach((el) => {
    const listItem = `<option value='${el}'>${el}</option>`;
    familiesList.innerHTML += listItem;
  });
  inputBlock.append(familyLabel, familiesList);
};
const getAdditionalInfo = async (list) => {
  const allData = [];
  for (const el of [...list]) {
    const info = await axios.get('https://www.anapioficeandfire.com/api/characters?name=' + el.fullName);
    const { data } = info;
    if (data && data.length > 0) {
      data.forEach(({ born, died, tvSeries }) => {
        if (tvSeries && tvSeries.length > 0 && tvSeries[0] !== '') {
          if (!born) {
            born = 'Unknown';
          }
          if (!died) {
            died = 'Unknown';
          }
          const date = {
            born: born,
            died: died
          };
          allData.push({ ...el, ...date });
        }
      });
    } else {
      const date = {
        born: 'Unknown',
        died: 'Unknown'
      };
      allData.push({ ...el, ...date });
    }
  }

  return allData;
};
