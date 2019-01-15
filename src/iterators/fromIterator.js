const Manipula = require("../manipula");

/**
 * Class for wrapping original itarable
 * @extends Manipula
 */
module.exports = class FromIterator extends Manipula {
  /**
   * Create wrapper for iterable.
   * @param {Iterable<any>} source Iterable for wrapping.
   */
  constructor(source) {
    super();
    this._source = source;

    if (Manipula._lengthPropertyName in source)
      Object.defineProperty(this, Manipula._lengthPropertyName, {
        get: () => this._source[Manipula._lengthPropertyName]
      });
  }

  /**
   * Method returns a new Iterator contains sequence from original iterable.
   * @returns {Iterable<any>} A new Iterator contains sequence from original iterable.
   */
  *[Symbol.iterator]() {
    yield* this._source;
  }
};
