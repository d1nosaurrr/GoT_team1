let families = [];
const loader = document.querySelector('.loader__wrapper');
const root = document.querySelector('#root');
root.style.display = 'none';
const characters = [];

const getCharactersList = async () => {
  await axios.get('https://thronesapi.com/api/v2/Characters')
    .then(async ({ data }) => {
      for (const el of [...data]) {
        await axios.get('https://www.anapioficeandfire.com/api/characters?name=' + el.fullName)
          .then(({ data }) => {
            data.forEach(({ name, born, died, tvSeries }) => {
              if (tvSeries && tvSeries.length > 0 && tvSeries[0] !== '') {
                if (born === '') {
                  born = 'Unknown';
                } else if (died === '') {
                  died = 'Unknown';
                } else {
                  born = 'Unknown';
                  died = 'Unknown';
                }
                characters.push({ ...el, name, died, born });
              }
            });
          });
      }
    });
};

getCharactersList().then(() => {
  const charactersList = document.querySelector('.characters__list');

  characters.forEach((el) => {
    !el.family ? families.push('None') : families.push(el.family);
    const listItem = `
        <li class='list__item card'>
                    <div class='card__body blur'>
                        <div class='card__img'>
                            <img class='img' src='${el.imageUrl}' alt='${el.fullName}' width='150' height='150'>
                        </div>
                        <div class='card__description'>
                            <p class='card__text'>${el.fullName}</p>
                        </div>
                    </div>
                </li>  
        `;
    charactersList.innerHTML += listItem;
    root.style.display = 'block';
    loader.remove();
  });
// }).then(() => {
//   const inputBlock = document.querySelector('.input__block');
//   const familiesList = document.createElement('select');
//   console.log(families);
//   new Set(families).forEach((el) => {
//     console.log(el);
//     const listItem = `<option value='${el}'>${el}</option>`;
//     familiesList.innerHTML += listItem;
//   });
//   inputBlock.append(familiesList);
//
});
