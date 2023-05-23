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
const winChance = (list, hero) => {
  let winner ;

  list = list.filter(({ house, died }) => greatHouses.includes(house.name) && died === 'Unknown');

  if (!list.includes(hero)) {
    if (hero.died !== 'Unknown') winner = ('Sorry, your character is dead');
    if (!greatHouses.includes(hero.house.name)) winner = ('Sorry, your character is not from Great House');
  } else {
    list = list.filter(({ title }) => title !== '');
    list.sort((a, b) => (a.born < b.born) ? 1 : ((b.born < a.born) ? -1 : 0));

    const length = list.length;
    list = list.findIndex(({ fullName }) => fullName === hero.fullName);

    winner = ((((1 / length) * 100) + Math.abs(list)).toFixed(2) + '%');
  }
  console.log(winner);
  return winner;
};