const Manipula = require("../manipula");

class SelectIterator extends Manipula {
  constructor(source, selector) {
    super();
    this._source = source;
    this._selector = selector;

    if (Manipula._lengthPropertyName in source)
      Object.defineProperty(this, Manipula._lengthPropertyName, {
        get: () => this._source[Manipula._lengthPropertyName]
      });
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) yield this._selector(element, i++);
  }
}

Manipula.prototype.select = function(selector) {
  return new SelectIterator(this, selector);
};
