function cats(randomAmountOfCheese) {
  return {
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
  };
}

export default cats;
