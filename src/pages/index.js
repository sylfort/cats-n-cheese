import { useEffect, useState } from "react";
import Cat from "@/utils/cat";
import Player from "@/utils/player";

const CatComponent = () => {
  const [cats, setCats] = useState([]);
  const [players, setPlayers] = useState({ singlePlayer: null, computer: null });
  const [cheeseAmounts, setCheeseAmounts] = useState({});

  useEffect(() => {
    // More cats can be added here
    const initialCats = [
      new Cat("redCat"),
      new Cat("greenCat"),
      new Cat("pinkCat"),
      new Cat("blueCat"),
    ];

    const singlePlayer = new Player("Player");
    const computer = new Player("Computer");

    // update the amount of cheese on each cat, this is mandatory
    let id = 0;
    for (const cat of initialCats) {
      cat.id = ++id;
      cat.amountOfCheese = initialCats;
    }
    id = 0;

    const initialCheeseAmounts = initialCats.reduce((acc, cat) => {
      // prepare for a state update
      acc[cat.name] = cat.amountOfCheese;
      return acc;
    }, {});

    // update the cats state
    setCats(initialCats);
    // update the players state
    setPlayers({ singlePlayer, computer });
    // Update the state of the cheese
    setCheeseAmounts(initialCheeseAmounts);
  }, []);

  const handlePlayerSelection = (id) => {
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

  const handleShowStatistics = () => {
    // showing statistics ends the game, this can be modified
    const scores = {};

    // This can be update to display to the user
    Object.values(players).forEach((player) => {
      scores[player.name] = player.points;
      console.log(`${player.name} scored = ${player.points}`);
    });

    const winner = Math.max(...Object.values(scores));
    const winners = Object.keys(scores).filter((key) => scores[key] === winner);
    if (winners.length === 1) {
      console.log(`The winner is ${winners[0]}`);
    } else {
      console.log(`It's a tie between ${winners.join(" and ")}`);
    }

    setPlayers((prevPlayers) => {
      const resetPlayers = Object.fromEntries(
        Object.entries(prevPlayers).map(([key, player]) => [
          key,
          { ...player, points: 0, selections: [] },
        ])
      );
      return resetPlayers;
    });

    setCats((prevCats) =>
      prevCats.map((cat) => {
        const newCat = new Cat(cat.name);
        newCat.amountOfCheese = cats;
        return newCat;
      })
    );

    setCheeseAmounts((prevCheeseAmounts) => {
      const resetCheeseAmounts = cats.reduce((acc, cat) => {
        acc[cat.name] = cat.amountOfCheese;
        return acc;
      }, {});
      return resetCheeseAmounts;
    });
  };

  return (
    <>
      <div>
        {cats.map((cat) => (
          <span
            key={cat.id}
            onClick={() => handlePlayerSelection(cat.id)}
            className="mr-2"
          >
            {cat.name} {cheeseAmounts[cat.name]}
          </span>
        ))}
      </div>

      <div>
        Once you click on this button the game will reset.
        <button onClick={handleShowStatistics}>Click me to view the winner!</button>
      </div>
    </>
  );
};

const Home = () => {
  return <CatComponent />;
};

export default Home;
