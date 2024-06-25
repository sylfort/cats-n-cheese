import React, { useState } from "react";
import { X } from "lucide-react";

const GameRulesModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Game Rules
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50"
          onClick={toggleModal}
        >
          <div
            className="relative w-11/12 p-5 mx-auto bg-white border rounded-md shadow-lg top-20 md:w-3/4 lg:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Cats n' Cheese - Game Rules</h3>
              <button onClick={toggleModal} className="text-black close-modal">
                <X size={24} />
              </button>
            </div>
            <div className="mt-2 overflow-y-auto max-h-[70vh]">
              <h4 className="mt-2 font-bold">Game Overview</h4>
              <ul className="list-disc list-inside">
                <li>Title: Steal Cheese from Cats</li>
                <li>Players: 4 players</li>
                <li>Round Limit: 8 rounds</li>
              </ul>

              <h4 className="mt-2 font-bold">Objective</h4>
              <p>
                Players are mice and they want to steal cheese that cats have
                gathered. The player who collects the most cheese cards wins. If
                another mouse targets the same cat, the cat will become aware,
                so be careful.
              </p>

              <h4 className="mt-2 font-bold">How to Play</h4>
              <ol className="list-decimal list-inside">
                <li>
                  Number of Cheese: Each cat starts the game with a card that
                  has a number of cheese slices between 1 and 4.
                </li>
                <li>
                  Choose a Target: Players decide which cat they want to steal
                  cheese from. Each player clicks the targeted cat card.
                </li>
                <li>
                  If multiple players target the same cat, the cat will become
                  aware of the mice's presence. In this case no player gets the
                  Cheese.
                </li>
                <li>
                  Next round: Cats will receive a new cheese card on each round.
                  The total number of cheese for each cat piles up, so it's your
                  chance to comeback if you are behind!
                </li>
              </ol>

              <h4 className="mt-2 font-bold">Winning the Game</h4>
              <p>
                The mouse that collects the most cheese cards at the end of the
                game wins.
              </p>

              <h4 className="mt-2 font-bold">Continuing Gameplay</h4>
              <ol className="list-decimal list-inside">
                <li>Now Trying to Steal the Cheese!</li>
                <li>
                  Next Attempt: When attempting to steal cheese cards, set down
                  the cheese cards from the card pile on the cat cards.
                </li>
                <li>
                  Targeting a Cat: If the cat you target does not have the same
                  cat card issued by another player, you can steal all the
                  cheese cards on that cat card!
                </li>
                <li>
                  Failure to Steal: If another player issued the same cat card,
                  you fail to steal and cannot take the cheese cards.
                </li>
                <li>
                  Reusing Cat Cards: You can put the cat card back into your
                  hand and use it again.
                </li>
                <li>
                  Game End: The game ends after the eight round when the deck
                  runs out.
                </li>
              </ol>

              <h4 className="mt-2 font-bold">Ending the Game</h4>
              <ol className="list-decimal list-inside">
                <li>
                  Counting Cheese Cards: Everyone adds up the numbers on the
                  cheese cards they have stolen.
                </li>
                <li>
                  Determining the Winner: The player with the highest total
                  number from the cheese cards wins.
                </li>
              </ol>
              <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameRulesModal;
