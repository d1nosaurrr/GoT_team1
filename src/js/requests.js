let globalCharacterList;
let globalHousesList;
const loaderBar = document.querySelector('#loaderBar');

const getCharactersList = async () => {
  const { data } = await axios.get('https://thronesapi.com/api/v2/Characters');
  loaderBar.value += Math.round(1.85);
  return data;
};

const getHousesList = async (allegiances, lastName) => {
  let houseInfo = [];
  for (const house of allegiances) {
    const { data } = await axios.get(house);
    houseInfo.push({
      name: data.name.split('of')[0].trim(),
      words: data.words ? data.words : 'Unknown'
    });
  }
  if (houseInfo.length > 1) {
    let uniqueHouse = houseInfo.find((e) => e.name.includes(lastName));
    houseInfo = [uniqueHouse ? uniqueHouse : houseInfo[0]];
  }
  return houseInfo;
};

const setDataFromAPI = async (data, lastName) => {
  for (let { allegiances, gender, born, died, titles, tvSeries } of data) {
    if (tvSeries && tvSeries.length > 0 && tvSeries[0] !== '') {

      let houseInfo = await getHousesList(allegiances, lastName);

      if (born) {
        born = born.substring(0, born.indexOf('AC') + 2);
        if (born[0].match(/^[1-9][0-9]*$/)) born = 'In ' + born;
      }
      if (died) {
        died = died.substring(0, died.indexOf('AC') + 2);
        if (died[0].match(/^[1-9][0-9]*$/)) died = 'In ' + died;
      }

      const title = titles.find(
        (e) =>
          e.includes('King') ||
          e.includes('Queen') ||
          e.includes('Princess') ||
          e.includes('Prince') ||
          e.includes('Ser') ||
          e.includes('Lord') ||
          e.includes('Ser')
      );
      return {
        house: houseInfo.length > 0 ? houseInfo[0] : { name: 'Unknown', words: 'Unknown' },
        gender: gender ? gender : 'Unknown',
        born: born ? born : 'Unknown',
        died: died ? died : 'Unknown',
        title: title ? title : ''
      };
    }
  }
};


const getAdditionalInfo = async (list) => {
  let characterList = [];
  let houseList = [];
  for (let character of list) {
    const name = CONSTANTS.character.fullName[character.fullName];
    character.fullName = name ? name : character.fullName;
    const { lastName, fullName } = character;

    await axios
      .get('https://anapioficeandfire.com/api/characters?name=' + fullName)
      .then(async ({ data }) => {
        if (data && data.length > 0) {

          const addon = await setDataFromAPI(data, lastName);
          if (addon) {
            characterList.push({ ...character, ...addon });
            houseList.push(addon.house);
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
        loaderBar.value += Math.round(1.85);
      });
  }

  characterList = characterList.filter(
    (obj, index) => index === characterList.findIndex((o) => obj.fullName === o.fullName)
  );
  characterList = handleAlphabetFilter(characterList, 'asc');

  houseList = houseList.filter(
    (obj, index) => index === houseList.findIndex((o) => obj.name === o.name)
  );

  houseList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  characterList.forEach((e) => {
    if (e.house.name === 'Unknown') {
      const findHouse = houseList.find((el) => e.lastName !== '' && el.name.includes(e.lastName));
      e.house = findHouse ? findHouse : e.house;
    }
  });
  globalCharacterList = characterList;
  globalHousesList = houseList;
  return { characterList, houseList };
};

const getFullInfo = async () => {
  const characters = await getCharactersList();
  return await getAdditionalInfo(characters);
};
