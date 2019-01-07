const Manipula = require("../manipula");

class TakeIterator extends Manipula {
  constructor(source, count) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) if (i++ < this._count) yield element;
  }
}

Manipula.prototype.take = function(count) {
  return new TakeIterator(this, count);
};
