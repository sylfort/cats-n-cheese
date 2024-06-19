// import React from "react";

// const randomAmountOfCheese = () => {
//   return Math.floor(Math.random() * 4) + 1;
// };

// const Cat1 = {
//   id: 1,
//   amountOfCheese: randomAmountOfCheese(),
// };

// const Cat2 = {
//   id: 2,
//   amountOfCheese: randomAmountOfCheese(),
// };

// const Cat3 = {
//   id: 3,
//   amountOfCheese: randomAmountOfCheese(),
// };

// const Cat4 = {
//   id: 4,
//   amountOfCheese: randomAmountOfCheese(),
// };

// console.log(Cat1);
// console.log(Cat2);
// console.log(Cat3);
// console.log(Cat4);

// const Home = () => {
//   return <div>Home</div>;
// };

// export default Home;

import { useState, useEffect } from "react";

// Your randomAmountOfCheese function
const randomAmountOfCheese = () => Math.floor(Math.random() * 4) + 1;

const CatComponent = () => {
  // Initialize state with Cat1 object
  const [cat1, setCat1] = useState({
    id: 1,
    name: "redCat",
    amountOfCheese: randomAmountOfCheese(),
  });
  // Initialize state with Cat2 object
  const [cat2, setCat2] = useState({
    id: 2,
    name: "greenCat",
    amountOfCheese: randomAmountOfCheese(),
  });
  // Initialize state with Cat3 object
  const [cat3, setCat3] = useState({
    id: 3,
    name: "pinkCat",
    amountOfCheese: randomAmountOfCheese(),
  });
  // Initialize state with Cat4 object
  const [cat4, setCat4] = useState({
    id: 4,
    name: "blueCat",
    amountOfCheese: randomAmountOfCheese(),
  });

  let [playerSelection, setPlayerSelection] = useState(null);
  let [playerPoints, setPlayerPoints] = useState(0);
  let [computerSelection, setComputerSelection] = useState(null);
  let [computerPoints, setComputerPoints] = useState(0);

  // Function to update the amountOfCheese
  const updateAmountOfCheese = (setCat) => {
    setCat((prevCat) => ({
      ...prevCat,
      amountOfCheese: prevCat + randomAmountOfCheese(),
    }));
  };

  const cats = [cat1, cat2, cat3, cat4];

  useEffect(() => {
    const handleComparison = () => {
      if (playerSelection && computerSelection) {
        if (playerSelection.id === computerSelection.id) {
          console.log("All players selected the same cat");
        } else {
          console.log("Not the same");
          setPlayerPoints(playerSelection.amountOfCheese);
          setComputerPoints(computerSelection.amountOfCheese);
          console.log(playerPoints);
          console.log(computerPoints);
        }
      }
    };

    if (playerSelection !== null && computerSelection !== null) {
      handleComparison(playerSelection, computerSelection, playerPoints);
    }
  }, [playerSelection, computerSelection, playerPoints, computerPoints]);

  const handlePlayerSelection = (cat) => {
    setPlayerSelection(cat);
    handleComputerSelection();
  };

  const handleComputerSelection = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    setComputerSelection(cats[randomIndex]);
  };

  return (
    <div>
      <button onClick={() => handlePlayerSelection(cat1)} className="mr-2">
        {cat1.name}
      </button>
      <button onClick={() => handlePlayerSelection(cat2)} className="mr-2">
        {cat2.name}
      </button>
      <button onClick={() => handlePlayerSelection(cat3)} className="mr-2">
        {cat3.name}
      </button>
      <button onClick={() => handlePlayerSelection(cat4)}>{cat4.name}</button>
    </div>
  );
};

const Home = () => {
  return <CatComponent />;
};

export default Home;
