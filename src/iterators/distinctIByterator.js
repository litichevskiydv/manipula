const Manipula = require("../manipula");
const HashSet = require("collectio-hashset");
const { DefaultEqualityComparer } = require("equality-comparison");

/**
 * Class representing iterable whose elements are the distinct elements of the source iterable,
 * where "distinctness" is determined via a projection and the specified comparer.
 * @extends Manipula
 */
module.exports = class DistinctByIterator extends Manipula {
  constructor(source, keySelector, comparer) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer || DefaultEqualityComparer;
  }

  *[Symbol.iterator]() {
    const set = new HashSet(this._comparer);

    for (const element of this._source) {
      const elementKey = this._keySelector(element);
      if (set.has(elementKey) === false) {
        set.add(elementKey);
        yield element;
      }
    }
  }
};
