const greatHouses = [
  'House Stark',
  'House Targaryen',
  'House Lannister',
  'House Tyrell',
  'House Baratheon',
  'House Greyjoy',
  'House Tully',
  'House Mormont',
  'House Martell',
  'House Bolton'
];
const winChance = (list) => {
  const winnerList = potentialWinner(list).length;
  list.map((el) => {
    if (el.died !== 'Unknown') {
      console.log('Your character is dead');
    } else {
      if (!greatHouses.includes(el.house[0].name)) {
        console.log('Your character is not from one of the Great House');
      } else {
        console.log();
        console.log('Let`s check the luck of your pick');
        console.log(1/winnerList * 100 + '%');
      }
    }
  });
};

const potentialWinner = (list) => list.map((el) => el.died === 'Unknown' && greatHouses.includes(el.house[0].name) ? el : '').filter((el) => el !== '');
