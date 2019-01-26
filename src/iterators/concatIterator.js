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

    const firstLengthPropertyName = Manipula._getLengthPropertyName(this._first);
    const secondLengthPropertyName = Manipula._getLengthPropertyName(this._second);
    if (firstLengthPropertyName && secondLengthPropertyName)
      Object.defineProperty(this, firstLengthPropertyName, {
        get: () => this._first[firstLengthPropertyName] + this._second[secondLengthPropertyName]
      });
  }

  *[Symbol.iterator]() {
    yield* this._first;
    yield* this._second;
  }
};
