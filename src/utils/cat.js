export default class Cat {
  constructor(name) {
    this.id = 0;
    this.name = name;
    this._amountOfCheese = 0;
  }

  get amountOfCheese() {
    return this._amountOfCheese;
  }

  set amountOfCheese(cats) {
    this._amountOfCheese = this._randomAmountOfCheese(cats);
  }

  _randomAmountOfCheese(cats) {
    return Math.floor(Math.random() * 4) + 1;
  }

  resetAmountOfCheese(cats) {
    this.amountOfCheese = cats;
  }

  increaseAmountOfCheese(cats) {
    this._amountOfCheese += this._randomAmountOfCheese(cats);
  }
}
