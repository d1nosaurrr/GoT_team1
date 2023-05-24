//=============character filter==================//
const input = document.querySelector('.input');
//
const handleNameFilter = async () => {
  try {
    const { characterList } = await getFullInfo();
    const filterValue = input.value.toLowerCase().trim();

    const filteredCharacters = characterList.filter((character) =>
      character.fullName.toLowerCase().includes(filterValue)
    );

    if (filteredCharacters.length === 0) {
      charactersList.innerHTML = '<p class="no-results">No matches</p>';
    } else {
      charactersList.innerHTML = ''; // Очищуємо попередні результати
      renderCharacters(filteredCharacters);
    }
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
  }
};
input.addEventListener('input', handleNameFilter);
