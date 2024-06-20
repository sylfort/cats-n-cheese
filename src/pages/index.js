import { useEffect, useState } from "react";

import cats from "./constants/cats";
import GameSelection from "@/utils/GameSelection";

const CatComponent = () => {
  const [cat, setCat] = useState(() => cats(randomAmountOfCheese));
  const [playerSelection, setPlayerSelection] = useState(null);
  const [computerSelection, setComputerSelection] = useState(null);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (playerSelection && computerSelection) {
      if (playerSelection.id === computerSelection.id) {
        // player and computer selected the same cat
        // playerSelection.id reperesents the cat id meant to be updated
        GameSelection.sameSelection(
          setMessage,
          updateAmountOfCheese,
          playerSelection
        );
      } else {
        GameSelection.differentSelection(
          cat,
          setMessage,
          computerSelection,
          playerSelection,
          setPlayerPoints,
          setComputerPoints
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerSelection, computerSelection]);

  // Function to update the amountOfCheese
  const updateAmountOfCheese = (catId) => {
    setCat((prevState) => {
      return {
        ...prevState,
        [`cat${catId}`]: {
          ...prevState[`cat${catId}`],
          amountOfCheese:
            prevState[`cat${catId}`].amountOfCheese + randomAmountOfCheese(),
        },
      };
    });
  };

  function randomAmountOfCheese() {
    return Math.floor(Math.random() * 4) + 1;
  }

  const handlePlayerSelection = (cat) => {
    setPlayerSelection(cat);
    handleComputerSelection();
  };

  const handleComputerSelection = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    setComputerSelection(Object.values(cat)[randomIndex]);
  };

  return (
    <div>
      <button onClick={() => handlePlayerSelection(cat.cat1)} className="mr-2">
        {cat.cat1.name}
      </button>
      <button onClick={() => handlePlayerSelection(cat.cat2)} className="mr-2">
        {cat.cat2.name}
      </button>
      <button onClick={() => handlePlayerSelection(cat.cat3)} className="mr-2">
        {cat.cat3.name}
      </button>
      <button onClick={() => handlePlayerSelection(cat.cat4)}>
        {cat.cat4.name}
      </button>
      <div className="mt-2">
        <p className="my-2">{message}</p>
        <p>
          computerPoints - {computerPoints}, playerPoints - {playerPoints}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  return <CatComponent />;
};

export default Home;
