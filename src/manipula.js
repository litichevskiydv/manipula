const HashSet = require("collectio-hashset");
const HashMap = require("collectio-hashmap");
const DefaultEqualityComparer = require("equality-comparison");

/**
 * Class providing LINQ functionality
 */
module.exports = class Manipula {
  static get _lengthPropertyName() {
    return "length";
  }

  /**
   * Method wraps iterable for extending its functionality.
   * @param {Iterable<any>} source Iterable for wrapping.
   */
  static from(source) {
    return new FromIterator(source);
  }

  /**
   * @callback selectSelector
   * @param {*} element The element of an iterable.
   * @param {number} elementNumber Number of the iterable element.
   * @returns {*} Element transformation result.
   */

  /**
   * Method projects each element of an iterable into new form.
   * @param {selectSelector} selector A transform function to apply to each source element.
   */
  select(selector) {
    return new SelectIterator(this, selector);
  }

  /**
   * @callback selectManySelector
   * @param {*} element The element of an iterable.
   * @param {number} elementNumber Number of the iterable element.
   * @returns {Iterable<any>} Element transformation result.
   */

  /**
   * Method projects each element of an iterable into new Iterable<any> and flattens the resulting iterables into one iterable.
   * @param {selectManySelector} selector A transform function to apply to each source element.
   */
  selectMany(selector) {
    return new SelectManyIterator(this, selector);
  }

  /**
   * @callback wherePredicate
   * @param {*} element The element of an iterable.
   * @param {number} elementNumber Number of the iterable element.
   * @returns {boolean} true if and element and its number satisfy condition, false otherwise.
   */

  /**
   * Method filters an iterable based on a predicate.
   * @param {wherePredicate} predicate A function to test each source element and its number for a condition.
   */
  where(predicate) {
    return new WhereIterator(this, predicate);
  }

  /**
   * Methods adds given iterable to current.
   * @param {Iterable<any>} second The iterable to concatenate to the current.
   */
  concat(second) {
    return new ConcatIterator(this, second);
  }

  /**
   * Method appends a value to the end of the current iterable.
   * @param {*} element The value to append to current iterable.
   */
  append(element) {
    return new AppendIterator(this, element);
  }

  /**
   * Method adds a value to the beginning of the current iterable.
   * @param {*} element The value to prepend to current iterable.
   */
  prepend(element) {
    return new PrependIterator(this, element);
  }

  /**
   * Method bypasses a specified number of elements in a iterable and then returns the remaining elements.
   * @param {number} count The number of elements to skip before returning the remaining elements.
   */
  skip(count) {
    return new SkipIterator(this, count);
  }

  /**
   * Method returns a specified number of contiguous elements from the start of a iterable.
   * @param {number} count The number of elements to return.
   */
  take(count) {
    return new TakeIterator(this, count);
  }

  /**
   * @callback skipWhilePredicate
   * @param {*} element The element of an iterable.
   * @param {number} elementNumber Number of the iterable element.
   * @returns {boolean} true if and element and its number satisfy condition, false otherwise.
   */

  /**
   * Method bypasses elements in an iterable as long as a specified condition is true and then returns the remaining elements.
   * @param {skipWhilePredicate} predicate A function to test each source element and its number for a condition.
   */
  skipWhile(predicate) {
    return new SkipWhileIterator(this, predicate);
  }

  count(predicate) {
    if (!predicate && Manipula._lengthPropertyName in this) return this[Manipula._lengthPropertyName];

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

  first(predicate) {
    const searchResult = this._tryGetFirst(predicate);
    if (searchResult.found === true) return searchResult.element;

    throw new Error("No matching element was found");
  }

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

  last(predicate) {
    const searchResult = this._tryGetLast(predicate);
    if (searchResult.found === true) return searchResult.element;

    throw new Error("No matching element was found");
  }

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

  single(predicate) {
    const searchResult = this._tryGetSingle(predicate);

    if (searchResult.foundMoreThanOnce === true) throw new Error("More than one element was found");
    if (searchResult.foundOnce === true) return searchResult.element;
    throw new Error("No matching element was found");
  }

  singleOrDefault(predicate) {
    const searchResult = this._tryGetSingle(predicate);

    if (searchResult.foundMoreThanOnce === true) throw new Error("More than one element was found");
    return searchResult.element;
  }

  any(predicate) {
    for (const element of this) if (!predicate || predicate(element)) return true;
    return false;
  }

  all(predicate) {
    for (const element of this) if (!predicate(element)) return false;
    return true;
  }

  contains(value, comparer) {
    for (const element of this) if (element === value || (comparer && comparer.equals(element, value))) return true;
    return false;
  }

  toArray() {
    return Array.from(this);
  }

  toSet(comparer) {
    const set = new HashSet(comparer || DefaultEqualityComparer);
    for (const element of this) set.add(element);

    return set;
  }

  toMap(keySelector, options) {
    const opt = options || {};
    const map = new HashMap(opt.comparer || DefaultEqualityComparer);
    for (const element of this)
      map.set(keySelector(element), !opt.elementSelector ? element : opt.elementSelector(element));

    return map;
  }

  _tryGetElementByIndex(index) {
    if (index < 0) return { found: false, element: null };

    let i = 0;
    for (const element of this) if (i++ === index) return { found: true, element: element };

    return { found: false, element: null };
  }

  elementAt(index) {
    const searchResult = this._tryGetElementByIndex(index);
    if (searchResult.found === false) throw new Error(`Index ${index} lies out of range`);

    return searchResult.element;
  }

  elementAtOrDefault(index) {
    return this._tryGetElementByIndex(index).element;
  }

  _aggregate(iterator, accumulatorInitialValue, aggregateFunction) {
    let accumulator = accumulatorInitialValue;
    for (let currentState = iterator.next(), i = 0; currentState.done === false; currentState = iterator.next(), i++)
      accumulator = aggregateFunction(accumulator, currentState.value, i);

    return accumulator;
  }

  aggregate(accumulatorInitialValue, aggregateFunction) {
    return this._aggregate(this[Symbol.iterator](), accumulatorInitialValue, aggregateFunction);
  }

  min(selector) {
    const iterator = this[Symbol.iterator]();
    const begin = iterator.next();
    if (begin.done === true) throw new Error("Source contains no elements");

    return this._aggregate(iterator, selector ? selector(begin.value) : begin.value, (accumulator, current) =>
      Math.min(accumulator, selector ? selector(current) : current)
    );
  }

  max(selector) {
    const iterator = this[Symbol.iterator]();
    const begin = iterator.next();
    if (begin.done === true) throw new Error("Source contains no elements");

    return this._aggregate(iterator, selector ? selector(begin.value) : begin.value, (accumulator, current) =>
      Math.max(accumulator, selector ? selector(current) : current)
    );
  }

  sum(selector) {
    return this._aggregate(
      this[Symbol.iterator](),
      0,
      (accumulator, current) => accumulator + (selector ? selector(current) : current)
    );
  }

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

  sequenceEqual(second, comparer) {
    if (this === second) return true;
    if (!second) return false;

    const firstIterator = this[Symbol.iterator]();
    const secondIterator = second[Symbol.iterator]();
    for (
      var firstState = firstIterator.next(), secondState = secondIterator.next();
      firstState.done === false && secondState.done === false;
      firstState = firstIterator.next(), secondState = secondIterator.next()
    )
      if (
        firstState.value !== secondState.value &&
        (!comparer || comparer.equals(firstState.value, secondState.value) === false)
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
