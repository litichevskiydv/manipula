const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of skipping given number of elements from the end of the source iterable.
 * @extends Manipula
 */
module.exports = class SkipLastIterator extends Manipula {
  constructor(source, count) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count <= 0) yield* this._source;
    else {
      const queue = [];
      const iterator = this._source[Symbol.iterator]();
      for (let currentState = iterator.next(); !currentState.done; currentState = iterator.next()) {
        if (queue.length === this._count) yield queue.shift();
        queue.push(currentState.value);
      }
    }
  }
};
