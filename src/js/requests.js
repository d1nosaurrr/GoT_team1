const root = document.querySelector('#root');
const loader = document.querySelector('.loader__wrapper');
const charactersList = document.querySelector('.characters__list');
const inputBlock = document.querySelector('.filter__block');

root.style.display = 'none';

const getCharactersList = async () => {
  const { data } = await axios.get('https://thronesapi.com/api/v2/Characters');
  return data;
};
const getAdditionalInfo = async (list) => {
  const characterList = [];
  const houses = [];
  for (const character of list) {
    await axios.get('https://anapioficeandfire.com/api/characters?name=' + character.fullName)
      .then(async ({ data }) => {
        if (data && data.length > 0) {
          for (let { allegiances, gender, born, died, tvSeries } of data) {
            if (tvSeries && tvSeries.length > 0 && tvSeries[0] !== '') {
              let houseInfo = [];
              for (const house of allegiances) {
                const { data } = await axios.get(house);
                houseInfo.push({ name: data.name.split('of')[0].trim(), words: data.words });
              }
              const addon = {
                house: houseInfo,
                gender: gender,
                born: !born ? 'Unknown' : born,
                died: !died ? 'Unknown' : died
              };
              characterList.push({ ...character, ...addon });
              houses.push(...houseInfo);
            }
          }
        } else {
          const addon = {
            house: [{ name: 'Unknown', words: 'Unknown' }],
            gender: 'Unknown',
            born: 'Unknown',
            died: 'Unknown'
          };
          characterList.push({ ...character, ...addon });
          houses.push({ name: 'Unknown', words: 'Unknown' });
        }
      });
  }
  return { characterList, houses };
};

const getFullInfo = async () => {
  const characters = await getCharactersList();
  const { characterList, houses } = await getAdditionalInfo(characters);
  const houseList = houses.filter((obj, index) => {
    return index === houses.findIndex(o => obj.name === o.name);
  });
  return { characterList, houseList };
};

const renderCharacters = (list) => {
  list.forEach(({ fullName, family, born, died, imageUrl }) => {
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
  familyLabel.for = 'familySort';
  const familiesList = document.createElement('select');
  familiesList.id = 'familySort';
  list.forEach(({ name }) => familiesList.innerHTML += `<option value='${name}'>${name}</option>`);
  inputBlock.append(familyLabel, familiesList);
};
getFullInfo().then(({ characterList, houseList }) => {
  renderCharacters(characterList);
  renderFamiliesList(houseList);
  root.style.display = 'block';
  loader.remove();
});