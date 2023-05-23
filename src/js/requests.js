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
    let houseList = [];
    for (let character of list) {
      let { fullName, lastName } = character;
      if (fullName === 'Robert Baratheon') fullName = 'Robert I Baratheon';
      if (fullName === 'Ned Stark') fullName = 'Eddard Stark';
      if (fullName === 'Rob Stark') fullName = 'Robb Stark';
      if (fullName === 'Jamie Lannister') fullName = 'Jaime Lannister';
      if (fullName === 'The Hound') fullName = 'Sandor Clegane';
      if (fullName === 'Khal Drogo') fullName = 'Drogo';
      if (fullName === 'Viserys Targaryn') fullName = 'Viserys Targaryen';
      if (fullName === 'Daario') fullName = 'Daario Naharis';
      if (fullName === 'Ramsey Bolton') fullName = 'Ramsay Snow';
      if (fullName === 'The High Sparrow') fullName = 'High Septon';
      if (fullName === 'Oberyn Martell') fullName = 'Oberyn Nymeros Martell';
      if (fullName === 'Tormund Giantsbane') fullName = 'Tormund';
      if (fullName === 'Hodor') fullName = 'Walder';
      if (fullName === 'Olenna Tyrell') fullName = 'Olenna Redwyne';
      if (fullName === 'Lord Bronn') fullName = 'Bronn';
      if (fullName === 'Yara Greyjoy') fullName = 'Asha Greyjoy';
      if (fullName === 'Gendry Baratheon') fullName = 'Gendry';

      await axios
        .get('https://anapioficeandfire.com/api/characters?name=' + fullName)
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
                    let uniqueHouse = houseInfo.find(e => e.name.includes(lastName));
                    houseInfo = [uniqueHouse ? uniqueHouse : houseInfo[0]];
                  }

                  const addon = {
                    house: houseInfo.length > 0 ? houseInfo[0] : { name: 'Unknown', words: 'Unknown' },
                    gender: gender ? gender : 'Unknown',
                    born: born ? born : 'Unknown',
                    died: died ? died : 'Unknown'
                  };
                  characterList.push({ ...character, ...addon });
                  houseList.push(addon.house);
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
              houseList.push(addon.house);
            }
          });
    }

    characterList = characterList.filter((obj, index) =>
      index === characterList.findIndex(o => obj.fullName === o.fullName)
    );
    characterList = handleAlphabetFilter(characterList, 'asc');

    houseList = houseList.filter((obj, index) =>
      index === houseList.findIndex(o => obj.name === o.name)
    );

    houseList.sort((a, b) =>
      (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    characterList.forEach(e => {
      if (e.house.name === 'Unknown') {
        const findHouse = houseList.find(el => el.name.includes(e.lastName));
        e.house = findHouse ? findHouse : e.house;
      }
    });
    return { characterList, houseList };
  }
;

const getFullInfo = async () => {
  const characters = await getCharactersList();
  const { characterList, houseList } = await getAdditionalInfo(characters);
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

