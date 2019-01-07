const Manipula = require("../manipula");

class OrderByIterator extends Manipula {
  constructor(source, keySelector, sortByDescending, compareFunction) {
    super();
    this._source = source;
    this._comparers = [
      {
        keySelector: keySelector,
        sortByDescending: sortByDescending,
        compareFunction: compareFunction
      }
    ];
  }

  thenBy(keySelector, compareFunction) {
    this._comparers.push({
      keySelector: keySelector,
      sortByDescending: false,
      compareFunction: compareFunction
    });
    return this;
  }

  thenByDescending(keySelector, compareFunction) {
    this._comparers.push({
      keySelector: keySelector,
      sortByDescending: true,
      compareFunction: compareFunction
    });
    return this;
  }

  static defaultCompareFunction(firstValue, secondValue) {
    if (firstValue < secondValue) return -1;
    if (firstValue > secondValue) return 1;
    return 0;
  }

  *[Symbol.iterator]() {
    const sourceArray = Array.from(this._source);
    sourceArray.sort((a, b) => {
      for (const comparer of this._comparers) {
        const firstValue = comparer.keySelector(a);
        const secondValue = comparer.keySelector(b);

        let comparisonResult = comparer.compareFunction
          ? comparer.compareFunction(firstValue, secondValue)
          : OrderByIterator.defaultCompareFunction(firstValue, secondValue);
        comparisonResult *= comparer.sortByDescending === true ? -1 : 1;
        if (comparisonResult !== 0) return comparisonResult;
      }
      return 0;
    });

    for (const element of sourceArray) yield element;
  }
}

Manipula.prototype.orderBy = function(keySelector, compareFunction) {
  return new OrderByIterator(this, keySelector, false, compareFunction);
};

Manipula.prototype.orderByDescending = function(keySelector, compareFunction) {
  return new OrderByIterator(this, keySelector, true, compareFunction);
};
