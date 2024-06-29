import { useState, useMemo } from "react";
import Image from "next/image";
import Cat from "@/utils/cat";
import Player from "@/utils/player";
import EndGameModal from "./endGameModal";
import CheeseIcon from "@/components/cheeseIcon";

import warriorCat from "@/assets/red.png";
import gangsterCat from "@/assets/green.png";
import pirateCat from "@/assets/pink.png";
import wizardCat from "@/assets/blue.png";

import cheese1 from "@/assets/cheese_1.png";
import cheese2 from "@/assets/cheese_2.png";
import cheese3 from "@/assets/cheese_3.png";
import cheese4 from "@/assets/cheese_4.png";

const catImages = [warriorCat, gangsterCat, pirateCat, wizardCat];
const cheeseImages = [cheese1, cheese2, cheese3, cheese4];

const CatComponent = ({ roundNumber, addLog, clearLog }) => {
  const [cats, setCats] = useState([]);
  const [players, setPlayers] = useState({
    human: null,
    computer1: null,
    computer2: null,
    computer3: null,
  });
  const [cheeseAmounts, setCheeseAmounts] = useState({});
  const [rounds, setRounds] = useState(1);
  const [scores, setScores] = useState({});
  const [winner, setWinner] = useState(null);
  const [isEnd, setIsEnd] = useState(false);
  const [startGame, setStartGame] = useState(true);

  const toggleModal = () => setIsEnd(!isEnd);

  const handleExit = () => {
    console.log("Game exited");
    setStartGame(true);
    setIsEnd(false);
    setCats([]);
    setPlayers({});
    setCheeseAmounts({});
    setRounds(1);
    setWinner(null);
    setScores({});
    clearLog();
    roundNumber(0);
  };

  const handleStartGame = () => {
    setStartGame(false);
    roundNumber(1);

    const initialCats = [
      new Cat("Warrior Cat"),
      new Cat("Gangster Cat"),
      new Cat("Pirate Cat"),
      new Cat("Wizard Cat"),
    ];

    const humanPlayer = new Player("Human");
    const computer1 = new Player("Computer 1");
    const computer2 = new Player("Computer 2");
    const computer3 = new Player("Computer 3");

    // update the amount of cheese on each cat, this is mandatory
    let id = 0;
    for (const cat of initialCats) {
      cat.id = ++id;
      cat.amountOfCheese = initialCats; // Random cheese amount between 1 and 4
    }

    const initialCheeseAmounts = initialCats.reduce((acc, cat) => {
      // prepare for a state update
      acc[cat.name] = cat.amountOfCheese;
      return acc;
    }, {});

    // update the cats state
    setCats(initialCats);

    // update the players state
    setPlayers({ human: humanPlayer, computer1, computer2, computer3 });
    setCheeseAmounts(initialCheeseAmounts);
  };

  const handlePlayerSelection = (id) => {
    // Show winner after 8 rounds
    if (rounds >= 8) {
      handleShowStatistics();
      return;
    }

    const { human, computer1, computer2, computer3 } = players;
    let humanSelection;
    let computer1Selection;
    let computer2Selection;
    let computer3Selection;

    try {
      humanSelection = human.chooseCat(id, cats);
      computer1Selection = computer1.chooseCat(0, cats);
      computer2Selection = computer2.chooseCat(0, cats);
      computer3Selection = computer3.chooseCat(0, cats);
    } catch (error) {
      console.log(error.message);
      return;
    }

    // increment the number of rounds
    setRounds(rounds + 1);
    roundNumber(rounds + 1);

    const selections = [
      humanSelection,
      computer1Selection,
      computer2Selection,
      computer3Selection,
    ];
    const playerList = [human, computer1, computer2, computer3];

    // Count the occurrences of each cat selection
    const selectionCounts = selections.reduce((acc, selection) => {
      acc[selection.name] = (acc[selection.name] || 0) + 1;
      return acc;
    }, {});

    // Award points to players who selected unique cats
    playerList.forEach((player, index) => {
      const selectedCat = selections[index];
      if (selectionCounts[selectedCat.name] === 1) {
        player.addPoints(selectedCat.amountOfCheese);
        const log = `${player.name} selected ${selectedCat.name} and scored ${selectedCat.amountOfCheese} points. Total points = ${player.points}`;
        addLog(log);
        console.log(log);
        selectedCat.resetAmountOfCheese();
      } else {
        const log = `${player.name} selected ${selectedCat.name} but scored 0 points due to duplicate selection. Total points = ${player.points}`;
        addLog(log);
        console.log(log);
      }
    });

    // Update cheese amounts for all cats
    cats.forEach((cat) => {
      if (!selectionCounts[cat.name]) {
        cat.increaseAmountOfCheese();
      }
    });

    setCheeseAmounts((prev) => {
      const newAmounts = { ...prev };
      cats.forEach((cat) => {
        newAmounts[cat.name] = cat.amountOfCheese;
      });
      return newAmounts;
    });

    // Update scores
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      playerList.forEach((player) => {
        newScores[player.name] = player.points;
      });
      return newScores;
    });
  };

  const handleShowStatistics = () => {
    console.log("Game ended.");

    const maxScore = Math.max(...Object.values(scores));
    const winners = Object.keys(scores).filter(
      (key) => scores[key] === maxScore
    );

    if (winners.length === 1) {
      setWinner(`The winner is ${winners[0]}`);
    } else {
      setWinner(`It's a tie between ${winners.join(", ")}`);
    }

    setIsEnd(true);
  };

  const handleRestart = () => {
    console.log("Game restarted");
    handleStartGame();
    setRounds(1);
    setScores({});
    setWinner(null);
    clearLog();
  };

  const renderCheeseImages = (amount) => {
    const images = [];
    let remainingCheese = amount;

    while (remainingCheese > 0) {
      if (remainingCheese >= 4) {
        images.push(cheeseImages[3]); // cheese4.png
        remainingCheese -= 4;
      } else {
        images.push(cheeseImages[remainingCheese - 1]);
        remainingCheese = 0;
      }
    }

    return images.map((cheeseImage, index) => (
      <Image
        key={`${cheeseImage}-${index}`}
        src={cheeseImage}
        alt={`Cheese ${index + 1}`}
        width={68}
        height={"auto"}
        className="inline-block mt-1 mr-1"
      />
    ));
  };

  const svgPattern = useMemo(() => {
    const patternSize = 50;
    const mazeLines = [
      "M0 0h50v50h-50z",
      "M10 0v50",
      "M20 0v30m0 20v0",
      "M30 10h20",
      "M40 20v30",
      "M0 30h30",
      "M10 40h30",
    ];

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${patternSize}" height="${patternSize}">
        <rect width="${patternSize}" height="${patternSize}" fill="#f9fafb" />
        <path d="${mazeLines.join(
          " "
        )}" fill="none" stroke="#d1d5db" stroke-width="1" />
      </svg>
    `;

    const encodedSVG = encodeURIComponent(svgContent);
    return `url("data:image/svg+xml,${encodedSVG}")`;
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4"
      style={{
        backgroundImage: svgPattern,
        backgroundSize: "18px 18px",
        backgroundRepeat: "repeat",
        backgroundPosition: "0 0",
      }}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cats.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => handlePlayerSelection(cat.id)}
            className={`flex flex-col items-center justify-center p-2 text-white rounded`}
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src={catImages[index % catImages.length]}
                alt={cat.name}
                className="rounded"
                priority={false}
                loading="lazy"
                decoding="async"
                srcSet="small-image.png 300w,
                medium-image.png 600w,
                large-image.png 1200w"
                sizes="(min-width: 66em) 33vw,
                (min-width: 44em) 50vw,
                100vw"
              />
            </div>
            <span className="mt-2 text-sm sm:text-base">
              {cat.name}
              <div className="flex flex-wrap justify-center mt-1">
                {renderCheeseImages(cheeseAmounts[cat.name])}
              </div>
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center space-y-2">
        {startGame ? (
          <button
            onClick={handleStartGame}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Start
          </button>
        ) : (
          <EndGameModal onClick={handleShowStatistics} />
        )}
        {isEnd && (
          <div
            className="fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50"
            onClick={toggleModal}
          >
            <div
              className="relative w-11/12 p-5 mx-auto bg-white border rounded-md shadow-lg top-20 md:w-3/4 lg:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Game ended.</h3>
              </div>
              <div className="mt-2 overflow-y-auto max-h-[70vh]">
                <p className="mt-2">{winner}</p>
                <div className="mt-2">
                  {Object.entries(scores).map(([name, points]) => (
                    <p key={name}>{`${name}'s score = ${points}`}</p>
                  ))}
                </div>
              </div>
              <button
                className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => {
                  handleRestart();
                  toggleModal();
                }}
              >
                Restart Game
              </button>
              <button
                className="px-4 py-2 mt-2 ml-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                onClick={() => {
                  toggleModal();
                  handleExit();
                }}
              >
                Exit game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatComponent;
