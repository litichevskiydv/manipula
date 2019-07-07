const Manipula = require("../manipula");

module.exports = class BatchIterator extends Manipula {
  constructor(source, size, resultSelector) {
    super();
    this._source = source;
    this._size = size;
    this._resultSelector = resultSelector;

    const lengthPropertyName = Manipula._getLengthPropertyName(this._source);
    if (lengthPropertyName)
      Object.defineProperty(this, lengthPropertyName, {
        get: () => Math.trunc((this._source[lengthPropertyName] + this._size - 1) / this._size)
      });
  }

  *[Symbol.iterator]() {
    let bucket = null;
    for (const element of this._source) {
      if (!bucket) bucket = [];

      bucket.push(element);

      if (bucket.length === this._size) {
        yield this._resultSelector(Manipula.from(bucket));
        bucket = null;
      }
    }

    if (bucket) yield this._resultSelector(Manipula.from(bucket));
  }
};
