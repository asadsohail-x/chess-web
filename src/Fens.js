export default class Fens {
  constructor() {
    let fens = [];
    if (localStorage.getItem("fens"))
      fens = JSON.parse(localStorage.getItem("fens"));
    this._fens = fens;
  }

  isEmpty() {
    return this._fens.length === 0;
  }

  isLast() {
    return this._fens.length === 1;
  }

  pushFen(fen) {
    this._fens.push(fen);
    this.syncFens();
  }

  popFen() {
    this._fens.pop();
    this.syncFens();
  }

  syncFens() {
    localStorage.setItem("fens", JSON.stringify(this._fens));
  }

  clearFens() {
    this._fens = [];
    this.syncFens();
  }

  getAllFens() {
    return this._fens;
  }

  getCurrentFen() {
    return this._fens[this._fens.length - 1];
  }
}
