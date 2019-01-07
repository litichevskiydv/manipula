const Manipula = require("../manipula");

class ReverseIterator extends Manipula {
  constructor(source) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    const sourceArray = Array.from(this._source);
    for (let i = sourceArray.length - 1; i > -1; i--) yield sourceArray[i];
  }
}

Manipula.prototype.reverse = function() {
  return new ReverseIterator(this);
};
