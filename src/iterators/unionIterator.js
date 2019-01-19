const Manipula = require("../manipula");
const HashSet = require("collectio-hashset");
const { DefaultEqualityComparer } = require("equality-comparison");

/**
 * Class representing iterable whose elements are union between current and given iterables.
 * @extends Manipula
 */
module.exports = class UnionIterator extends Manipula {
  constructor(first, second, comparer) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer || DefaultEqualityComparer;
  }

  *_iterate(set, source) {
    for (const element of source)
      if (set.has(element) === false) {
        set.add(element);
        yield element;
      }
  }

  *[Symbol.iterator]() {
    const set = new HashSet(this._comparer);
    yield* this._iterate(set, this._first);
    yield* this._iterate(set, this._second);
  }
};
