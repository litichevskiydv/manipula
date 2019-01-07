const Manipula = require("../manipula");

class RepeatIterator extends Manipula {
  constructor(element, count) {
    super();
    this._element = element;
    this._count = count;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._count; i++) yield this._element;
  }
}

Manipula.repeat = function(element, count) {
  if (count < 0) throw new Error("Count mustn't be negative");

  return new RepeatIterator(element, count);
};
