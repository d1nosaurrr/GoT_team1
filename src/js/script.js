window.addEventListener(
  "scroll",
  () => {
    let headerFixed = document.querySelector(".header-fixed"),
      logo = document.querySelector(".logo"),
      h1 = document.querySelector(".h1"),
      h2 = document.querySelector(".h2"),
      inputBlock = document.querySelector(".input-block");

    if (window.pageYOffset > 50) {
      headerFixed.classList.add("scroll");
      logo.classList.add("logo-scroll");
      h1.classList.add("h1-scroll");
      h2.classList.add("h2-scroll");
      inputBlock.classList.add("input-block-scroll");

      headerFixed.classList.remove("transition");
      h1.classList.remove("h1-scroll-transition");
      h2.classList.remove("h2-scroll-transition");
      inputBlock.classList.remove("input-block-transition");
    }

    if (window.pageYOffset < 50) {
      headerFixed.classList.remove("scroll");
      logo.classList.remove("logo-scroll");
      h1.classList.remove("h1-scroll");
      h2.classList.remove("h2-scroll");
      inputBlock.classList.remove("input-block-scroll");

      headerFixed.classList.add("transition");
      h1.classList.add("h1-scroll-transition");
      h2.classList.add("h2-scroll-transition");
      inputBlock.classList.add("input-block-transition");
    }
  },
  false
);

const cards = document.querySelectorAll(".card");

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];
  card.addEventListener("mousemove", startRotate);
  card.addEventListener("mouseout", stopRotate);
}

function startRotate(e) {
  const cardItem = this.querySelector(".card-item");
  const halfHeight = cardItem.offsetHeight / 2;
  const halfWidth = cardItem.offsetWidth / 2;
  cardItem.style.transform = `rotateX(${
    -(e.offsetY - halfHeight) / 8
  }deg) rotateY(${-(e.offsetX - halfWidth) / 8}deg)`;
}

function stopRotate() {
  const cardItem = this.querySelector(".card-item");
  cardItem.style.transform = `rotate(0)`;
}

const getCharactersList = async () => {
  const { data } = await axios.get("https://thronesapi.com/api/v2/Characters");
  return data;
};

const charactersList = document.querySelector(".characters__list");

const renderCharacters = (characters) => {
  characters.forEach((el) => {
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
    charactersList.insertAdjacentHTML("beforeend", listItem);
  });
};

const initializeCharacters = async () => {
  const characters = await getCharactersList();
  renderCharacters(characters);
};

initializeCharacters();
