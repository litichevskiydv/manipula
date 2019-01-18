const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of taking given number of elements from the end of the source iterable.
 * @extends Manipula
 */
module.exports = class TakeLastIterator extends Manipula {
  constructor(source, count) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count <= 0) return;

    const queue = [];
    const iterator = this._source[Symbol.iterator]();
    for (let currentState = iterator.next(); currentState.done === false; currentState = iterator.next())
      if (queue.length === this._count)
        for (; currentState.done === false; currentState = iterator.next()) {
          queue.shift();
          queue.push(currentState.value);
        }
      else queue.push(currentState.value);

    for (const element of queue) yield element;
  }
};
