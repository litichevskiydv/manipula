const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of adding given value to the beginning of the source iterable.
 * @extends Manipula
 */
module.exports = class PrependIterator extends Manipula {
  constructor(source, element) {
    super();
    this._source = source;
    this._element = element;
  }

  *[Symbol.iterator]() {
    yield this._element;
    yield* this._source;
  }
};
