export interface IEnumerable<T> extends Iterable<T> {
  /**
   * Method applies an accumulator function over an iterable.
   * @param initialValue The initial accumulator value.
   * @param aggregateFunction An accumulator function to be invoked on each element.
   */
  aggregate(initialValue: T, aggregateFunction: (accumulator: T, element: T, index: number) => T): T;
  /**
   * Method applies an accumulator function over an iterable.
   * @param initialValue The initial accumulator value.
   * @param aggregateFunction An accumulator function to be invoked on each element.
   */
  aggregate<TResult>(
    initialValue: TResult,
    aggregateFunction: (accumulator: TResult, element: T, index: number) => T
  ): TResult;

  /**
   * Method determines whether all elements of an iterable satisfy a condition.
   * @param predicate A function to test an element for a condition.
   */
  all(predicate: (element: T) => boolean): boolean;

  /**
   * Method determines whether any element of an iterable satisfies a condition.
   */
  any(): boolean;
  /**
   * Method determines whether any element of an iterable satisfies a condition.
   * @param predicate A function to test an element for a condition.
   */
  any(predicate: (element: T) => boolean): boolean;

  /**
   * Method appends a value to the end of the current iterable.
   * @param element The value to append to current iterable.
   */
  append(element: T): IEnumerable<T>;

  /**
   * Method invokes a transform function on each element of an iterable and returns the average of the resulting values.
   */
  average(): number;
  /**
   * Method invokes a transform function on each element of an iterable and returns the average of the resulting values.
   * @param selector A transform function to apply to each element.
   */
  average(selector: (element: T) => number): number;

  /**
   * Methods adds given iterable to current.
   * @param second The iterable to concatenate to the current.
   */
  concat(second: Iterable<T>): IEnumerable<T>;

  /**
   * Determines whether an iterable contains a specified element.
   * @param value The value to locate in the iterable.
   */
  contains(value: T): boolean;
  /**
   * Determines whether an iterable contains a specified element.
   * @param value The value to locate in the iterable.
   * @param equalityComparer An EqualityComparer to compare elements.
   */
  contains(value: T, equalityComparer: IEqualityComparer<T>): boolean;

  /**
   * Method returns a number that represents how many elements in an iterable satisfy the condition.
   */
  count(): number;
  /**
   * Method returns a number that represents how many elements in an iterable satisfy the condition.
   * @param predicate A function to test each element for a condition.
   */
  count(predicate: (element: T) => boolean): number;

  /**
   * Method returns distinct elements from an iterable.
   */
  distinct(): IEnumerable<T>;
  /**
   * Method returns distinct elements from an iterable.
   * @param equalityComparer An EqualityComparer to compare elements.
   */
  distinct(equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  /**
   * Method returns distinct elements from an iterable,
   * where "distinctness" is determined via a projection and the specified comparer.
   * @param keySelector A function to extract the key for each element.
   */
  distinctBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<T>;
  /**
   * Method returns distinct elements from an iterable,
   * where "distinctness" is determined via a projection and the specified comparer.
   * @param keySelector A function to extract the key for each element.
   * @param equalityComparer An EqualityComparer to compare elements.
   */
  distinctBy<TKey>(keySelector: (element: T) => TKey, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  /**
   * Method returns the element at a specified index in an iterable.
   * @param index The zero-based index of the element to retrieve.
   */
  elementAt(index: number): T;

  /**
   * Method returns the element at a specified index in an iterable or null if the index is out of range.
   * @param index The zero-based index of the element to retrieve.
   */
  elementAtOrDefault(index: number): T | null;

  /**
   * Method returns differences between current and given iterables.
   * @param second An iterable whose elements that also occur in the first iterable will cause those elements to be removed from the returned iterable.
   */
  except(second: Iterable<T>): IEnumerable<T>;
  /**
   * Method returns differences between current and given iterables.
   * @param second An iterable whose elements that also occur in the first iterable will cause those elements to be removed from the returned iterable.
   * @param equalityComparer An EqualityComparer to compare elements.
   */
  except(second: Iterable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  /**
   * Method returns the first element in an iterable that satisfies a specified condition.
   */
  first(): T;
  /**
   * Method returns the first element in an iterable that satisfies a specified condition.
   * @param predicate A function to test each element for a condition.
   */
  first(predicate: (element: T) => boolean): T;

  /**
   * Method returns the first element of an iterable that satisfies a condition or null if no such element is found.
   */
  firstOrDefault(): T | null;
  /**
   * Method returns the first element of an iterable that satisfies a condition or null if no such element is found.
   * @param predicate A function to test each element for a condition.
   */
  firstOrDefault(predicate: (element: T) => boolean): T | null;

  /**
   * Method groups the elements of an iterable.
   * @param keySelector A function to extract the key for each element.
   */
  groupBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;
  /**
   * Method groups the elements of an iterable.
   * @param keySelector A function to extract the key for each element.
   * @param elementSelector Groups elements selector.
   */
  groupBy<TKey, TElement>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement
  ): IEnumerable<IGrouping<TKey, TElement>>;
  /**
   * Method groups the elements of an iterable.
   * @param keySelector A function to extract the key for each element.
   * @param options Grouping settings.
   */
  groupBy<TKey, TElement>(
    keySelector: (element: T) => TKey,
    options: {
      elementSelector: (element: T) => TElement;
      comparer?: IEqualityComparer<T>;
    }
  ): IEnumerable<IGrouping<TKey, TElement>>;

  /**
   * Method returns intersection between the current and given iterables.
   * @param second An iterable whose distinct elements that also appear in the current iterable will be returned.
   */
  intersect(second: Iterable<T>): IEnumerable<T>;
  /**
   * Method returns intersection between the current and given iterables.
   * @param second An iterable whose distinct elements that also appear in the current iterable will be returned.
   * @param equalityComparer An EqualityComparer to compare elements.
   */
  intersect(second: Iterable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  /**
   * Method returns the last element of an iterable that satisfies a specified condition.
   */
  last(): T;
  /**
   * Method returns the last element of an iterable that satisfies a specified condition.
   * @param predicate A function to test each element for a condition.
   */
  last(predicate: (element: T) => boolean): T;

  /**
   * Method returns the last element of an iterable that satisfies a condition or null if no such element is found.
   */
  lastOrDefault(): T | null;
  /**
   * Method returns the last element of an iterable that satisfies a condition or null if no such element is found.
   * @param predicate A function to test each element for a condition.
   */
  lastOrDefault(predicate: (element: T) => boolean): T | null;

  /**
   * Method invokes a transform function on each element of an iterable and returns the maximum resulting value.
   */
  max(): number;
  /**
   * Method invokes a transform function on each element of an iterable and returns the maximum resulting value.
   * @param selector A transform function to apply to each element.
   */
  max(selector: (element: T) => number): number;

  /**
   * Method invokes a transform function on each element of an iterable and returns the minimum resulting value.
   */
  min(): number;
  /**
   * Method invokes a transform function on each element of an iterable and returns the minimum resulting value.
   * @param selector A transform function to apply to each element.
   */
  min(selector: (element: T) => number): number;

  /**
   * Method sorts the elements of an iterable in ascending order.
   * @param keySelector A function to extract a key from an element.
   */
  orderBy<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  /**
   * Method sorts the elements of an iterable in ascending order.
   * @param keySelector A function to extract a key from an element.
   * @param comparer A function to compare keys.
   */
  orderBy<TKey>(keySelector: (element: T) => TKey, comparer: (x: T, y: T) => number): IOrderedEnumerable<T>;

  /**
   * Method sorts the elements of an iterable in descending order.
   * @param keySelector A function to extract a key from an element.
   */
  orderByDescending<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  /**
   * Method sorts the elements of an iterable in descending order.
   * @param keySelector A function to extract a key from an element.
   * @param comparer A function to compare keys.
   */
  orderByDescending<TKey>(keySelector: (element: T) => TKey, comparer: (x: T, y: T) => number): IOrderedEnumerable<T>;

  /**
   * Method adds a value to the beginning of the current iterable.
   * @param element The value to prepend to current iterable.
   */
  prepend(element: T): IEnumerable<T>;

  /**
   * Method inverts the order of the elements in an iterable.
   */
  reverse(): IEnumerable<T>;

  /**
   * Method projects each element of an iterable into new form.
   * @param selector A transform function to apply to each source element.
   */
  select<TResult>(selector: (element: T, index: number) => TResult): IEnumerable<TResult>;

  /**
   * Method projects each element of an iterable into new Iterable<any> and flattens the resulting iterables into one iterable.
   * @param selector A transform function to apply to each source element.
   */
  selectMany<TResult>(selector: (element: T, index: number) => Iterable<TResult>): IEnumerable<TResult>;

  /**
   * Method batches the source iterable into sized buckets and applies a projection to each bucket.
   * @param size Buket size.
   */
  batch(size: number): IEnumerable<IEnumerable<T>>;

  /**
   * Method batches the source iterable into sized buckets and applies a projection to each bucket.
   * @param size Buket size.
   * @param resultSelector The projection to apply to each bucket.
   */
  batch<TResult>(size: number, resultSelector: (bucket: IEnumerable<T>) => TResult): IEnumerable<TResult>;

  /**
   * Method determines whether two iterables are equal according to an equality comparer.
   * @param second An iterable to compare to the current iterable.
   */
  sequenceEqual(second: Iterable<T>): boolean;
  /**
   * Method determines whether two iterables are equal according to an equality comparer.
   * @param second An iterable to compare to the current iterable.
   * @param comparer An EqualityComparer to compare elements.
   */
  sequenceEqual(second: Iterable<T>, comparer: IEqualityComparer<T>): boolean;

  /**
   * Method returns the only element of an iterable that satisfies a specified condition, and throws an exception if more than one such element exists.
   */
  single(): T;
  /**
   * Method returns the only element of an iterable that satisfies a specified condition, and throws an exception if more than one such element exists.
   * @param predicate A function to test an element for a condition.
   */
  single(predicate: (element: T) => boolean): T;

  /**
   * Method returns the only element of an iterable that satisfies a specified condition or null if no such element exists; this method throws an exception if more than one element satisfies the condition.
   */
  singleOrDefault(): T | null;
  /**
   * Method returns the only element of an iterable that satisfies a specified condition or null if no such element exists; this method throws an exception if more than one element satisfies the condition.
   * @param predicate A function to test an element for a condition.
   */
  singleOrDefault(predicate: (element: T) => boolean): T | null;

  /**
   * Method bypasses a specified number of elements in a iterable and then returns the remaining elements.
   * @param count The number of elements to skip before returning the remaining elements.
   */
  skip(count: number): IEnumerable<T>;

  /**
   * Method returns all but a specified number of contiguous elements from the end of an iterable.
   * @param count The number of elements to skip from the end of an iterable.
   */
  skipLast(count: number): IEnumerable<T>;

  /**
   * Method bypasses elements in an iterable as long as a specified condition is true and then returns the remaining elements.
   * @param predicate A function to test each source element and its number for a condition.
   */
  skipWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;

  /**
   * Method invokes a transform function on each element of an iterable and returns the sum of the resulting values.
   */
  sum(): number;
  /**
   * Method invokes a transform function on each element of an iterable and returns the sum of the resulting values.
   * @param selector A transform function to apply to each element.
   */
  sum(selector: (element: T) => number): number;

  /**
   * Method returns a specified number of contiguous elements from the start of a iterable.
   * @param count The number of elements to return.
   */
  take(count: number): IEnumerable<T>;

  /**
   * Method returns a specified number of contiguous elements from the end of an iterable.
   * @param count The number of elements to return.
   */
  takeLast(count: number): IEnumerable<T>;

  /**
   * Method returns elements from an iterable as long as a specified condition is true, and then skips the remaining elements.
   * @param predicate A function to test each source element and its number for a condition.
   */
  takeWhile(predicate: (element: T, index: number) => boolean): IEnumerable<T>;

  /**
   * Creates an array from an iterable.
   */
  toArray(): Array<T>;
  /**
   * Creates an array from an iterable asynchronously.
   */
  toArrayAsync(): Promise<Array<T>>;

  /**
   * Creates a HashMap from an iterable.
   * @param keySelector A function to extract a key from each element.
   */
  toMap<TKey>(keySelector: (element: T) => TKey): Collections.IMap<TKey, T>;
  /**
   * Creates a HashMap from an iterable.
   * @param keySelector A function to extract a key from each element.
   * @param elementSelector HashMap values selector.
   */
  toMap<TKey, TValue>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TValue
  ): Collections.IMap<TKey, TValue>;
  /**
   * Creates a HashMap from an iterable.
   * @param keySelector A function to extract a key from each element.
   * @param options Convertation settings.
   */
  toMap<TKey, TValue>(
    keySelector: (element: T) => TKey,
    options: {
      elementSelector: (element: T) => TValue;
      comparer?: IEqualityComparer<TKey>;
    }
  ): Collections.IMap<TKey, TValue>;

  /**
   * Creates a HashMap from an iterable asynchronously.
   * @param keySelector A function to extract a key from each element.
   */
  toMapAsync<TKey>(keySelector: (element: T) => TKey): Promise<Collections.IMap<TKey, T>>;
  /**
   * Creates a HashMap from an iterable asynchronously.
   * @param keySelector A function to extract a key from each element.
   * @param elementSelector HashMap values selector.
   */
  toMapAsync<TKey, TValue>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TValue
  ): Promise<Collections.IMap<TKey, TValue>>;
  /**
   * Creates a HashMap from an iterable asynchronously.
   * @param keySelector A function to extract a key from each element.
   * @param options Convertation settings.
   */
  toMapAsync<TKey, TValue>(
    keySelector: (element: T) => TKey,
    options: {
      elementSelector: (element: T) => TValue;
      comparer?: IEqualityComparer<TKey>;
    }
  ): Promise<Collections.IMap<TKey, TValue>>;

  /**
   * Creates a HashSet from an iterable.
   */
  toSet(): Collections.ISet<T>;
  /**
   * Creates a HashSet from an iterable.
   * @param comparer An EqualityComparer to compare elements.
   */
  toSet(comparer: IEqualityComparer<T>): Collections.ISet<T>;

  /**
   * Creates a HashSet from an iterable asynchronously.
   */
  toSetAsync(): Promise<Collections.ISet<T>>;
  /**
   * Creates a HashSet from an iterable asynchronously.
   * @param comparer An EqualityComparer to compare elements.
   */
  toSetAsync(comparer: IEqualityComparer<T>): Promise<Collections.ISet<T>>;

  /**
   * Method returns union of the current and given iterables.
   * @param second An iterable whose distinct elements form the second set for the union.
   */
  union(second: Iterable<T>): IEnumerable<T>;
  /**
   * Method returns union of the current and given iterables.
   * @param second An iterable whose distinct elements form the second set for the union.
   * @param comparer An EqualityComparer to compare elements.
   */
  union(second: Iterable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>;

  /**
   * Method filters an iterable based on a predicate.
   * @param predicate A function to test each source element and its number for a condition.
   */
  where<TResult extends T>(predicate: (element: T, index: number) => element is TResult): IEnumerable<TResult>;

  /**
   * Method filters an iterable based on a predicate.
   * @param predicate A function to test each source element and its number for a condition.
   */
  where(predicate: (element: T, index: number) => boolean): IEnumerable<T>;
}

interface IEqualityComparer<T> {
  equals(first: T, second: T): boolean;
  getHashCode(element: T): number;
}

interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  key: TKey;
}

interface IOrderedEnumerable<T> extends IEnumerable<T> {
  /**
   * Method performs a subsequent ordering of the elements in an iterable in ascending order.
   * @param keySelector A function to extract a key from an element.
   */
  thenBy<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  /**
   * Method performs a subsequent ordering of the elements in an iterable in ascending order.
   * @param keySelector A function to extract a key from an element.
   * @param comparer A function to compare keys.
   */
  thenBy<TKey>(keySelector: (element: T) => TKey, comparer: (x: TKey, y: TKey) => number): IOrderedEnumerable<T>;

  /**
   * Method performs a subsequent ordering of the elements in a sequence in descending order.
   * @param keySelector A function to extract a key from an element.
   */
  thenByDescending<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  /**
   * Method performs a subsequent ordering of the elements in a sequence in descending order.
   * @param keySelector A function to extract a key from an element.
   * @param comparer A function to compare keys.
   */
  thenByDescending<TKey>(
    keySelector: (element: T) => TKey,
    comparer: (x: TKey, y: TKey) => number
  ): IOrderedEnumerable<T>;
}

declare namespace Collections {
  export interface IMap<TKey, TValue> extends Iterable<[TKey, TValue]> {
    readonly size: number;
    get(key: TKey): TValue;
    set(key: TKey, value: TValue): IMap<TKey, TValue>;
    has(key: TKey): boolean;
    delete(key: TKey): boolean;
    clear(): void;
    entries(): IterableIterator<[TKey, TValue]>;
    keys(): IterableIterator<TKey>;
    values(): IterableIterator<TValue>;
  }

  export interface ISet<T> extends Iterable<T> {
    readonly size: number;
    add(value: T): ISet<T>;
    has(value: T): boolean;
    delete(value: T): boolean;
    clear(): void;
    entries(): IterableIterator<[T, T]>;
    values(): IterableIterator<T>;
  }
}

/**
 * Method wraps iterable for extending its functionality.
 * @param source Iterable for wrapping.
 */
export function from<T>(source: Iterable<T>): IEnumerable<T>;

/**
 * Method wraps generator function for providing extended functionality.
 * @param fn Generator function.
 * @param args Generator function arguments.
 */
export function fromGeneratorFunction<T>(fn: (...args: any[]) => Iterator<T>, ...args: any[]): IEnumerable<T>;

/**
 * Method generates an iterable of integral numbers within a specified range.
 * @param start The value of the first integer in the iterable.
 * @param count The number of sequential integers to generate.
 */
export function range(start: number, count: number): IEnumerable<number>;

/**
 * Method generates an iterable that contains one repeated value.
 * @param element The value to be repeated.
 * @param count The number of times to repeat the value in the generated iterable.
 */
export function repeat<T>(element: T, count: number): IEnumerable<T>;
