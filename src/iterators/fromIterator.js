const Manipula = require("../manipula");

/**
 * Class for wrapping original iterable
 * @extends Manipula
 */
module.exports = class FromIterator extends Manipula {
  constructor(source) {
    super();
    this._source = source;

    if (Manipula._lengthPropertyName in source)
      Object.defineProperty(this, Manipula._lengthPropertyName, {
        get: () => this._source[Manipula._lengthPropertyName]
      });
  }

  *[Symbol.iterator]() {
    yield* this._source;
  }
};
