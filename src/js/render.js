const renderCharacters = (list) => {
  charactersList.innerHTML = '';
  list.forEach((hero) => {
    const { fullName, imageUrl } = hero;
    const charactersItem = document.createElement('li');
    charactersItem.classList.add('list__card', 'card');
    charactersItem.innerHTML += `
                    <div class='card__body blur'>
                        <div class='card__img'>
                            <img class='img' src='${imageUrl}' alt='${fullName}' width='150' height='150'>
                        </div>
                        <div class='card__description'>
                            <p class='card__text'>${fullName}</p>
                        </div>
                    </div>
        `;
    charactersItem.addEventListener('click', () => handleModal(hero));
    charactersList.append(charactersItem);
  });
};
const renderFamiliesList = (list) => {
  const familyLabel = document.createElement('label');
  familyLabel.for = 'houseSort';
  const familiesList = document.createElement('select');
  familiesList.id = 'houseSort';
  familiesList.classList.add('filter__house');
  familiesList.innerHTML = `<option value='all' selected>All</option>`;
  list.forEach(({ name }) => familiesList.innerHTML += `<option value='${name}'>${name}</option>`);
  inputBlock.append(familyLabel, familiesList);
};