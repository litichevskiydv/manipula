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
      for (let i = 0; i < this._count; i++) {
        const currentState = iterator.next();
        if (currentState.done) return;
        queue.push(currentState.value);
      }
      for (let currentState = iterator.next(); currentState.done === false; currentState = iterator.next()) {
        yield queue.shift();
        queue.push(currentState.value);
      }
    }
  }
};
