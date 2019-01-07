const Manipula = require("../manipula");

class PrependIterator extends Manipula {
  constructor(source, element) {
    super();
    this._source = source;
    this._element = element;
  }

  *[Symbol.iterator]() {
    yield this._element;
    yield* this._source;
  }
}

Manipula.prototype.prepend = function(element) {
  return new PrependIterator(this, element);
};
