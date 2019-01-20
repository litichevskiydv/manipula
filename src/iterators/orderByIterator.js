const Manipula = require("../manipula");

/**
 * Class representing iterable whose elements are results of ordering of the source iterable.
 * @extends Manipula
 */
module.exports = class OrderByIterator extends Manipula {
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

  /**
   * @callback keySelector
   * @param {*} element The element of the source iterable.
   * @returns {*} Key for grouping.
   */

  /**
   * @callback orderingCompareFunction
   * @param {*} x The first object to compare.
   * @param {*} y The second object to compare.
   * @returns {number} A signed integer that indicates the relative values of x and y, less than zero if x is less than y, greater than zero if x is greater than y and zero if x equals y.
   */

  /**
   * Method performs a subsequent ordering of the elements in an iterable in ascending order.
   * @param {keySelector} keySelector A function to extract a key from an element.
   * @param {orderingCompareFunction} [compareFunction] A function to compare keys.
   */
  thenBy(keySelector, compareFunction) {
    this._comparers.push({
      keySelector: keySelector,
      sortByDescending: false,
      compareFunction: compareFunction
    });
    return this;
  }

  /**
   * Method performs a subsequent ordering of the elements in a sequence in descending order.
   * @param {keySelector} keySelector A function to extract a key from an element.
   * @param {orderingCompareFunction} [compareFunction] A function to compare keys.
   */
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
};
