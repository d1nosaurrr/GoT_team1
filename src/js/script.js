window.addEventListener("scroll", () => {
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


}, false);


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
    cardItem.style.transform = `rotateX(${-(e.offsetY - halfHeight) / 8}deg) rotateY(${-(e.offsetX - halfWidth) / 8}deg)`;
}

function stopRotate() {
    const cardItem = this.querySelector(".card-item");
    cardItem.style.transform = `rotate(0)`;
}

let characters = [];
const getCharactersList = async () => {
    await axios.get('https://thronesapi.com/api/v2/Characters')
        .then(({data}) => characters.push(...data));
};
const charactersList = document.querySelector('.characters__list');

getCharactersList().then(() => {
    characters.forEach((el) => {
        const li = document.createElement('li');
        li.classList.add('card');
        const a = document.createElement('a');
        const characterCard = document.createElement('div');
        characterCard.classList.add('card-item', 'blur');
        const characterImg = document.createElement('div');
        characterImg.classList.add('card-img');
        const img = document.createElement('img');
        img.src = el.imageUrl;
        img.alt = el.fullName;
        img.width = '200';
        img.height = '200';
        const characterDescription = document.createElement('div');
        characterDescription.classList.add('card-text');
        const p = document.createElement('p');
        p.textContent = el.fullName;

        characterImg.append(img);
        characterDescription.append(p);
        characterCard.append(characterImg, characterDescription);
        a.append(characterCard);
        li.append(a,);
        charactersList.append(li)
    })
});