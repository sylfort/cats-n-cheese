import Player from './player';
import Cat from './cat';

export const handleShowStatistics = ({
  players,
  setPlayers,
  cats,
  setCats,
  setCheeseAmounts,
  setRounds,
}) => {
  console.log('players: ', players);
  // indicate that game has ended
  console.log('Game ended.');

  // showing statistics ends the game, this can be modified
  const scores = {};

  // This can be updated to display to the user
  Object.values(players).forEach((player) => {
    scores[player.name] = player.points;
    console.log(`${player.name} scored = ${player.points}`);
  });

  const winner = Math.max(...Object.values(scores));
  const winners = Object.keys(scores).filter((key) => scores[key] === winner);
  if (winners.length === 1) {
    console.log(`The winner is ${winners[0]}`);
  } else {
    console.log(`It's a tie between ${winners.join(' and ')}`);
  }

  // Reset players using the Player class constructor
  const singlePlayer = new Player('Player');
  const computer = new Player('Computer');

  setPlayers({ singlePlayer, computer });

  // Reset cats
  setCats((prevCats) =>
    prevCats.map((cat, index) => {
      const newCat = new Cat(cat.name);
      newCat.id = index + 1; // Assign unique IDs starting from 1
      newCat.amountOfCheese = prevCats; // Use the previous cats array to set amount of cheese
      return newCat;
    })
  );

  // Reset cheese amounts
  setCheeseAmounts(() => {
    const resetCheeseAmounts = cats.reduce((acc, cat) => {
      acc[cat.name] = cat.amountOfCheese;
      return acc;
    }, {});
    return resetCheeseAmounts;
  });

  // Reset round
  setRounds(1);
};
