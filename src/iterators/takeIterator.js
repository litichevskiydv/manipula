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
    let i = 0;
    for (const element of this._source) if (i++ < this._count) yield element;
  }
};
