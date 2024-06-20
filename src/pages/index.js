import { useEffect, useState } from "react";

const CatComponent = () => {

  class Cat {
    // Defines a class cat
    static instances = [];
    static baseId = 0;

    constructor(name) {
      this.id = ++Cat.baseId;
      this.name = name;
      this._amountOfCheese = this._randomAmountOfCheese();
      Cat.instances.push(this);
    }

    get AmountOfCheese() {
      return this._amountOfCheese;
    }

    _randomAmountOfCheese() {
      return Math.floor(Math.random() * 4) + 1;
    }

    resetAmountOfCheese() {
      this._amountOfCheese = this._randomAmountOfCheese();
    }

    increaseAmountOfCheese() {
      this._amountOfCheese += this._randomAmountOfCheese();
    }
  }

  class Player {
    static instances = [];

    constructor(name = "Player1") {
      this.name = name;
      this.points = 0;
      this.selections = [];
      Player.instances.push(this);
    }

    static statistics() {
      // Get the total points for each player
      console.log(players);
      let scores = {};

      // Print the total points for each player
      for (const [key, value] of Object.entries(players)) {
        scores[key] = value.points;
        console.log(`${key} scored = ${value.points}`);
      }

      // Get the winner
      const winner = Math.max(...Object.values(scores));
      const winners = Object.keys(scores).filter((key) => scores[key] === winner);
      if (winners.length === 1) {
        console.log(`The winner is ${players[winners[0]].name}`);
      } else {
        console.log(`It's a tie between ${winners.join(" and ")}`);
      }
      Player.resetPlayers();
    }

    static resetPlayers() {
      Player.instances.forEach((player) => {
        player.points = 0;
        player.selections = [];
      });
      Player.instances = [];
    }

    logPoints() {
      console.log(`${this.name} points - ${this.points}`);
    }

    addPoints(amount) {
      this.points += amount;
    }

    chooseCat(id) {
      if (id === 0) {
        // This is when the user is the computer
        id = Math.floor(Math.random() * Cat.instances.length) + 1;
      }
      const selected = Cat.instances.find((cat) => cat.id === id);
      if (selected !== undefined) {
        this.selections.push(selected);
        return selected;
      } else {
        throw new Error("Cat was not found, please choose another cat");
      }
    }
  }

  // Create cats and players in a useEffect to ensure they are not recreated on each render
  useEffect(() => {
    const redCat = new Cat("redCat");
    const greenCat = new Cat("greenCat");
    const pinkCat = new Cat("pinkCat");
    const blueCat = new Cat("blueCat");

    const player1 = new Player("Chinonso");
    const computer = new Player("Computer");

    // Store the cats and players in state
    setCats([redCat, greenCat, pinkCat, blueCat]);
    setPlayers({ player1, computer });

    return () => {
      Cat.instances = [];
      Player.instances = [];
    };
  }, []);

  // Manage the state of all the cats instance
  const [cats, setCats] = useState([]);

  // Manage the state of all the players
  const [players, setPlayers] = useState({ player1: null, computer: null });

  // Manage the amount of cheese with each cat
  const [cheeseAmounts, setCheeseAmounts] = useState({});

  // Ensures that the cheeseAmount state is always updated when the cheese in any of the cat changes
  useEffect(() => {
    const initialCheeseAmounts = cats.reduce((acc, cat) => {
      acc[cat.name] = cat.AmountOfCheese;
      return acc;
    }, {});
    setCheeseAmounts(initialCheeseAmounts);
  }, [cats]);

  // When a player clicks on the button, it calls the object
  const handlePlayerSelection = (id) => {
    const { player1, computer } = players;
    let playerSelection;
    let computerSelection;

    // If the user select a Cat that does not exist it should throw an error
    try {
      playerSelection = player1.chooseCat(id);
      computerSelection = computer.chooseCat(0);
    } catch (error) {
      console.log(error.message);
      return;
    }

    if (playerSelection.name === computerSelection.name) {
      // since they both selected the same cat we need to increase the amount of cheese for just that cat
      computerSelection.increaseAmountOfCheese(); // Increase the amount of cheese on this cat
      setCheeseAmounts((prev) => ({
        ...prev,
        [computerSelection.name]: computerSelection.AmountOfCheese, // Add the updated amount of cheese to state
      }));
      console.log("It's a tie");
    } else {
      player1.addPoints(playerSelection.AmountOfCheese);
      computer.addPoints(computerSelection.AmountOfCheese);
      playerSelection.resetAmountOfCheese();
      computerSelection.resetAmountOfCheese();

      setCheeseAmounts((prev) => ({
        ...prev,
        [playerSelection.name]: playerSelection.AmountOfCheese,
        [computerSelection.name]: computerSelection.AmountOfCheese,
      }));

      console.log(
        `${player1.name} selected ${playerSelection.name} and scored ${cheeseAmounts[playerSelection.name]} points. Total points = ${player1.points}`
      );
      console.log(
        `${computer.name} selected ${computerSelection.name} and scored ${cheeseAmounts[computerSelection.name]} points. Total points = ${computer.points}`
      );
    }
  };

  return (
    <>
      <div>
        {cats.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handlePlayerSelection(cat.id)}
            className="mr-2"
          >
            {cat.name} {cheeseAmounts[cat.name]}
          </button>
        ))}
      </div>

      <div>
        Once you click on this button the game will reset.
        <button onClick={Player.statistics}>Click me to view the winner!</button>
      </div>
    </>
  );
};

const Home = () => {
  return <CatComponent />;
};

export default Home;
