import React from "react";
import { X } from "lucide-react";

const GameRulesModal = ({ isOpen, toggleModal }) => {
  return (
    <>
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
              <h3 className="text-xl font-bold">
                Cats nlsquo; Cheese - Game Rules
              </h3>
              <button onClick={toggleModal} className="text-black close-modal">
                <X size={24} />
              </button>
            </div>
            <div className="mt-4 overflow-y-auto max-h-[70vh] space-y-4">
              <section>
                <h4 className="mb-2 text-lg font-bold">🐱 Game Overview</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Players: 4 players (1 human, 3 computer-controlled)</li>
                  <li>Rounds: 8 rounds per game</li>
                  <li>
                    Objective: Collect the most cheese cards by the end of the
                    game
                  </li>
                </ul>
              </section>

              <section>
                <h4 className="mb-2 text-lg font-bold">📜 How to Play</h4>
                <ol className="ml-5 space-y-3 list-decimal list-outside">
                  <li>
                    <strong>Setup:</strong> Each cat starts with 1-4 cheese
                    slices.
                  </li>
                  <li>
                    <strong>Target Selection:</strong> Players secretly choose
                    which cat to steal from by clicking on a cat card.
                  </li>
                  <li>
                    <strong>Cheese Collection:</strong>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      <li>
                        If you are the only player targeting a cat, you
                        successfully steal all its cheese!
                      </li>
                      <li>
                        If multiple players target the same cat, the cat becomes
                        aware, and no one gets the cheese.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Round Progression:</strong> Cats receive new cheese
                    each round, increasing their cheese pile.
                  </li>
                </ol>
              </section>

              <section>
                <h4 className="mb-2 text-lg font-bold">🏆 Winning the Game</h4>
                <p>
                  The mouse (player) with the most collected cheese at the end
                  of 8 rounds wins!
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameRulesModal;
