const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements consists of the one repeating value.
 * @extends Manipula
 */
module.exports = class RepeatIterator extends Manipula {
  constructor(element, count) {
    super();
    this._element = element;
    this._count = count;
    this.length = this._count;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._count; i++) yield this._element;
  }
};
