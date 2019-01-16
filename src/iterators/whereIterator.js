const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of filtering source iterable by the giving predicate.
 * @extends Manipula
 */
module.exports = class WhereIterator extends Manipula {
  constructor(source, predicate) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) if (this._predicate(element, i++)) yield element;
  }
};
