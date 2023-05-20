//=============character filter==================//
let alphabetSort = 'asc';
let nameSort = '';
let houseSort = 'all';

const handleAlphabetFilter = (list, value) => {
  switch (value) {
    case 'asc':
      list.sort((a, b) =>
        (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0));
      break;
    case 'desc':
      list.sort((a, b) =>
        (a.fullName < b.fullName) ? 1 : ((b.fullName < a.fullName) ? -1 : 0));
  }
  globalCharacterList = list;
  return list;
};

const characterFilter = (list) => {
  let filteredCharacters = handleAlphabetFilter(list, alphabetSort);

  if (houseSort !== 'all') {
    filteredCharacters = list.filter(({ fullName, house }) =>
      house[0].name.toLowerCase().trim() === houseSort.trim()
      &&
      fullName.toLowerCase().includes(nameSort)
    );
  } else {
    filteredCharacters = list.filter(({ fullName }) =>
      fullName.toLowerCase().includes(nameSort));
  }

  if (filteredCharacters.length === 0) {
    charactersList.innerHTML = '<p class="no-results">No matches</p>';
  } else {
    renderCharacters(filteredCharacters);
    setupCardClick(filteredCharacters);
  }
};

const handleFilter = (type, value, list) => {
  switch (type) {
    case 'alphabetic':
      alphabetSort = value.toLowerCase();
      break;
    case 'name':
      nameSort = value.toLowerCase();
      break;
    case 'houses':
      houseSort = value.toLowerCase();
      break;
  }

  characterFilter(list);
};
//===============================================//
