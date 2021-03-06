const Manipula = require("../manipula");

/**
 * Class representing iterable which is an inversion of the source iterable.
 * @extends Manipula
 */
module.exports = class ReverseIterator extends Manipula {
  constructor(source) {
    super();
    this._source = source;
    this._tryDefineLengthProperty(this._source);
  }

  *[Symbol.iterator]() {
    const sourceArray = Array.from(this._source);
    for (let i = sourceArray.length - 1; i > -1; i--) yield sourceArray[i];
  }
};
