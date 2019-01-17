const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of skipping given number of elements of the source iterable.
 * @extends Manipula
 */
module.exports = class SkipIterator extends Manipula {
  constructor(source, count) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) if (i++ >= this._count) yield element;
  }
};
