const Manipula = require("../manipula");
const HashSet = require("collectio-hashset");
const { DefaultEqualityComparer } = require("equality-comparison");

class ExceptIterator extends Manipula {
  constructor(first, second, comparer) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer || DefaultEqualityComparer;
  }

  *[Symbol.iterator]() {
    const set = new HashSet(this._comparer);
    for (const element of this._second) set.add(element);

    for (const element of this._first)
      if (set.has(element) === false) {
        set.add(element);
        yield element;
      }
  }
}

Manipula.prototype.except = function(second, comparer) {
  return new ExceptIterator(this, second, comparer);
};
