const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of taking given number of contiguous elements from the start of the source iterable.
 * @extends Manipula
 */
module.exports = class TakeIterator extends Manipula {
  constructor(source, count) {
    super();
    this._source = source;
    this._count = count;
  }
  
  *[Symbol.iterator]() {
    const iterator = this._source[Symbol.iterator]();
    for (
      let currentState = iterator.next(), i = 0; 
      !currentState.done && i < this._count;
      currentState = iterator.next(), i++
    )
      yield currentState.value;
  }
};
