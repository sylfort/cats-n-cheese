import { useEffect, useState } from "react";
import Image from "next/image";
import Cat from "@/utils/cat";
import Player from "@/utils/player";
import GameRulesModal from "@/components/component/rules";
import EndGameModal from "@/components/component/endGameModal";
import CheeseIcon from "@/components/cheeseIcon";

import warriorCat from "@/assets/warrior_cat.jpg";
import gangsterCat from "@/assets/gangster_cat.jpg";
import pirateCat from "@/assets/pirate_cat.jpg";
import wizardCat from "@/assets/wizard_cat.jpg";

const images = [warriorCat, gangsterCat, pirateCat, wizardCat];

const CatComponent = () => {
  const [cats, setCats] = useState([]);
  const [players, setPlayers] = useState({
    singlePlayer: null,
    computer: null,
  });
  const [cheeseAmounts, setCheeseAmounts] = useState({});
  let [rounds, setRounds] = useState(1); // To handle number of rounds

  useEffect(() => {
    const initialCats = [
      new Cat("Warrior Cat"),
      new Cat("Gangster Cat"),
      new Cat("Pirate Cat"),
      new Cat("Wizard Cat"),
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
    console.log(rounds);
    // Show winner after 8 rounds
    if (rounds >= 8) {
      handleShowStatistics();
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

  const handleShowStatistics = () => {
    // indicate that game has ended
    console.log("Game ended.");

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
      console.log(`It's a tie between ${winners.join(" and ")}`);
    }

    // Reset players using the Player class constructor
    const singlePlayer = new Player("Player");
    const computer = new Player("Computer");

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

  const handleRestart = () => {
    console.log("Game restarted");
    // setIsEnd(false);
    // Reset players using the Player class constructor
    const singlePlayer = new Player("Player");
    const computer = new Player("Computer");

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

    // Clear scores and winner

    setScores((prevScores) => {
      return Object.keys(prevScores).reduce((acc, initialKeys) => {
        acc[initialKeys] = 0;
        return acc;
      }, {});
    });

    // setScores({});
    // setIsEnd(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cats.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => handlePlayerSelection(cat.id)}
            className={`flex flex-col items-center justify-center p-2 text-white rounded ${
              index % 4 === 0
                ? "bg-red-500"
                : index % 4 === 1
                ? "bg-green-500"
                : index % 4 === 2
                ? "bg-pink-500"
                : "bg-blue-500"
            }`}
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src={images[index % images.length]}
                alt={cat.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <span className="mt-2 text-sm sm:text-base">
              {cat.name}
              <div className="flex justify-center mt-1">
                {Array.from({ length: cheeseAmounts[cat.name] }).map(
                  (_, idx) => (
                    <CheeseIcon key={idx} className="w-4 h-4" />
                  )
                )}
              </div>
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div>
          <EndGameModal
            scores={
              scores && (
                <>
                  <p className="mt-2">{winner}</p>

                  <div className="mt-2">
                    {Object.entries(scores).map(([name, points]) => (
                      <p key={name}>{`${name} score = ${points}`}</p>
                    ))}
                  </div>
                </>
              )
            }
            onClick={handleShowStatistics}
            restartGame={handleRestart}
            isEnd={isEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default CatComponent;
