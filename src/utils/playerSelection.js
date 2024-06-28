import { handleShowStatistics } from '@/utils/showStatistics';

export const handlePlayerSelection = (
  id,
  {
    rounds,
    setRounds,
    players,
    setPlayers,
    cats,
    setCats,
    cheeseAmounts,
    setCheeseAmounts,
  }
) => {
  console.log(rounds);
  // Show winner after 8 rounds
  if (rounds >= 8) {
    handleShowStatistics({
      players,
      setPlayers,
      cats,
      setCats,
      setCheeseAmounts,
      setRounds,
    });
    return;
  }

  const { singlePlayer, computer } = players;
  let playerSelection;
  let computerSelection;

  try {
    playerSelection = singlePlayer.chooseCat(id, cats);
    computerSelection = computer.chooseCat(0, cats);
  } catch (error) {
    console.log(error.message);
    return;
  }

  // increment the number of rounds
  setRounds(rounds + 1);

  if (playerSelection.name === computerSelection.name) {
    computerSelection.increaseAmountOfCheese(cats);
    setCheeseAmounts((prev) => ({
      ...prev,
      [computerSelection.name]: computerSelection.amountOfCheese,
    }));
    console.log("It's a tie");
  } else {
    singlePlayer.addPoints(playerSelection.amountOfCheese);
    computer.addPoints(computerSelection.amountOfCheese);

    console.log(
      `${singlePlayer.name} selected ${playerSelection.name} and scored ${playerSelection.amountOfCheese} points. Total points = ${singlePlayer.points}`
    );
    console.log(
      `${computer.name} selected ${computerSelection.name} and scored ${computerSelection.amountOfCheese} points. Total points = ${computer.points}`
    );

    playerSelection.resetAmountOfCheese(cats);
    computerSelection.resetAmountOfCheese(cats);

    setCheeseAmounts((prev) => ({
      ...prev,
      [playerSelection.name]: playerSelection.amountOfCheese,
      [computerSelection.name]: computerSelection.amountOfCheese,
    }));
  }
};
