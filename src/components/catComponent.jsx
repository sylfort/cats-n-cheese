import { useEffect, useState } from 'react';
import Cat from '@/utils/cat';
import Player from '@/utils/player';
import GameRulesModal from '@/components/rules';
import CheeseIcon from '@/components/cheeseIcon';
import { handleShowStatistics } from '@/utils/showStatistics';
import { handlePlayerSelection } from '@/utils/playerSelection';

export const CatComponent = () => {
  const [cats, setCats] = useState([]);
  const [players, setPlayers] = useState({});
  const [cheeseAmounts, setCheeseAmounts] = useState({});
  let [rounds, setRounds] = useState(1); // To handle number of rounds

  useEffect(() => {
    // More cats can be added here
    const initialCats = [
      new Cat('redCat'),
      new Cat('greenCat'),
      new Cat('pinkCat'),
      new Cat('blueCat'),
    ];

    const singlePlayer = new Player('Player');
    const computer = new Player('Computer');

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

  const handlePlayerSelectionWrapper = (id) => {
    handlePlayerSelection(id, {
      rounds,
      setRounds,
      players,
      setPlayers,
      cats,
      setCats,
      cheeseAmounts,
      setCheeseAmounts,
    });
  };

  return (
    <>
      <div>
        {cats.map((cat) => (
          <span
            key={cat.id}
            onClick={() => handlePlayerSelectionWrapper(cat.id)}
            className="mr-2 cursor-pointer"
          >
            {cat.name} {cheeseAmounts[cat.name]}
            {Array.from({ length: cheeseAmounts[cat.name] }).map((_, index) => (
              <CheeseIcon key={index} />
            ))}
          </span>
        ))}
      </div>

      <div>
        Once you click on this button the game will end.
        <button
          className="p-1 bg-blue-300 rounded-md ml-1 text-sm shadow-sm"
          onClick={() =>
            handleShowStatistics({
              players,
              setPlayers,
              cats,
              setCats,
              setCheeseAmounts,
              setRounds,
            })
          }
        >
          End game.
        </button>
      </div>
    </>
  );
};
