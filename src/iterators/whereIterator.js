const Manipula = require("../manipula");

class WhereIterator extends Manipula {
  constructor(source, predicate) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) if (this._predicate(element, i++)) yield element;
  }
}

Manipula.prototype.where = function(predicate) {
  return new WhereIterator(this, predicate);
};
