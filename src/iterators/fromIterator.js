const Manipula = require("../manipula");

class FromIterator extends Manipula {
  constructor(source) {
    super();
    this._source = source;

    if (Manipula._lengthPropertyName in source)
      Object.defineProperty(this, Manipula._lengthPropertyName, {
        get: () => this._source[Manipula._lengthPropertyName]
      });
  }

  *[Symbol.iterator]() {
    for (const element of this._source) yield element;
  }
}

Manipula.from = function(iterable) {
  return new FromIterator(iterable);
};
