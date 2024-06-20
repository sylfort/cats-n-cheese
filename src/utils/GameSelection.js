class GameSelection {
  // Handles updating the current selected cat amount of cheese
  // when the player and computer select the same cat
  static sameSelection(setMessage, updateAmountOfCheese, cat) {
    setMessage("The same");
    updateAmountOfCheese(cat.id);
  }
  // Handles updating the player and computer points when,
  // the player and computer select different cats
  static differentSelection(
    cat,
    setMessage,
    computerSelection,
    playerSelection,
    setPlayerPoints,
    setComputerPoints
  ) {
    setMessage("Not the same");
    setPlayerPoints(
      (state) => state + cat[`cat${playerSelection.id}`].amountOfCheese
    );
    setComputerPoints(
      (state) => state + cat[`cat${computerSelection.id}`].amountOfCheese
    );
  }
}

export default GameSelection;
