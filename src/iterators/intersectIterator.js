const Manipula = require("../manipula");
const HashSet = require("collectio-hashset");
const { DefaultEqualityComparer } = require("equality-comparison");

/**
 * Class representing iterable whose elements are intersection between current and given iterables.
 * @extends Manipula
 */
module.exports = class IntersectIterator extends Manipula {
  constructor(first, second, comparer) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer || DefaultEqualityComparer;
  }

  *[Symbol.iterator]() {
    const set = new HashSet(this._comparer);
    for (const element of this._second) set.add(element);

    for (const element of this._first) if (set.delete(element) === true) yield element;
  }
};
