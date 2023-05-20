//=============character filter==================//
const handleNameFilter = (e, characters) => {
  const filterValue = e.target.value.toLowerCase().trim();

  const filteredCharacters = characters.filter(({ fullName }) =>
    fullName.toLowerCase().includes(filterValue)
  );

  if (filteredCharacters.length === 0) {
    // Якщо немає збігів, рендеримо повідомлення
    charactersList.innerHTML = '<p class="no-results">No matches</p>';
  } else {
    // Якщо є збіги, рендеримо відфільтровані герої
    renderCharacters(filteredCharacters);
  }
};
const handleHouseFilter = (e, characters) => {
  const filterValue = e.target.value.toLowerCase().trim();

  let filteredCharacters;
  if (filterValue !== ' none') {
    filteredCharacters = characters.filter(({ house }) =>
      house[0].name.toLowerCase().trim().includes(filterValue.toLowerCase().trim())
    );
  } else {
    filteredCharacters = characters;
  }

  if (filteredCharacters.length === 0) {
    // Якщо немає збігів, рендеримо повідомлення
    charactersList.innerHTML = '<p class="no-results">No matches</p>';
  } else {
    // Якщо є збіги, рендеримо відфільтровані герої
    renderCharacters(filteredCharacters);
  }
};
const handleAlphabetFilter = (e, characters) => {
  const filterValue = e.target.value.toLowerCase().trim();

  switch (filterValue) {
    case 'asc':
      characters.sort((a, b) => (a.fullName > b.fullName) ? 1 : ((b.fullName > a.fullName) ? -1 : 0));
      break;
    case 'desc':
      characters.sort((a, b) => (a.fullName < b.fullName) ? 1 : ((b.fullName < a.fullName) ? -1 : 0));
  }
  renderCharacters(characters);
};
//===============================================//
