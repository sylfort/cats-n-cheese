export default class Player {
  constructor(name = "Player1") {
    this.name = name;
    this.points = 0;
    this.selections = [];
  }

  logPoints() {
    console.log(`${this.name} points - ${this.points}`);
  }

  addPoints(amount) {
    this.points += amount;
  }

  chooseCat(id, cats) {
    if (id === 0) {
      // This is when the user is the computer
      id = Math.floor(Math.random() * cats.length) + 1;
    }
    const selected = cats.find((cat) => cat.id === id);
    console.log(selected);
    if (selected !== undefined) {
      this.selections.push(selected);
      return selected;
    } else {
      throw new Error("Cat was not found, please choose another cat");
    }
  }
}
