let globalCharacterList;
let globalHousesList;

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
          for (const { allegiances, gender, born, died, titles, tvSeries } of data) {
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
              const title = titles.find(e =>
                e.includes('King') ||
                e.includes('Queen') ||
                e.includes('Princess') ||
                e.includes('Prince') ||
                e.includes('Ser') ||
                e.includes('Lord') ||
                e.includes('Ser')
              );

              const addon = {
                house: houseInfo.length > 0 ? houseInfo[0] : { name: 'Unknown', words: 'Unknown' },
                gender: gender ? gender : 'Unknown',
                born: born ? born : 'Unknown',
                died: died ? died : 'Unknown',
                title: title ? title : ''
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
  globalCharacterList = characterList;
  globalHousesList = houseList;
  return { characterList, houseList };
};

const getFullInfo = async () => {
  const characters = await getCharactersList();
  const { characterList, houseList } = await getAdditionalInfo(characters);
  return { characterList, houseList };
};
