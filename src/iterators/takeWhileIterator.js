const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are taken from the source iterable as long as a given condition is true.
 * @extends Manipula
 */
module.exports = class TakeWhileIterator extends Manipula {
  constructor(source, predicate) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    const iterator = this._source[Symbol.iterator]();
    for (
      let currentState = iterator.next(), i = 0;
      currentState.done === false && this._predicate(currentState.value, i);
      currentState = iterator.next(), i++
    )
      yield currentState.value;
  }
};
