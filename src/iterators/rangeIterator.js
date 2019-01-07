const Manipula = require("../manipula");

class RangeIterator extends Manipula {
  constructor(start, count) {
    super();
    this._start = start;
    this._count = count;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._count; i++) yield this._start + i;
  }
}

Manipula.range = function(start, count) {
  if (count < 0) throw new Error("Count mustn't be negative");

  return new RangeIterator(start, count);
};
