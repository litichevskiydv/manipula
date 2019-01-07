const Manipula = require("../manipula");

class selectManyIterator extends Manipula {
  constructor(source, selector) {
    super();
    this._source = source;
    this._selector = selector;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) yield* this._selector(element, i++);
  }
}

Manipula.prototype.selectMany = function(selector) {
  return new selectManyIterator(this, selector);
};
