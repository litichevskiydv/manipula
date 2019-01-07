const Manipula = require("../manipula");
const HashSet = require("collectio-hashset");
const { DefaultEqualityComparer } = require("equality-comparison");

class DistinctIterator extends Manipula {
  constructor(source, comparer) {
    super();
    this._source = source;
    this._comparer = comparer || DefaultEqualityComparer;
  }

  *[Symbol.iterator]() {
    const set = new HashSet(this._comparer);

    for (const element of this._source)
      if (set.has(element) === false) {
        set.add(element);
        yield element;
      }
  }
}

Manipula.prototype.distinct = function(comparer) {
  return new DistinctIterator(this, comparer);
};
