# manipula

[![npm version](https://badge.fury.io/js/manipula.svg)](https://www.npmjs.com/package/manipula)
[![npm downloads](https://img.shields.io/npm/dt/manipula.svg)](https://www.npmjs.com/package/manipula)
[![dependencies status](https://img.shields.io/librariesio/github/litichevskiydv/manipula)](https://www.npmjs.com/package/manipula)
[![Build Status](https://github.com/litichevskiydv/manipula/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/litichevskiydv/manipula/actions/workflows/ci.yaml)
[![Coverage Status](https://coveralls.io/repos/github/litichevskiydv/manipula/badge.svg?branch=master)](https://coveralls.io/github/litichevskiydv/manipula?branch=master)

Implementation of LINQ

- [Manipula](https://github.com/litichevskiydv/manipula/wiki/Home)
  - _instance_
    - [.aggregate(accumulatorInitialValue, aggregateFunction)](https://github.com/litichevskiydv/manipula/wiki/aggregate)
    - [.all(predicate)](https://github.com/litichevskiydv/manipula/wiki/all) : <code>boolean</code>
    - [.any([predicate])](https://github.com/litichevskiydv/manipula/wiki/any) : <code>boolean</code>
    - [.append(element)](https://github.com/litichevskiydv/manipula/wiki/append)
    - [.average([selector])](https://github.com/litichevskiydv/manipula/wiki/average)
    - [.concat(second)](https://github.com/litichevskiydv/manipula/wiki/concat)
    - [.contains(value, [comparer])](https://github.com/litichevskiydv/manipula/wiki/contains) : <code>boolean</code>
    - [.count([predicate])](https://github.com/litichevskiydv/manipula/wiki/count) : <code>number</code>
    - [.distinct([comparer])](https://github.com/litichevskiydv/manipula/wiki/distinct)
    - [.distinctBy(keySelector, [comparer])](https://github.com/litichevskiydv/manipula/wiki/distinctBy)
    - [.elementAt(index)](https://github.com/litichevskiydv/manipula/wiki/elementAt)
    - [.elementAtOrDefault(index)](https://github.com/litichevskiydv/manipula/wiki/elementAtOrDefault)
    - [.except(second, [comparer])](https://github.com/litichevskiydv/manipula/wiki/except)
    - [.first([predicate])](https://github.com/litichevskiydv/manipula/wiki/first)
    - [.firstOrDefault([predicate])](https://github.com/litichevskiydv/manipula/wiki/firstOrDefault)
    - [.groupBy(keySelector, [options])](https://github.com/litichevskiydv/manipula/wiki/groupBy)
    - [.intersect(second, [comparer])](https://github.com/litichevskiydv/manipula/wiki/intersect)
    - [.last([predicate])](https://github.com/litichevskiydv/manipula/wiki/last)
    - [.lastOrDefault([predicate])](https://github.com/litichevskiydv/manipula/wiki/lastOrDefault)
    - [.max([selector])](https://github.com/litichevskiydv/manipula/wiki/max)
    - [.min([selector])](https://github.com/litichevskiydv/manipula/wiki/min)
    - [.orderBy(keySelector, [compareFunction])](https://github.com/litichevskiydv/manipula/wiki/orderBy)
    - [.orderByDescending(keySelector, [compareFunction])](https://github.com/litichevskiydv/manipula/wiki/orderByDescending)
    - [.prepend(element)](https://github.com/litichevskiydv/manipula/wiki/prepend)
    - [.reverse()](https://github.com/litichevskiydv/manipula/wiki/reverse)
    - [.select(selector)](https://github.com/litichevskiydv/manipula/wiki/select)
    - [.selectMany(selector)](https://github.com/litichevskiydv/manipula/wiki/selectMany)
    - [.batch(size, [resultSelector])](https://github.com/litichevskiydv/manipula/wiki/batch)
    - [.sequenceEqual(second, [comparer])](https://github.com/litichevskiydv/manipula/wiki/sequenceEqual) : <code>boolean</code>
    - [.single([predicate])](https://github.com/litichevskiydv/manipula/wiki/single)
    - [.singleOrDefault([predicate])](https://github.com/litichevskiydv/manipula/wiki/singleOrDefault)
    - [.skip(count)](https://github.com/litichevskiydv/manipula/wiki/skip)
    - [.skipLast(count)](https://github.com/litichevskiydv/manipula/wiki/skipLast)
    - [.skipWhile(predicate)](https://github.com/litichevskiydv/manipula/wiki/skipWhile)
    - [.sum([selector])](https://github.com/litichevskiydv/manipula/wiki/sum)
    - [.take(count)](https://github.com/litichevskiydv/manipula/wiki/take)
    - [.takeLast(count)](https://github.com/litichevskiydv/manipula/wiki/takeLast)
    - [.takeWhile(predicate)](https://github.com/litichevskiydv/manipula/wiki/takeWhile)
    - [.thenBy(keySelector, [compareFunction])](https://github.com/litichevskiydv/manipula/wiki/thenBy)
    - [.thenByDescending(keySelector, [compareFunction])](https://github.com/litichevskiydv/manipula/wiki/thenByDescending)
    - [.toArray()](https://github.com/litichevskiydv/manipula/wiki/toArray) : <code>Array&lt;any&gt;</code>
    - [.toArrayAsync()](https://github.com/litichevskiydv/manipula/wiki/toArrayAsync) : <code>Promise&lt;Array&lt;any&gt;&gt;</code>
    - [.toMap(keySelector, [options])](https://github.com/litichevskiydv/manipula/wiki/toMap) : <code>HashMap</code>
    - [.toMapAsync(keySelector, [options])](https://github.com/litichevskiydv/manipula/wiki/toMapAsync) : <code>Promise&lt;HashMap&gt;</code>
    - [.toSet([comparer])](https://github.com/litichevskiydv/manipula/wiki/toSet) : <code>HashSet</code>
    - [.toSetAsync([comparer])](https://github.com/litichevskiydv/manipula/wiki/toSetAsync) : <code>Promise&lt;HashSet&gt;</code>
    - [.union(second, [comparer])](https://github.com/litichevskiydv/manipula/wiki/union)
    - [.where(predicate)](https://github.com/litichevskiydv/manipula/wiki/where)
  - _static_
    - [.from(source)](https://github.com/litichevskiydv/manipula/wiki/from)
    - [.fromGeneratorFunction(fn, ..args)](https://github.com/litichevskiydv/manipula/wiki/fromGeneratorFunction)
    - [.range(start, count)](https://github.com/litichevskiydv/manipula/wiki/range)
    - [.repeat(element, count)](https://github.com/litichevskiydv/manipula/wiki/repeat)
