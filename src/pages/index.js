import { useEffect, useState } from "react";

const CatComponent = () => {
  const [cat, setCat] = useState({
    cat1: { id: 1, name: "redCat", amountOfCheese: randomAmountOfCheese() },
    cat2: {
      id: 2,
      name: "greenCat",
      amountOfCheese: randomAmountOfCheese(),
    },
    cat3: {
      id: 3,
      name: "pinkCat",
      amountOfCheese: randomAmountOfCheese(),
    },
    cat4: {
      id: 4,
      name: "blueCat",
      amountOfCheese: randomAmountOfCheese(),
    },
  });

  let [playerSelection, setPlayerSelection] = useState(null);
  let [playerPoints, setPlayerPoints] = useState(0);
  let [computerSelection, setComputerSelection] = useState(null);
  let [computerPoints, setComputerPoints] = useState(0);

  useEffect(() => {
    if (playerSelection && computerSelection) {
      if (playerSelection.id === computerSelection.id) {
        // player and computer selected the same cat
        // playerSelection.id reperesents the cat id
        console.log("The same");
        updateAmountOfCheese(playerSelection.id);
        setTimeout(() => {
          logPoints();
        }, 1000);
      } else {
        console.log("Not the same");
        setPlayerPoints(
          (state) => state + cat[`cat${playerSelection.id}`].amountOfCheese
        );
        setComputerPoints(
          (state) => state + cat[`cat${computerSelection.id}`].amountOfCheese
        );
        setTimeout(() => {
          logPoints();
        }, 1000);
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
    console.log(cat);
    setPlayerSelection(cat);
    handleComputerSelection();
  };

  const handleComputerSelection = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    setComputerSelection(Object.values(cat)[randomIndex]);
  };

  const logPoints = () => {
    console.log(`player points - ${playerPoints}`);
    console.log(`computer points - ${computerPoints}`);
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
    </div>
  );
};

const Home = () => {
  return <CatComponent />;
};

export default Home;
