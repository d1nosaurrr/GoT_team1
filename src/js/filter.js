//=============character filter==================//
let alphabetSortValue = 'asc';
let nameSortValue = '';
let houseSortValue = 'all';

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
  return list;
};

const characterFilter = (list) => {
  let filteredCharacters;
  handleAlphabetFilter(list, alphabetSortValue);
  if (houseSortValue !== 'all') {
    filteredCharacters = list.filter(({ fullName, house }) =>
      house.name.toLowerCase().trim() === houseSortValue.trim()
      &&
      fullName.toLowerCase().includes(nameSortValue)
    );
  } else {
    filteredCharacters = list.filter(({ fullName }) =>
      fullName.toLowerCase().includes(nameSortValue));
  }

  if (!filteredCharacters.length) {
    charactersList.innerHTML = '<p class="no-results">No matches</p>';
  } else {
    renderCharacters(filteredCharacters);
  }
};

const handleFilter = (type, value, list) => {
  switch (type) {
    case 'alphabetic':
      alphabetSortValue = value.toLowerCase();
      break;
    case 'name':
      nameSortValue = value.toLowerCase();
      break;
    case 'houses':
      houseSortValue = value.toLowerCase();
      break;
  }

  characterFilter(list);
};
//===============================================//
