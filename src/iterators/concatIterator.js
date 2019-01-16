const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of concatenation source iterable and given.
 * @extends Manipula
 */
module.exports = class ConcatIterator extends Manipula {
  constructor(first, second) {
    super();
    this._first = first;
    this._second = second;
  }

  *[Symbol.iterator]() {
    yield* this._first;
    yield* this._second;
  }
};
