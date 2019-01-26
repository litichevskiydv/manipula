const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are integral numbers within a specified range.
 * @extends Manipula
 */
module.exports = class RangeIterator extends Manipula {
  constructor(start, count) {
    super();
    this._start = start;
    this._count = count;
    this.length = this._count;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._count; i++) yield this._start + i;
  }
};
