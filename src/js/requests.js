let globalCharacterList;
let globalHousesList;
const loaderBar = document.querySelector('#loaderBar');
const getCharactersList = async () => {
  const { data } = await axios.get('https://thronesapi.com/api/v2/Characters');
  loaderBar.value += Math.round(1.85);
  return data;
};
const getAdditionalInfo = async (list) => {
  let characterList = [];
  let houseList = [];
  for (let character of list) {
    let { fullName, lastName } = character;
    if (fullName === 'Robert Baratheon') character.fullName = 'Robert I Baratheon';
    if (fullName === 'Ned Stark') character.fullName = 'Eddard Stark';
    if (fullName === 'Rob Stark') fullName = 'Robb Stark';
    if (fullName === 'Jamie Lannister') character.fullName = 'Jaime Lannister';
    if (fullName === 'The Hound') character.fullName = 'Sandor Clegane';
    if (fullName === 'Khal Drogo') character.fullName = 'Drogo';
    if (fullName === 'Viserys Targaryn') character.fullName = 'Viserys Targaryen';
    if (fullName === 'Daario') character.fullName = 'Daario Naharis';
    if (fullName === 'Ramsey Bolton') character.fullName = 'Ramsay Snow';
    if (fullName === 'The High Sparrow') character.fullName = 'High Septon';
    if (fullName === 'Oberyn Martell') character.fullName = 'Oberyn Nymeros Martell';
    if (fullName === 'Tormund Giantsbane') character.fullName = 'Tormund';
    if (fullName === 'Hodor') character.fullName = 'Walder';
    if (fullName === 'Olenna Tyrell') character.fullName = 'Olenna Redwyne';
    if (fullName === 'Lord Bronn') character.fullName = 'Bronn';
    if (fullName === 'Yara Greyjoy') character.fullName = 'Asha Greyjoy';
    if (fullName === 'Gendry Baratheon') character.fullName = 'Gendry';
    fullName = character.fullName;
    await axios
      .get('https://anapioficeandfire.com/api/characters?name=' + fullName)
      .then(async ({ data }) => {
        if (data && data.length > 0) {
          for (const { allegiances, gender, born, died, titles, tvSeries } of data) {
            if (tvSeries && tvSeries.length > 0 && tvSeries[0] !== '') {
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
            loaderBar.value += Math.round(1.85);
          }
        } else {
          const addon = {
            house: { name: 'Unknown', words: 'Unknown' },
            gender: 'Unknown',
            born: 'Unknown',
            died: 'Unknown'
          };

          loaderBar.value += Math.round(1.85);
          characterList.push({ ...character, ...addon });
          houseList.push(addon.house);
        }
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
  const { characterList, houseList } = await getAdditionalInfo(characters);
  return { characterList, houseList };
};
