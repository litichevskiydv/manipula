const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of appending given value to the end of the source iterable.
 * @extends Manipula
 */
module.exports = class AppendIterator extends Manipula {
  constructor(source, element) {
    super();
    this._source = source;
    this._element = element;
  }

  *[Symbol.iterator]() {
    yield* this._source;
    yield this._element;
  }
};
