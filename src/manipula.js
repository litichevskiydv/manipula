const HashSet = require("collectio-hashset");
const HashMap = require("collectio-hashmap");
const { forEachAsync } = require("partitioned-loops");
const DefaultEqualityComparer = require("equality-comparison");

/**
 * Class providing LINQ functionality
 */
module.exports = class Manipula {
  static _getLengthPropertyName(source) {
    for (const propertyName of ["length", "size"]) if (propertyName in source) return propertyName;
    return null;
  }

  _tryDefineLengthProperty(source) {
    const lengthPropertyName = Manipula._getLengthPropertyName(source);
    if (lengthPropertyName) Object.defineProperty(this, lengthPropertyName, { get: () => source[lengthPropertyName] });
  }

  /**
   * Method wraps iterable for extending its functionality.
   * @param {Iterable<any>} source Iterable for wrapping.
   * @returns {FromIterator}
   */
  static from(source) {
    return new FromIterator(source);
  }

  /**
   * Method projects each element of an iterable into new form.
   * @param {selectSelector} selector A transform function to apply to each source element.
   * @returns {SelectIterator}
   */
  select(selector) {
    return new SelectIterator(this, selector);
  }

  /**
   * Method projects each element of an iterable into new Iterable<any> and flattens the resulting iterables into one iterable.
   * @param {selectManySelector} selector A transform function to apply to each source element.
   * @returns {SelectManyIterator}
   */
  selectMany(selector) {
    return new SelectManyIterator(this, selector);
  }

  /**
   * Method filters an iterable based on a predicate.
   * @param {extendedLogicalPredicate} predicate A function to test each source element and its number for a condition.
   * @returns {WhereIterator}
   */
  where(predicate) {
    return new WhereIterator(this, predicate);
  }

  /**
   * Methods adds given iterable to current.
   * @param {Iterable<any>} second The iterable to concatenate to the current.
   * @returns {ConcatIterator}
   */
  concat(second) {
    return new ConcatIterator(this, second);
  }

  /**
   * Method appends a value to the end of the current iterable.
   * @param {*} element The value to append to current iterable.
   * @returns {AppendIterator}
   */
  append(element) {
    return new AppendIterator(this, element);
  }

  /**
   * Method adds a value to the beginning of the current iterable.
   * @param {*} element The value to prepend to current iterable.
   * @returns {PrependIterator}
   */
  prepend(element) {
    return new PrependIterator(this, element);
  }

  /**
   * Method bypasses a specified number of elements in a iterable and then returns the remaining elements.
   * @param {number} count The number of elements to skip before returning the remaining elements.
   * @returns {SkipIterator}
   */
  skip(count) {
    return new SkipIterator(this, count);
  }

  /**
   * Method returns a specified number of contiguous elements from the start of a iterable.
   * @param {number} count The number of elements to return.
   * @returns {TakeIterator}
   */
  take(count) {
    return new TakeIterator(this, count);
  }

  /**
   * Method bypasses elements in an iterable as long as a specified condition is true and then returns the remaining elements.
   * @param {extendedLogicalPredicate} predicate A function to test each source element and its number for a condition.
   * @returns {SkipWhileIterator}
   */
  skipWhile(predicate) {
    return new SkipWhileIterator(this, predicate);
  }

  /**
   * Method returns elements from an iterable as long as a specified condition is true, and then skips the remaining elements.
   * @param {extendedLogicalPredicate} predicate A function to test each source element and its number for a condition.
   * @returns {TakeWhileIterator}
   */
  takeWhile(predicate) {
    return new TakeWhileIterator(this, predicate);
  }

  /**
   * Method returns all but a specified number of contiguous elements from the end of an iterable.
   * @param {number} count The number of elements to skip from the end of an iterable.
   * @returns {SkipLastIterator}
   */
  skipLast(count) {
    return new SkipLastIterator(this, count);
  }

  /**
   * Method returns a specified number of contiguous elements from the end of an iterable.
   * @param {number} count The number of elements to return.
   * @returns {TakeLastIterator}
   */
  takeLast(count) {
    return new TakeLastIterator(this, count);
  }

  /**
   * Method generates an iterable of integral numbers within a specified range.
   * @param {number} start The value of the first integer in the iterable.
   * @param {number} count The number of sequential integers to generate.
   * @returns {RangeIterator}
   */
  static range(start, count) {
    if (count < 0) throw new RangeError("Count mustn't be negative");

    return new RangeIterator(start, count);
  }

  /**
   * Method generates an iterable that contains one repeated value.
   * @param {*} element The value to be repeated.
   * @param {number} count The number of times to repeat the value in the generated iterable.
   * @returns {RepeatIterator}
   */
  static repeat(element, count) {
    if (count < 0) throw new RangeError("Count mustn't be negative");

    return new RepeatIterator(element, count);
  }

  /**
   * Method inverts the order of the elements in an iterable.
   * @returns {ReverseIterator}
   */
  reverse() {
    return new ReverseIterator(this);
  }

  /**
   * Method returns distinct elements from an iterable.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {DistinctIterator}
   */
  distinct(comparer) {
    return new DistinctIterator(this, comparer);
  }

  /**
   * Method returns distinct elements from an iterable,
   * where "distinctness" is determined via a projection and the specified comparer.
   * @param {selector} keySelector A function to extract the key for each element.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {DistinctIterator}
   */
  distinctBy(keySelector, comparer) {
    return new DistinctByIterator(this, keySelector, comparer);
  }

  /**
   * Method returns differences between current and given iterables.
   * @param {Iterable<any>} second An iterable whose elements that also occur in the first iterable will cause those elements to be removed from the returned iterable.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {ExceptIterator}
   */
  except(second, comparer) {
    return new ExceptIterator(this, second, comparer);
  }

  /**
   * Method returns intersection between the current and given iterables.
   * @param {Iterable<any>} second An iterable whose distinct elements that also appear in the current iterable will be returned.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {IntersectIterator}
   */
  intersect(second, comparer) {
    return new IntersectIterator(this, second, comparer);
  }

  /**
   * Method returns union of the current and given iterables.
   * @param {Iterable<any>} second An iterable whose distinct elements form the second set for the union.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {UnionIterator}
   */
  union(second, comparer) {
    return new UnionIterator(this, second, comparer);
  }

  /**
   * Method groups the elements of an iterable.
   * @param {selector} keySelector A function to extract the key for each element.
   * @param {GroupByOptions | selector} [options] Grouping settings or groups elements selector.
   * @returns {GroupByIterator}
   */
  groupBy(keySelector, options) {
    const opt = typeof options === "function" ? { elementSelector: options } : options || {};
    return new GroupByIterator(this, keySelector, opt.elementSelector, opt.comparer);
  }

  /**
   * Method sorts the elements of an iterable in ascending order.
   * @param {selector} keySelector A function to extract a key from an element.
   * @param {orderingCompareFunction} [compareFunction] A function to compare keys.
   * @returns {OrderByIterator}
   */
  orderBy(keySelector, compareFunction) {
    return new OrderByIterator(this, keySelector, false, compareFunction);
  }

  /**
   * Method sorts the elements of an iterable in descending order.
   * @param {selector} keySelector A function to extract a key from an element.
   * @param {orderingCompareFunction} [compareFunction] A function to compare keys.
   * @returns {OrderByIterator}
   */
  orderByDescending(keySelector, compareFunction) {
    return new OrderByIterator(this, keySelector, true, compareFunction);
  }

  /**
   * Method returns a number that represents how many elements in an iterable satisfy the condition.
   * @param {logicalPredicate} [predicate] A function to test each element for a condition.
   * @returns {number}
   */
  count(predicate) {
    if (!predicate) {
      const lengthPropertyName = Manipula._getLengthPropertyName(this);
      if (lengthPropertyName) return this[lengthPropertyName];
    }

    let count = 0;
    for (const element of this) if (!predicate || predicate(element)) count++;
    return count;
  }

  _tryGetFirst(predicate) {
    for (const element of this)
      if (!predicate || predicate(element))
        return {
          found: true,
          element: element
        };

    return { found: false, element: null };
  }

  /**
   * Method returns the first element in an iterable that satisfies a specified condition.
   * @param {logicalPredicate} [predicate] A function to test each element for a condition.
   */
  first(predicate) {
    const searchResult = this._tryGetFirst(predicate);
    if (searchResult.found === true) return searchResult.element;

    throw new Error("No matching element was found");
  }

  /**
   * Method returns the first element of an iterable that satisfies a condition or null if no such element is found.
   * @param {logicalPredicate} [predicate] A function to test each element for a condition.
   */
  firstOrDefault(predicate) {
    return this._tryGetFirst(predicate).element;
  }

  _tryGetLast(predicate) {
    const result = { found: false, element: null };

    for (const element of this)
      if (!predicate || predicate(element)) {
        result.found = true;
        result.element = element;
      }

    return result;
  }

  /**
   * Method returns the last element of an iterable that satisfies a specified condition.
   * @param {logicalPredicate} [predicate] A function to test each element for a condition.
   */
  last(predicate) {
    const searchResult = this._tryGetLast(predicate);
    if (searchResult.found === true) return searchResult.element;

    throw new Error("No matching element was found");
  }

  /**
   * Method returns the last element of an iterable that satisfies a condition or null if no such element is found.
   * @param {logicalPredicate} [predicate] A function to test each element for a condition.
   */
  lastOrDefault(predicate) {
    return this._tryGetLast(predicate).element;
  }

  _tryGetSingle(predicate) {
    const iterator = this[Symbol.iterator]();
    for (let currentState = iterator.next(); currentState.done === false; currentState = iterator.next()) {
      const result = currentState.value;
      if (!predicate || predicate(result)) {
        for (currentState = iterator.next(); currentState.done === false; currentState = iterator.next())
          if (!predicate || predicate(currentState.value)) return { foundMoreThanOnce: true };
        return { foundOnce: true, element: result };
      }
    }

    return { foundOnce: false, element: null };
  }

  /**
   * Method returns the only element of an iterable that satisfies a specified condition, and throws an exception if more than one such element exists.
   * @param {logicalPredicate} [predicate] A function to test an element for a condition.
   */
  single(predicate) {
    const searchResult = this._tryGetSingle(predicate);

    if (searchResult.foundMoreThanOnce === true) throw new Error("More than one element was found");
    if (searchResult.foundOnce === true) return searchResult.element;
    throw new Error("No matching element was found");
  }

  /**
   * Method returns the only element of an iterable that satisfies a specified condition or null if no such element exists; this method throws an exception if more than one element satisfies the condition.
   * @param {logicalPredicate} [predicate] A function to test an element for a condition.
   */
  singleOrDefault(predicate) {
    const searchResult = this._tryGetSingle(predicate);

    if (searchResult.foundMoreThanOnce === true) throw new Error("More than one element was found");
    return searchResult.element;
  }

  /**
   * Method determines whether any element of an iterable satisfies a condition.
   * @param {logicalPredicate} [predicate] A function to test an element for a condition.
   * @returns {boolean}
   */
  any(predicate) {
    for (const element of this) if (!predicate || predicate(element)) return true;
    return false;
  }

  /**
   * Method determines whether all elements of an iterable satisfy a condition.
   * @param {logicalPredicate} predicate A function to test an element for a condition.
   * @returns {boolean}
   */
  all(predicate) {
    for (const element of this) if (!predicate(element)) return false;
    return true;
  }

  /**
   * Determines whether an iterable contains a specified element.
   * @param {*} value The value to locate in the iterable.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {boolean}
   */
  contains(value, comparer) {
    for (const element of this) if (element === value || (comparer && comparer.equals(element, value))) return true;
    return false;
  }

  /**
   * Creates an array from an iterable.
   * @returns {Array<any>}
   */
  toArray() {
    return Array.from(this);
  }

  /**
   * Creates an array from an iterable asynchronously.
   * @returns {Promise<Array<any>>}
   */
  async toArrayAsync() {
    return (await forEachAsync(this, (x, state) => state.array.push(x), { array: [] })).array;
  }

  /**
   * Creates a HashSet from an iterable.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {HashSet}
   */
  toSet(comparer) {
    const set = new HashSet(comparer || DefaultEqualityComparer);
    for (const element of this) set.add(element);

    return set;
  }

  /**
   * Creates a HashSet from an iterable asynchronously.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {Promise<HashSet>}
   */
  async toSetAsync(comparer) {
    return (await forEachAsync(this, (x, state) => state.set.add(x), {
      set: new HashSet(comparer || DefaultEqualityComparer)
    })).set;
  }

  /**
   * Creates a HashMap from an iterable.
   * @param {selector} keySelector A function to extract a key from each element.
   * @param {ToMapOptions | selector} [options] Convertation settings or HashMap values selector.
   * @returns {HashMap}
   */
  toMap(keySelector, options) {
    const opt = typeof options === "function" ? { elementSelector: options } : options || {};
    const map = new HashMap(opt.comparer || DefaultEqualityComparer);
    for (const element of this)
      map.set(keySelector(element), !opt.elementSelector ? element : opt.elementSelector(element));

    return map;
  }

  /**
   * Creates a HashMap from an iterable asynchronously.
   * @param {selector} keySelector A function to extract a key from each element.
   * @param {ToMapOptions | selector} [options] Convertation settings or HashMap values selector.
   * @returns {Promise<HashMap>}
   */
  async toMapAsync(keySelector, options) {
    const opt = typeof options === "function" ? { elementSelector: options } : options || {};
    return (await forEachAsync(
      this,
      (x, state) => state.map.set(keySelector(x), !opt.elementSelector ? x : opt.elementSelector(x)),
      {
        map: new HashMap(opt.comparer || DefaultEqualityComparer)
      }
    )).map;
  }

  _tryGetElementByIndex(index) {
    if (index < 0) return { found: false, element: null };

    let i = 0;
    for (const element of this) if (i++ === index) return { found: true, element: element };

    return { found: false, element: null };
  }

  /**
   * Method returns the element at a specified index in an iterable.
   * @param {number} index The zero-based index of the element to retrieve.
   */
  elementAt(index) {
    const searchResult = this._tryGetElementByIndex(index);
    if (searchResult.found === false) throw new RangeError(`Index ${index} lies out of range`);

    return searchResult.element;
  }

  /**
   * Method returns the element at a specified index in an iterable or null if the index is out of range.
   * @param {number} index The zero-based index of the element to retrieve.
   */
  elementAtOrDefault(index) {
    return this._tryGetElementByIndex(index).element;
  }

  _aggregate(iterator, accumulatorInitialValue, aggregateFunction) {
    let accumulator = accumulatorInitialValue;
    for (let currentState = iterator.next(), i = 0; currentState.done === false; currentState = iterator.next(), i++)
      accumulator = aggregateFunction(accumulator, currentState.value, i);

    return accumulator;
  }

  /**
   * Method applies an accumulator function over an iterable.
   * @param {*} accumulatorInitialValue The initial accumulator value.
   * @param {aggregateFunction} aggregateFunction An accumulator function to be invoked on each element.
   */
  aggregate(accumulatorInitialValue, aggregateFunction) {
    return this._aggregate(this[Symbol.iterator](), accumulatorInitialValue, aggregateFunction);
  }

  /**
   * Method invokes a transform function on each element of an iterable and returns the minimum resulting value.
   * @param {selector} [selector] A transform function to apply to each element.
   */
  min(selector) {
    const iterator = this[Symbol.iterator]();
    const begin = iterator.next();
    if (begin.done === true) throw new Error("Source contains no elements");

    return this._aggregate(iterator, selector ? selector(begin.value) : begin.value, (accumulator, current) =>
      Math.min(accumulator, selector ? selector(current) : current)
    );
  }

  /**
   * Method invokes a transform function on each element of an iterable and returns the maximum resulting value.
   * @param {selector} [selector] A transform function to apply to each element.
   */
  max(selector) {
    const iterator = this[Symbol.iterator]();
    const begin = iterator.next();
    if (begin.done === true) throw new Error("Source contains no elements");

    return this._aggregate(iterator, selector ? selector(begin.value) : begin.value, (accumulator, current) =>
      Math.max(accumulator, selector ? selector(current) : current)
    );
  }

  /**
   * Method invokes a transform function on each element of an iterable and returns the sum of the resulting values.
   * @param {selector} [selector] A transform function to apply to each element.
   */
  sum(selector) {
    return this._aggregate(
      this[Symbol.iterator](),
      0,
      (accumulator, current) => accumulator + (selector ? selector(current) : current)
    );
  }

  /**
   * Method invokes a transform function on each element of an iterable and returns the average of the resulting values.
   * @param {selector} [selector] A transform function to apply to each element.
   */
  average(selector) {
    const iterator = this[Symbol.iterator]();
    const begin = iterator.next();
    if (begin.done === true) throw new Error("Source contains no elements");

    let count = 1;
    let sum = selector ? selector(begin.value) : begin.value;
    for (let currentState = iterator.next(); currentState.done === false; currentState = iterator.next()) {
      sum += selector ? selector(currentState.value) : currentState.value;
      count++;
    }

    return sum / count;
  }

  /**
   * Method determines whether two iterables are equal according to an equality comparer.
   * @param {Iterable<any>} second An iterable to compare to the current iterable.
   * @param {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare elements.
   * @returns {boolean}
   */
  sequenceEqual(second, comparer) {
    if (this === second) return true;
    if (!second) return false;

    const firstIterator = this[Symbol.iterator]();
    const secondIterator = second[Symbol.iterator]();
    const equalityComparer = comparer || DefaultEqualityComparer;
    for (
      var firstState = firstIterator.next(), secondState = secondIterator.next();
      firstState.done === false && secondState.done === false;
      firstState = firstIterator.next(), secondState = secondIterator.next()
    )
      if (
        firstState.value !== secondState.value &&
        equalityComparer.equals(firstState.value, secondState.value) === false
      )
        return false;

    return firstState.done && secondState.done;
  }
};

const FromIterator = require("./iterators/fromIterator");
const SelectIterator = require("./iterators/selectIterator");
const SelectManyIterator = require("./iterators/selectManyIterator");
const WhereIterator = require("./iterators/whereIterator");
const ConcatIterator = require("./iterators/concatIterator");
const AppendIterator = require("./iterators/appendIterator");
const PrependIterator = require("./iterators/prependIterator");
const SkipIterator = require("./iterators/skipIterator");
const TakeIterator = require("./iterators/takeIterator");
const SkipWhileIterator = require("./iterators/skipWhileIterator");
const TakeWhileIterator = require("./iterators/takeWhileIterator");
const SkipLastIterator = require("./iterators/skipLastIterator");
const TakeLastIterator = require("./iterators/takeLastIterator");
const RangeIterator = require("./iterators/rangeIterator");
const RepeatIterator = require("./iterators/repeatIterator");
const ReverseIterator = require("./iterators/reverseIterator");
const DistinctIterator = require("./iterators/distinctIterator");
const DistinctByIterator = require("./iterators/distinctIByterator");
const ExceptIterator = require("./iterators/exceptIterator");
const IntersectIterator = require("./iterators/intersectIterator");
const UnionIterator = require("./iterators/unionIterator");
const GroupByIterator = require("./iterators/groupByIterator");
const OrderByIterator = require("./iterators/orderByIterator");

/**
 * @callback selector
 * @param {*} element The element of the source iterable.
 * @returns {*} Element transformation result.
 */

/**
 * @callback selectSelector
 * @param {*} element The element of an iterable.
 * @param {number} elementNumber Number of the iterable element.
 * @returns {*} Element transformation result.
 */

/**
 * @callback selectManySelector
 * @param {*} element The element of an iterable.
 * @param {number} elementNumber Number of the iterable element.
 * @returns {Iterable<any>} Element transformation result.
 */

/**
 * @callback logicalPredicate
 * @param {*} element The element of an iterable.
 * @returns {boolean} true if and element and its number satisfy condition, false otherwise.
 */

/**
 * @callback extendedLogicalPredicate
 * @param {*} element The element of an iterable.
 * @param {number} elementNumber Number of the iterable element.
 * @returns {boolean} true if and element and its number satisfy condition, false otherwise.
 */

/**
 * @typedef {Object} EqualityComparer
 * @property {function(any, any):boolean} equals Method for checking two objects equality.
 * @property {function(any):number} getHashCode Method for calculating object hashcode.
 */

/**
 * @typedef {Object} GroupByOptions
 * @property {selector} [elementSelector] Method for projecting element of the source iterable to element of a group.
 * @property {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare keys.
 */

/**
 * @callback orderingCompareFunction
 * @param {*} x The first object to compare.
 * @param {*} y The second object to compare.
 * @returns {number} A signed integer that indicates the relative values of x and y, less than zero if x is less than y, greater than zero if x is greater than y and zero if x equals y.
 */

/**
 * @typedef {Object} ToMapOptions
 * @property {selector} [elementSelector] Method for projecting element of the source iterable to element of a group.
 * @property {EqualityComparer} [comparer = DefaultEqualityComparer] An EqualityComparer to compare keys.
 */

/**
 * @callback aggregateFunction
 * @param {*} accumulator Current accumulator value.
 * @param {*} element The element of an iterable.
 * @param {number} elementNumber Number of the iterable element.
 * @returns {*} New accumulator value.
 */
