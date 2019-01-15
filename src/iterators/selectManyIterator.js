const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of invoking the transform function on each element of source iterable and flattening resulting iterables.
 * @extends Manipula
 */
module.exports = class SelectManyIterator extends Manipula {
  constructor(source, selector) {
    super();
    this._source = source;
    this._selector = selector;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) yield* this._selector(element, i++);
  }
};
