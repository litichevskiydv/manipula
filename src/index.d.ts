export interface IEnumerable<T> extends Iterable<T> {
  aggregate(initialValue: T, aggregateFunction: (accumulator: T, element: T, index: number) => T): T;
  aggregate<TResult>(
    initialValue: TResult,
    aggregateFunction: (accumulator: TResult, element: T, index: number) => T
  ): TResult;

  all(predicate: (element: T) => boolean): boolean;

  any(): boolean;
  any(predicate: (element: T) => boolean): boolean;

  append(element: T): IEnumerable<T>;

  average(): number;
  average(selector: (element: T) => number): number;

  concat(second: Iterable<T>): IEnumerable<T>;

  contains(value: T): boolean;
  contains(value: T, equalityComparer: IEqualityComparer<T>): boolean;

  count(): number;
  count(predicate: (element: T) => boolean): number;

  distinct(): IEnumerable<T>;
  distinct(equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  elementAt(index: number): T;

  elementAtOrDefault(index: number): T;

  except(second: Iterable<T>): IEnumerable<T>;
  except(second: Iterable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  first(): T;
  first(predicate: (element: T) => boolean): T;

  firstOrDefault(): T;
  firstOrDefault(predicate: (element: T) => boolean): T;

  groupBy<TKey>(keySelector: (element: T) => TKey): IEnumerable<IGrouping<TKey, T>>;
  groupBy<TKey, TElement>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement
  ): IEnumerable<IGrouping<TKey, TElement>>;
  groupBy<TKey, TElement>(
    keySelector: (element: T) => TKey,
    options: {
      elementSelector: (element: T) => TElement;
      comparer?: IEqualityComparer<T>;
    }
  ): IEnumerable<IGrouping<TKey, TElement>>;

  intersect(second: Iterable<T>): IEnumerable<T>;
  intersect(second: Iterable<T>, equalityComparer: IEqualityComparer<T>): IEnumerable<T>;

  last(): T;
  last(predicate: (element: T) => boolean): T;

  lastOrDefault(): T;
  lastOrDefault(predicate: (element: T) => boolean): T;

  max(): number;
  max(selector: (element: T) => number): number;

  min(): number;
  min(selector: (element: T) => number): number;

  orderBy<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  orderBy<TKey>(keySelector: (element: T) => TKey, comparer: (x: T, y: T) => number): IOrderedEnumerable<T>;

  orderByDescending<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  orderByDescending<TKey>(keySelector: (element: T) => TKey, comparer: (x: T, y: T) => number): IOrderedEnumerable<T>;

  prepend(element: T): IEnumerable<T>;

  reverse(): IEnumerable<T>;

  select<TResult>(selector: (element: T, index: number) => TResult): IEnumerable<TResult>;

  selectMany<TResult>(selector: (element: T, index: number) => Iterable<TResult>): IEnumerable<TResult>;

  sequenceEqual(second: Iterable<T>): boolean;
  sequenceEqual(second: Iterable<T>, comparer: IEqualityComparer<T>): boolean;

  single(): T;
  single(predicate: (element: T) => boolean): T;

  singleOrDefault(): T;
  singleOrDefault(predicate: (element: T) => boolean): T;

  skip(count: number): IEnumerable<T>;

  skipLast(count: number): IEnumerable<T>;

  skipWhile(selector: (element: T, index: number) => boolean): IEnumerable<T>;

  sum(): number;
  sum(selector: (element: T) => number): number;

  take(count: number): IEnumerable<T>;
  takeLast(count: number): IEnumerable<T>;

  takeWhile(selector: (element: T, index: number) => boolean): IEnumerable<T>;

  toArray(): Array<T>;

  toMap<TKey>(keySelector: (element: T) => TKey): Collections.IMap<TKey, T>;
  toMap<TKey, TValue>(
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TValue
  ): Collections.IMap<TKey, TValue>;
  toMap<TKey, TValue>(
    keySelector: (element: T) => TKey,
    options: {
      elementSelector: (element: T) => TValue;
      comparer?: IEqualityComparer<TKey>;
    }
  ): Collections.IMap<TKey, TValue>;

  toSet(): Collections.ISet<T>;
  toSet(comparer: IEqualityComparer<T>): Collections.ISet<T>;

  union(second: Iterable<T>): IEnumerable<T>;
  union(second: Iterable<T>, comparer: IEqualityComparer<T>): IEnumerable<T>;

  where(selector: (element: T, index: number) => boolean): IEnumerable<T>;
}

interface IEqualityComparer<T> {
  equals(first: T, second: T): boolean;
  getHashCode(element: T): number;
}

interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
  key: TKey;
}

interface IOrderedEnumerable<T> extends IEnumerable<T> {
  thenBy<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
  thenBy<TKey>(keySelector: (element: T) => TKey, comparer: (x: TKey, y: TKey) => number): IOrderedEnumerable<T>;
  thenByDescending<TKey>(keySelector: (element: T) => TKey): IOrderedEnumerable<T>;
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

export function from<T>(source: Iterable<T>): IEnumerable<T>;

export function range(start: number, count: number): IEnumerable<number>;

export function repeat<T>(element: T, count: number): IEnumerable<T>;
