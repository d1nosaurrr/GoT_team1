window.addEventListener("scroll", () => {
    let headerFixed = document.querySelector(".header__fixed");
    document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ?
        headerFixed.classList.add("scroll")
        :
        headerFixed.classList.remove("scroll");
});

let characters = [];
let families = [];
const getCharactersList = async () => {
    await axios.get('https://thronesapi.com/api/v2/Characters')
        .then(async ({data}) => {
            characters.push(...data);
        });
};
const getHousesList = async () => {
    await axios.get('https://thronesapi.com/api/v2/Characters')
        .then(async ({data}) => {
            characters.push(...data);
        });
};
const charactersList = document.querySelector('.characters__list');

getCharactersList().then(() => {
    characters.forEach((el) => {
        !el.family ? families.push('None') : families.push(el.family);
        const listItem = `
        <li class="list__item card">
                    <div class="card__body blur">
                        <div class="card__img">
                            <img class="img" src="${el.imageUrl}" alt="${el.fullName}" width="150" height="150">
                        </div>
                        <div class="card__description">
                            <p class="card__text">${el.fullName}</p>
                        </div>
                    </div>
                </li>  
        `;
        charactersList.innerHTML += listItem;
    });
    console.log(new Set(families));
});