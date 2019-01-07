const Manipula = require("../manipula");

class AppendIterator extends Manipula {
  constructor(source, element) {
    super();
    this._source = source;
    this._element = element;
  }

  *[Symbol.iterator]() {
    yield* this._source;
    yield this._element;
  }
}

Manipula.prototype.append = function(element) {
  return new AppendIterator(this, element);
};
