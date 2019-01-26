const Manipula = require("../manipula");

/**
 * Class for wrapping original iterable
 * @extends Manipula
 */
module.exports = class FromIterator extends Manipula {
  constructor(source) {
    super();
    this._source = source;
    this._tryDefineLengthProperty(this._source);
  }

  *[Symbol.iterator]() {
    yield* this._source;
  }
};
