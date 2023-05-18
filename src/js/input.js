const input = document.querySelector('.input');

//=============input filter==================//
const handleNameFilter = async () => {
  try {
    const characters = await getCharactersList();
    // console.log('characters', characters);

    const filterValue = input.value.toLowerCase();
    // console.log('filterValue', filterValue);

    const filteredCharacters = characters.filter((character) =>
      character.fullName.toLowerCase().includes(filterValue)
    );
    // console.log('filteredCharacters', filteredCharacters);

    if (filteredCharacters.length === 0) {
      // Якщо немає збігів, рендеримо повідомлення
      charactersList.innerHTML = '<p class="no-results">No matches</p>';
    } else {
      // Якщо є збіги, рендеримо відфільтровані герої
      renderCharacters(filteredCharacters);
    }
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
  }
};
input.addEventListener('input', handleNameFilter);
//===============================================//
