const root = document.querySelector('#root');
const loader = document.querySelector('.loader__wrapper');
const charactersList = document.querySelector('.characters__list');
const inputBlock = document.querySelector('.filter__block');

let globalCharacterList;

root.style.display = 'none';

const getCharactersList = async () => {
  const { data } = await axios.get('https://thronesapi.com/api/v2/Characters');
  return data;
};
const getAdditionalInfo = async (list) => {
  let characterList = [];
  const houses = [];
  for (let character of list) {
    if (character.fullName === 'Robert Baratheon') {
      character.fullName = 'Robert I Baratheon';
    }
    if (character.fullName === 'Ned Stark') {
      character.fullName = 'Eddard Stark';
    }
    if (character.fullName === 'Rob Stark') {
      character.fullName = 'Robb Stark';
    }
    if (character.fullName === 'Jamie Lannister') {
      character.fullName = 'Jaime Lannister';
    }
    if (character.fullName === 'The Hound') {
      character.fullName = 'Sandor Clegane';
    }
    if (character.fullName === 'Khal Drogo') {
      character.fullName = 'Drogo';
    }
    if (character.fullName === 'Viserys Targaryn') {
      character.fullName = 'Viserys Targaryen';
    }
    if (character.fullName === 'Daario') {
      character.fullName = 'Daario Naharis';
    }
    if (character.fullName === 'Ramsey Bolton') {
      character.fullName = 'Ramsay Snow';
    }
    if (character.fullName === 'The High Sparrow') {
      character.fullName = 'High Septon';
    }
    if (character.fullName === 'Oberyn Martell') {
      character.fullName = 'Oberyn Nymeros Martell';
    }
    if (character.fullName === 'Tormund Giantsbane') {
      character.fullName = 'Tormund';
    }
    if (character.fullName === 'Hodor') {
      character.fullName = 'Walder';
    }
    if (character.fullName === 'Olenna Tyrell') {
      character.fullName = 'Olenna Redwyne';
    }
    if (character.fullName === 'Lord Bronn') {
      character.fullName = 'Bronn';
    }
    if (character.fullName === 'Yara Greyjoy') {
      character.fullName = 'Asha Greyjoy';
    }
    if (character.fullName === 'Gendry Baratheon') {
      character.fullName = 'Gendry';
    }
    await axios
      .get('https://anapioficeandfire.com/api/characters?name=' + character.fullName)
      .then(async ({ data }) => {
        if (data && data.length > 0) {
          for (const { allegiances, gender, born, died, tvSeries } of data) {
            if (tvSeries && tvSeries.length > 0 && tvSeries[0] !== '') {
              let houseInfo = [];
              for (const house of allegiances) {
                const { data } = await axios.get(house);
                houseInfo.push({ name: data.name.split('of')[0].trim(), words: data.words ? data.words : 'Unknown' });
              }
              if (houseInfo.length > 1) {
                let uniqueHouse = houseInfo.find(e => e.name.includes(character.lastName));
                houseInfo = [uniqueHouse ? uniqueHouse : houseInfo[0]];
              }
              const addon = {
                house: houseInfo.length > 0 ? houseInfo[0] : { name: 'Unknown', words: 'Unknown' },
                gender: gender ? gender : 'Unknown',
                born: born ? born : 'Unknown',
                died: died ? died : 'Unknown'
              };
              characterList.push({ ...character, ...addon });
              houses.push(addon.house);
            }
          }
        } else {
          const addon = {
            house: { name: 'Unknown', words: 'Unknown' },
            gender: 'Unknown',
            born: 'Unknown',
            died: 'Unknown'
          };
          characterList.push({ ...character, ...addon });
          houses.push(addon.house);
        }
      });
  }
  characterList = handleAlphabetFilter(characterList, 'asc');

  return { characterList, houses };
};

const getFullInfo = async () => {
  const characters = await getCharactersList();
  const { characterList, houses } = await getAdditionalInfo(characters);
  const houseList = houses.filter((obj, index) => {
    return index === houses.findIndex(o => obj.name === o.name);
  });
  houseList.sort((a, b) =>
    (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  globalCharacterList = characterList;
  return { characterList, houseList };
};

const renderCharacters = (list) => {
  //очищаємо список перед рендерингом
  charactersList.innerHTML = '';
  list.forEach(({ fullName, imageUrl }) => {
    charactersList.innerHTML += `
        <li class='list__item card'>
                    <div class='card__body blur'>
                        <div class='card__img'>
                            <img class='img' src='${imageUrl}' alt='${fullName}' width='150' height='150'>
                        </div>
                        <div class='card__description'>
                            <p class='card__text'>${fullName}</p>
                        </div>
                    </div>
        </li>
        `;
  });
};

const renderFamiliesList = (list) => {
  const familyLabel = document.createElement('label');
  familyLabel.for = 'houseSort';
  const familiesList = document.createElement('select');
  familiesList.id = 'houseSort';
  familiesList.innerHTML = `<option value='all' selected>All</option>`;
  list.forEach(({ name }) => familiesList.innerHTML += `<option value='${name}'>${name}</option>`);
  inputBlock.append(familyLabel, familiesList);
};

getFullInfo().then(({ characterList, houseList }) => {
  renderCharacters(characterList);
  renderFamiliesList(houseList);
  root.style.display = 'block';
  loader.remove();
  const nameSort = document.querySelector('.input');
  const houseSort = document.querySelector('#houseSort');
  const alphabetSort = document.querySelector('#alphabetSort');
  //=========open hero modal==========//
  alphabetSort.addEventListener('change',
    ({ target }) =>
      handleFilter('alphabetic', target.value, characterList));

  nameSort.addEventListener('input',
    ({ target }) =>
      handleFilter('name', target.value, characterList));

  houseSort.addEventListener('change',
    ({ target }) =>
      handleFilter('houses', target.value, characterList));

  setupCardClick(characterList);
});

