const Manipula = require("../manipula");

class ConcatIterator extends Manipula {
  constructor(first, second) {
    super();
    this._first = first;
    this._second = second;
  }

  *[Symbol.iterator]() {
    yield* this._first;
    yield* this._second;
  }
}

Manipula.prototype.concat = function(second) {
  return new ConcatIterator(this, second);
};
