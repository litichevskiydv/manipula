const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are the results of invoking the transform function on each element of source iterable.
 * @extends Manipula
 */
module.exports = class SelectIterator extends Manipula {
  constructor(source, selector) {
    super();
    this._source = source;
    this._selector = selector;

    if (Manipula._lengthPropertyName in source)
      Object.defineProperty(this, Manipula._lengthPropertyName, {
        get: () => this._source[Manipula._lengthPropertyName]
      });
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const element of this._source) yield this._selector(element, i++);
  }
};
