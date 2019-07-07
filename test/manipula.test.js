const Manipula = require("../src/index");

class Key {
  constructor(hi, lo) {
    this.hi = hi;
    this.lo = lo;
  }
}

class KeysComparer {
  getHashCode(obj) {
    let hash = 17;
    hash = hash * 31 + obj.hi;
    hash = hash * 31 + obj.lo;
    return hash;
  }

  equals(a, b) {
    return a.hi === b.hi && a.lo === b.lo;
  }
}

test("Should convert manipula to array", () => {
  // Given
  const expectedArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(expectedArray);

  // When
  const actualArray = manipula.toArray();

  // Then
  expect(manipula.length).toBe(expectedArray.length);
  expect(actualArray).toEqual(expectedArray);
});

test("Should convert manipula to array asynchronously", async () => {
  // Given
  const manipula = Manipula.from([1, 2, 3, 4, 5]).where(x => x % 2 === 0);

  // When
  const actualArray = await manipula.toArrayAsync();

  // Then
  const expectedArray = [2, 4];
  expect(actualArray).toEqual(expectedArray);
});

test("Should convert manipula to set of primitive type", () => {
  // Given
  const sourceArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualSet = manipula.toSet();

  // Then
  expect(sourceArray).toSatisfyAll(x => actualSet.has(x));
});

test("Should convert manipula to set of complex type using external comparer", () => {
  // Given
  const firstKey = new Key(1, 1);
  const secondKey = new Key(2, 2);
  const sourceArray = [firstKey, secondKey];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualSet = manipula.toSet(new KeysComparer());

  // Then
  expect(sourceArray).toSatisfyAll(x => actualSet.has(x));
  expect(actualSet.has(new Key(firstKey.hi, firstKey.lo))).toBeTrue();
});

test("Should convert manipula to set of complex type using default comparer", () => {
  // Given
  const firstKey = { hi: 1, lo: 1 };
  const secondKey = { hi: 2, lo: 2 };
  const sourceArray = [firstKey, secondKey];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualSet = manipula.toSet();

  // Then
  expect(sourceArray).toSatisfyAll(x => actualSet.has(x));
  expect(actualSet.has({ hi: firstKey.hi, lo: firstKey.lo })).toBeTrue();
});

test("Should convert manipula to set of primitive type asynchronously", async () => {
  // Given
  const sourceArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualSet = await manipula.toSetAsync();

  // Then
  expect(sourceArray).toSatisfyAll(x => actualSet.has(x));
});

test("Should convert manipula to set of complex type using external comparer asynchronously", async () => {
  // Given
  const firstKey = new Key(1, 1);
  const secondKey = new Key(2, 2);
  const sourceArray = [firstKey, secondKey];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualSet = await manipula.toSetAsync(new KeysComparer());

  // Then
  expect(sourceArray).toSatisfyAll(x => actualSet.has(x));
  expect(actualSet.has(new Key(firstKey.hi, firstKey.lo))).toBeTrue();
});

test("Should convert manipula to set of complex type using default comparer asynchronously", async () => {
  // Given
  const firstKey = { hi: 1, lo: 1 };
  const secondKey = { hi: 2, lo: 2 };
  const sourceArray = [firstKey, secondKey];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualSet = await manipula.toSetAsync();

  // Then
  expect(sourceArray).toSatisfyAll(x => actualSet.has(x));
  expect(actualSet.has({ hi: firstKey.hi, lo: firstKey.lo })).toBeTrue();
});

test("Should convert manipula to map of primitive type", () => {
  // Given
  const sourceArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = manipula.toMap(x => x, { elementSelector: x => x * x });

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get(x) === x * x);
});

test("Should convert manipula to map of primitive type passing elements selector as a second parameter", () => {
  // Given
  const sourceArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = manipula.toMap(x => x, x => x * x);

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get(x) === x * x);
});

test("Should convert manipula to map of complex type using external comparer", () => {
  // Given
  const sourceArray = [1, 2];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = manipula.toMap(x => new Key(x, x), {
    elementSelector: x => x + 1,
    comparer: new KeysComparer()
  });

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get(new Key(x, x)) === x + 1);
});

test("Should convert manipula to map of complex type using default comparer", () => {
  // Given
  const sourceArray = [1, 2];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = manipula.toMap(
    x => {
      return { hi: x, lo: x };
    },
    { elementSelector: x => x + 1 }
  );

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get({ hi: x, lo: x }) === x + 1);
});

test("Should convert manipula to map of primitive type asynchronously", async () => {
  // Given
  const sourceArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = await manipula.toMapAsync(x => x, { elementSelector: x => x * x });

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get(x) === x * x);
});

test("Should convert manipula to map of primitive type passing elements selector as a second parameter asynchronously", async () => {
  // Given
  const sourceArray = [1, 2, 3, 4, 5];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = await manipula.toMapAsync(x => x, x => x * x);

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get(x) === x * x);
});

test("Should convert manipula to map of complex type using external comparer asynchronously", async () => {
  // Given
  const sourceArray = [1, 2];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = await manipula.toMapAsync(x => new Key(x, x), {
    elementSelector: x => x + 1,
    comparer: new KeysComparer()
  });

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get(new Key(x, x)) === x + 1);
});

test("Should convert manipula to map of complex type using default comparer asynchronously", async () => {
  // Given
  const sourceArray = [1, 2];
  const manipula = Manipula.from(sourceArray);

  // When
  const actualMap = await manipula.toMapAsync(
    x => {
      return { hi: x, lo: x };
    },
    { elementSelector: x => x + 1 }
  );

  // Then
  expect(sourceArray).toSatisfyAll(x => actualMap.get({ hi: x, lo: x }) === x + 1);
});

describe("Should test select", () => {
  const testCases = [
    {
      toString: () => "Produce new collection",
      source: Manipula.from([1, 2, 3, 4, 5]),
      selector: x => x + 1,
      expected: [2, 3, 4, 5, 6]
    },
    {
      toString: () => "Produce new collection depends on element number",
      source: Manipula.from([1, 2, 3, 4, 5]),
      selector: (x, i) => x * i,
      expected: [0, 2, 6, 12, 20]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.select(testCase.selector);

    // Then
    expect(actual.length).toBe(testCase.expected.length);
    expect(actual.toArray()).toEqual(testCase.expected);
  });
});

describe("Should test selectMany", () => {
  const testCases = [
    {
      toString: () => "Produce new collection",
      source: Manipula.from([Manipula.from([1, 2]), Manipula.from([3, 4]), Manipula.from([5])]),
      selector: x => x.select(value => value + 1),
      expected: [2, 3, 4, 5, 6]
    },
    {
      toString: () => "Produce new collection depends on element number",
      source: Manipula.from([Manipula.from([1, 2]), Manipula.from([3, 4]), Manipula.from([5])]),
      selector: (x, i) => x.select(value => value * i),
      expected: [0, 0, 3, 4, 10]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.selectMany(testCase.selector).toArray();

    // Then
    expect(actual.length).toBe(testCase.expected.length);
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test batch", () => {
  const testCases = [
    {
      toString: () => "Size of the collection is divided by the size of the bucket",
      source: Manipula.from([0, 1, 2, 3]),
      size: 2,
      expected: [[0, 1], [2, 3]]
    },
    {
      toString: () => "Size of the collection is not divided by the size of the bucket",
      source: Manipula.from([0, 1, 2, 3, 4]),
      size: 3,
      expected: [[0, 1, 2], [3, 4]]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.batch(testCase.size, testCase.resultSelector);

    // Then
    expect(actual.length).toBe(testCase.expected.length);

    let i = 0;
    for (const actualBucket of actual) {
      expect(actualBucket.length).toBe(testCase.expected[i].length);
      expect(actualBucket.toArray()).toEqual(testCase.expected[i++]);
    }
  });
});

test("Should calculate buckets sum", () => {
  // Given
  const source = Manipula.from([0, 1, 2, 3, 4]);
  const size = 2;

  // When
  const actual = source.batch(size, x => x.sum()).toArray();

  // Then
  const expected = [1, 5, 4];
  expect(actual).toEqual(expected);
});

describe("Should test where", () => {
  const testCases = [
    {
      toString: () => "Filter collection",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 2 === 0,
      expected: [2, 4, 6]
    },
    {
      toString: () => "Filter collection depends on element number",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: (x, i) => i % 2 === 0,
      expected: [1, 3, 5]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    let actual = testCase.source.where(testCase.predicate).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

test("Should concat collections", () => {
  // Given
  const manipula = Manipula.from([1, 2]);

  // When
  const actual = manipula.concat([3, 4]).concat([5, 6, 7]);

  // Then
  const expected = [1, 2, 3, 4, 5, 6, 7];
  expect(actual.toArray()).toEqual(expected);
  expect(actual.length).toEqual(expected.length);
});

describe("Should test union", () => {
  const testCases = [
    {
      toString: () => "Unioning collections of primitive type",
      first: Manipula.from([5, 3, 9, 7, 5, 9, 3, 7]),
      second: Manipula.from([8, 3, 6, 4, 4, 9, 1, 0]),
      expected: [5, 3, 9, 7, 8, 6, 4, 1, 0]
    },
    {
      toString: () => "Unioning collections of complex type using external comparer",
      first: Manipula.from([new Key(1, 1), new Key(2, 2)]),
      second: Manipula.from([new Key(2, 2), new Key(1, 1)]),
      comparer: new KeysComparer(),
      expected: [new Key(1, 1), new Key(2, 2)]
    },
    {
      toString: () => "Unioning collections of complex type using default comparer",
      first: Manipula.from([new Key(1, 1), new Key(2, 2)]),
      second: Manipula.from([new Key(2, 2), new Key(1, 1)]),
      expected: [new Key(1, 1), new Key(2, 2)]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.first.union(testCase.second, testCase.comparer).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test except", () => {
  const testCases = [
    {
      toString: () => "Subtracting same collections",
      first: Manipula.from([1, 2, 3]),
      second: Manipula.from([1, 2, 3]),
      expected: []
    },
    {
      toString: () => "Subtracting collections of primitive types with different elements",
      first: Manipula.from([1, 2, 2, 3, 4]),
      second: Manipula.from([5, 2, 3, 2, 8]),
      expected: [1, 4]
    },
    {
      toString: () => "Subtracting collections of complex types with different elements using external comparer",
      first: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(2, 2), new Key(3, 3), new Key(4, 4)]),
      second: Manipula.from([new Key(5, 5), new Key(2, 2), new Key(3, 3), new Key(2, 2), new Key(8, 8)]),
      comparer: new KeysComparer(),
      expected: [new Key(1, 1), new Key(4, 4)]
    },
    {
      toString: () => "Subtracting collections of complex types with different elements using default comparer",
      first: Manipula.from([{ hi: 1, lo: 1 }, { hi: 2, lo: 2 }, { hi: 2, lo: 2 }, { hi: 3, lo: 3 }, { hi: 4, lo: 4 }]),
      second: Manipula.from([{ hi: 5, lo: 5 }, { hi: 2, lo: 2 }, { hi: 3, lo: 3 }, { hi: 2, lo: 2 }, { hi: 8, lo: 8 }]),
      expected: [{ hi: 1, lo: 1 }, { hi: 4, lo: 4 }]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.first.except(testCase.second, testCase.comparer).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test distinct", () => {
  const testCases = [
    {
      toString: () => "Distincting collections of primitive type",
      source: Manipula.from([2.0, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5]),
      expected: [2.0, 2.1, 2.2, 2.3, 2.4, 2.5]
    },
    {
      toString: () => "Distincting collections of complex type using external comparer",
      source: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(2, 2), new Key(1, 1)]),
      comparer: new KeysComparer(),
      expected: [new Key(1, 1), new Key(2, 2)]
    },
    {
      toString: () => "Distincting collections of complex type using default comparer",
      source: Manipula.from([{ hi: 1, lo: 1 }, { hi: 2, lo: 2 }, { hi: 2, lo: 2 }, { hi: 1, lo: 1 }]),
      expected: [{ hi: 1, lo: 1 }, { hi: 2, lo: 2 }]
    },
    {
      toString: () => "Distincting collections of complex type with different keys order using default comparer",
      source: Manipula.from([
        {
          Friday: "15:00",
          Monday: "15:00",
          Thursday: "15:00",
          Tuesday: "15:00",
          Wednesday: "15:00"
        },
        {
          Monday: "15:00",
          Thursday: "15:00",
          Friday: "15:00",
          Tuesday: "15:00",
          Wednesday: "15:00"
        }
      ]),
      expected: [
        {
          Friday: "15:00",
          Monday: "15:00",
          Thursday: "15:00",
          Tuesday: "15:00",
          Wednesday: "15:00"
        }
      ]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.distinct(testCase.comparer).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test distinctBy", () => {
  const testCases = [
    {
      toString: () => "Distincting collections by primitive key",
      source: Manipula.from([{ key: 1, value: 1 }, { key: 1, value: 2 }, { key: 2, value: 2 }]),
      ketSelector: x => x.key,
      expected: [{ key: 1, value: 1 }, { key: 2, value: 2 }]
    },
    {
      toString: () => "Distincting collections by complex key using external comparer",
      source: Manipula.from([
        { key: new Key(1, 1), value: 1 },
        { key: new Key(2, 2), value: 2 },
        { key: new Key(2, 2), value: 3 },
        { key: new Key(1, 1), value: 4 }
      ]),
      ketSelector: x => x.key,
      comparer: new KeysComparer(),
      expected: [{ key: new Key(1, 1), value: 1 }, { key: new Key(2, 2), value: 2 }]
    },
    {
      toString: () => "Distincting collections by complex key using default comparer",
      source: Manipula.from([
        { key: { hi: 1, lo: 1 }, value: 1 },
        { key: { hi: 2, lo: 2 }, value: 2 },
        { key: { hi: 2, lo: 2 }, value: 3 },
        { key: { hi: 1, lo: 1 }, value: 4 }
      ]),
      ketSelector: x => x.key,
      expected: [{ key: { hi: 1, lo: 1 }, value: 1 }, { key: { hi: 2, lo: 2 }, value: 2 }]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.distinctBy(testCase.ketSelector, testCase.comparer).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test count", () => {
  const testCases = [
    {
      toString: () => "Count without predicate should return collection length",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      expected: 6
    },
    {
      toString: () => "Count with predicate should return count of the satisfying elements",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 2 === 0,
      expected: 3
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    let actual = testCase.source.count(testCase.predicate);

    // Thenq
    expect(actual).toBe(testCase.expected);
  });
});

describe("Should test first", () => {
  const testCases = [
    {
      toString: () => "First without predicate should return first element of not empty manipula",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      expected: 1
    },
    {
      toString: () => "First without predicate should throw error if manipula is empty",
      source: Manipula.from([]),
      expectedErrorMessage: "No matching element was found"
    },
    {
      toString: () => "First with predicate should return first matched element if it exists",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 3 === 0,
      expected: 3
    },
    {
      toString: () => "First with predicate should throw error if no matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 7 === 0,
      expectedErrorMessage: "No matching element was found"
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.first(testCase.predicate)).toBe(testCase.expected);
    else
      expect(() => testCase.source.first(testCase.predicate)).toThrowWithMessage(Error, testCase.expectedErrorMessage);
  });
});

describe("Should test firstOrDefault", () => {
  const testCases = [
    {
      toString: () => "FirstOrDefault without predicate should return first element of not empty manipula",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      expected: 1
    },
    {
      toString: () => "FirstOrDefault without predicate should return null if manipula is empty",
      source: Manipula.from([]),
      expected: null
    },
    {
      toString: () => "FirstOrDefault with predicate should return first matched element if it exists",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 3 === 0,
      expected: 3
    },
    {
      toString: () => "FirstOrDefault with predicate should return null if no matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 7 === 0,
      expected: null
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    expect(testCase.source.firstOrDefault(testCase.predicate)).toBe(testCase.expected);
  });
});

describe("Should test last", () => {
  const testCases = [
    {
      toString: () => "Last without predicate should return last element of not empty manipula",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      expected: 6
    },
    {
      toString: () => "Last without predicate should throw error if manipula is empty",
      source: Manipula.from([]),
      expectedErrorMessage: "No matching element was found"
    },
    {
      toString: () => "Last with predicate should return last matched element if it exists",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 3 === 0,
      expected: 6
    },
    {
      toString: () => "Last with predicate should throw error if no matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 7 === 0,
      expectedErrorMessage: "No matching element was found"
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.last(testCase.predicate)).toBe(testCase.expected);
    else
      expect(() => testCase.source.last(testCase.predicate)).toThrowWithMessage(Error, testCase.expectedErrorMessage);
  });
});

describe("Should test lastOrDefault", () => {
  const testCases = [
    {
      toString: () => "LastOrDefault without predicate should return first element of not empty manipula",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      expected: 6
    },
    {
      toString: () => "LastOrDefault without predicate should return null if manipula is empty",
      source: Manipula.from([]),
      expected: null
    },
    {
      toString: () => "LastOrDefault with predicate should return first matched element if it exists",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 3 === 0,
      expected: 6
    },
    {
      toString: () => "LastOrDefault with predicate should return null if no matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 7 === 0,
      expected: null
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    expect(testCase.source.lastOrDefault(testCase.predicate)).toBe(testCase.expected);
  });
});

describe("Should test single", () => {
  const testCases = [
    {
      toString: () => "Single without predicate should return single element of not empty manipula",
      source: Manipula.from([1]),
      expected: 1
    },
    {
      toString: () => "Single without predicate should throw error if manipula is empty",
      source: Manipula.from([]),
      expectedErrorMessage: "No matching element was found"
    },
    {
      toString: () => "Single without predicate should throw error if manipula contains more than one element",
      source: Manipula.from([1, 2]),
      expectedErrorMessage: "More than one element was found"
    },
    {
      toString: () =>
        "Single with predicate should return single matched element if one element matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 4 === 0,
      expected: 4
    },
    {
      toString: () => "Single with predicate should throw error if no matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 7 === 0,
      expectedErrorMessage: "No matching element was found"
    },
    {
      toString: () => "Single with predicate should throw error if more than one element matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 2 === 0,
      expectedErrorMessage: "More than one element was found"
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.single(testCase.predicate)).toBe(testCase.expected);
    else
      expect(() => testCase.source.single(testCase.predicate)).toThrowWithMessage(Error, testCase.expectedErrorMessage);
  });
});

describe("Should test singleOrDefault", () => {
  const testCases = [
    {
      toString: () => "SingleOrDefault without predicate should return single element of not empty manipula",
      source: Manipula.from([1]),
      expected: 1
    },
    {
      toString: () => "SingleOrDefault without predicate should return null if manipula is empty",
      source: Manipula.from([]),
      expected: null
    },
    {
      toString: () => "SingleOrDefault without predicate should throw error if manipula contains more than one element",
      source: Manipula.from([1, 2]),
      expectedErrorMessage: "More than one element was found"
    },
    {
      toString: () =>
        "SingleOrDefault with predicate should return single matched element if one element matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 4 === 0,
      expected: 4
    },
    {
      toString: () => "SingleOrDefault with predicate should return null if no matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 7 === 0,
      expected: null
    },
    {
      toString: () =>
        "SingleOrDefault with predicate should throw error if more than one element matching element was found",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      predicate: x => x % 2 === 0,
      expectedErrorMessage: "More than one element was found"
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected !== undefined)
      expect(testCase.source.singleOrDefault(testCase.predicate)).toBe(testCase.expected);
    else
      expect(() => testCase.source.singleOrDefault(testCase.predicate)).toThrowWithMessage(
        Error,
        testCase.expectedErrorMessage
      );
  });
});

describe("Should test any", () => {
  const testCases = [
    {
      toString: () => "Any without predicate should return false on empty collection",
      source: Manipula.from([]),
      expected: false
    },
    {
      toString: () => "Any with predicate should return false on empty collection",
      source: Manipula.from([]),
      predicate: x => x % 2 === 0,
      expected: false
    },
    {
      toString: () => "Any without predicate should return true on not empty collection",
      source: Manipula.from([1, 2]),
      expected: true
    },
    {
      toString: () => "Any with predicate should detect compatible element",
      source: Manipula.from([1, 2, 3]),
      predicate: x => x % 2 === 0,
      expected: true
    },
    {
      toString: () => "Any with predicate should not detect compatible element",
      source: Manipula.from([1, 2, 3]),
      predicate: x => x % 5 === 0,
      expected: false
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    let actual = testCase.source.any(testCase.predicate);

    // Thenq
    expect(actual).toBe(testCase.expected);
  });
});

describe("Should test all", () => {
  const testCases = [
    {
      toString: () => "Should return true on empty collection",
      source: Manipula.from([]),
      predicate: x => x % 2 === 0,
      expected: true
    },
    {
      toString: () => "Should approve collection",
      source: Manipula.from([2, 4, 6]),
      predicate: x => x % 2 === 0,
      expected: true
    },
    {
      toString: () => "Should not approve collection",
      source: Manipula.from([1, 2, 3]),
      predicate: x => x % 2 === 0,
      expected: false
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    let actual = testCase.source.all(testCase.predicate);

    // Thenq
    expect(actual).toBe(testCase.expected);
  });
});

describe("Should test contains", () => {
  const testCases = [
    {
      toString: () => "Should not find value of primitive type",
      source: Manipula.from([1, 2, 3]),
      value: 4,
      expected: false
    },
    {
      toString: () => "Should not find value of complex type",
      source: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(3, 3)]),
      value: new Key(4, 4),
      comparer: new KeysComparer(),
      expected: false
    },
    {
      toString: () => "Should find value of primitive type",
      source: Manipula.from([1, 2, 3]),
      value: 2,
      expected: true
    },
    {
      toString: () => "Should not find value of complex type",
      source: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(3, 3)]),
      value: new Key(2, 2),
      comparer: new KeysComparer(),
      expected: true
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    let actual = testCase.source.contains(testCase.value, testCase.comparer);

    // Thenq
    expect(actual).toBe(testCase.expected);
  });
});

describe("Should test groupBy", () => {
  const testCases = [
    {
      toString: () => "Should group by simple key without results transformation",
      source: Manipula.from([{ key: 1, value: 2 }, { key: 1, value: 3 }, { key: 2, value: 4 }]),
      keySelector: x => x.key,
      expected: [[{ key: 1, value: 2 }, { key: 1, value: 3 }], [{ key: 2, value: 4 }]]
    },
    {
      toString: () => "Should group by simple key and transform results",
      source: Manipula.from([{ key: 1, value: 2 }, { key: 1, value: 3 }, { key: 2, value: 4 }]),
      keySelector: x => x.key,
      options: { elementSelector: x => x.value },
      expected: [[2, 3], [4]]
    },
    {
      toString: () => "Should group by complex key using external comparer without results transformation",
      source: Manipula.from([
        { key: new Key(1, 1), value: 2 },
        { key: new Key(1, 1), value: 3 },
        { key: new Key(2, 2), value: 4 }
      ]),
      keySelector: x => x.key,
      options: { comparer: new KeysComparer() },
      expected: [
        [{ key: new Key(1, 1), value: 2 }, { key: new Key(1, 1), value: 3 }],
        [{ key: new Key(2, 2), value: 4 }]
      ]
    },
    {
      toString: () => "Should group by complex key using external comparer and transform results",
      source: Manipula.from([
        { key: new Key(1, 1), value: 2 },
        { key: new Key(1, 1), value: 3 },
        { key: new Key(2, 2), value: 4 }
      ]),
      keySelector: x => x.key,
      options: { comparer: new KeysComparer(), elementSelector: x => x.value },
      expected: [[2, 3], [4]]
    },
    {
      toString: () => "Should group by complex key using default comparer and transform results",
      source: Manipula.from([{ hi: 1, lo: 1, value: 2 }, { hi: 1, lo: 1, value: 3 }, { hi: 2, lo: 2, value: 4 }]),
      keySelector: x => {
        return { hi: x.hi, lo: x.lo };
      },
      options: { elementSelector: x => x.value },
      expected: [[2, 3], [4]]
    },
    {
      toString: () => "Should group elements passing new elements selector as second parameter",
      source: Manipula.from([
        { key: new Key(1, 1), value: 2 },
        { key: new Key(1, 1), value: 3 },
        { key: new Key(2, 2), value: 4 }
      ]),
      keySelector: x => x.key,
      options: x => x.value + 1,
      expected: [[3, 4], [5]]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    let actual = testCase.source
      .groupBy(testCase.keySelector, testCase.options)
      .select(x => x.toArray())
      .toArray();

    // Thenq
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test append", () => {
  const testCases = [
    {
      toString: () => "Append element to empty source",
      source: Manipula.from([]),
      element: 1,
      expected: [1]
    },
    {
      toString: () => "Append element to not empty source",
      source: Manipula.from([1, 2, 3]),
      element: 4,
      expected: [1, 2, 3, 4]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.append(testCase.element);

    // Then
    expect(actual.toArray()).toEqual(testCase.expected);
    expect(actual.length).toBe(testCase.expected.length);
  });
});

describe("Should test prepend", () => {
  const testCases = [
    {
      toString: () => "Prepend element to empty source",
      source: Manipula.from([]),
      element: 1,
      expected: [1]
    },
    {
      toString: () => "Prepend element to not empty source",
      source: Manipula.from([1, 2, 3]),
      element: 4,
      expected: [4, 1, 2, 3]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.prepend(testCase.element);

    // Then
    expect(actual.toArray()).toEqual(testCase.expected);
    expect(actual.length).toBe(testCase.expected.length);
  });
});

describe("Should test intersect", () => {
  const testCases = [
    {
      toString: () => "Intersect collections without common elements",
      first: Manipula.from([1, 2, 3]),
      second: Manipula.from([4, 5, 6]),
      expected: []
    },
    {
      toString: () => "Intersect collections of primitive types with common elements",
      first: Manipula.from([1, 2, 2, 3, 4]),
      second: Manipula.from([5, 2, 3, 2, 8]),
      expected: [2, 3]
    },
    {
      toString: () => "Intersect collections of complex types with common elements using external comparer",
      first: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(2, 2), new Key(3, 3), new Key(4, 4)]),
      second: Manipula.from([new Key(5, 5), new Key(2, 2), new Key(3, 3), new Key(2, 2), new Key(8, 8)]),
      comparer: new KeysComparer(),
      expected: [new Key(2, 2), new Key(3, 3)]
    },
    {
      toString: () => "Intersect collections of complex types with common elements using default comparer",
      first: Manipula.from([{ hi: 1, lo: 1 }, { hi: 2, lo: 2 }, { hi: 2, lo: 2 }, { hi: 3, lo: 3 }, { hi: 4, lo: 4 }]),
      second: Manipula.from([{ hi: 5, lo: 5 }, { hi: 2, lo: 2 }, { hi: 3, lo: 3 }, { hi: 2, lo: 2 }, { hi: 8, lo: 8 }]),
      expected: [{ hi: 2, lo: 2 }, { hi: 3, lo: 3 }]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.first.intersect(testCase.second, testCase.comparer).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test skip", () => {
  const testCases = [
    {
      toString: () => "Skip less than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 2,
      expected: [3]
    },
    {
      toString: () => "Skip more than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 4,
      expected: []
    },
    {
      toString: () => "Skip negative count",
      source: Manipula.from([1, 2, 3]),
      count: -1,
      expected: [1, 2, 3]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.skip(testCase.count).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test take", () => {
  const testCases = [
    {
      toString: () => "Take less than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 2,
      expected: [1, 2]
    },
    {
      toString: () => "Take more than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 4,
      expected: [1, 2, 3]
    },
    {
      toString: () => "Take negative count",
      source: Manipula.from([1, 2, 3]),
      count: -1,
      expected: []
    },
    {
      toString: () => "Take a few elements from an infinite sequence",
      source: Manipula.from(
        (function*() {
          let counter = 1;
          while (true) yield counter++;
        })()
      ),
      count: 2,
      expected: [1, 2]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.take(testCase.count).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test skipWhile", () => {
  const testCases = [
    {
      toString: () => "Skip all elements",
      source: Manipula.from([1, 2, 3]),
      predicate: x => x < 4,
      expected: []
    },
    {
      toString: () => "Skip nothing",
      source: Manipula.from([1, 2, 3]),
      predicate: x => x > 4,
      expected: [1, 2, 3]
    },
    {
      toString: () => "Skip two elements",
      source: Manipula.from([1, 2, 3]),
      predicate: (x, i) => x + i <= 3,
      expected: [3]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.skipWhile(testCase.predicate).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test takeWhile", () => {
  const testCases = [
    {
      toString: () => "Takes first three elements",
      source: Manipula.from([1, 2, 3, 5, 1, 2]),
      predicate: x => x < 4,
      expected: [1, 2, 3]
    },
    {
      toString: () => "Takes nothing",
      source: Manipula.from([1, 2, 3]),
      predicate: x => x > 4,
      expected: []
    },
    {
      toString: () => "Takes two elements",
      source: Manipula.from([1, 2, 3]),
      predicate: (x, i) => x + i <= 3,
      expected: [1, 2]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.takeWhile(testCase.predicate).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test elementAt", () => {
  const testCases = [
    {
      toString: () => "ElementAt should locate element by index",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      index: 1,
      expected: 2
    },
    {
      toString: () => "ElementAt should throw error if index is greater or equal to source size",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      index: 15,
      expectedErrorMessage: "Index 15 lies out of range"
    },
    {
      toString: () => "ElementAt should throw error if index is less than zero",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      index: -1,
      expectedErrorMessage: "Index -1 lies out of range"
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.elementAt(testCase.index)).toBe(testCase.expected);
    else
      expect(() => testCase.source.elementAt(testCase.index)).toThrowWithMessage(
        RangeError,
        testCase.expectedErrorMessage
      );
  });
});

describe("Should test elementAtOrDefault", () => {
  const testCases = [
    {
      toString: () => "ElementAtOrDefault should locate element by index",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      index: 1,
      expected: 2
    },
    {
      toString: () => "ElementAtOrDefault should return null if index is greater or equal to source size",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      index: 15,
      expected: null
    },
    {
      toString: () => "ElementAtOrDefault should return null if index is less than zero",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      index: -1,
      expected: null
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    expect(testCase.source.elementAtOrDefault(testCase.index)).toBe(testCase.expected);
  });
});

describe("Should test aggregate", () => {
  const testCases = [
    {
      toString: () => "Should aggregate collection",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      accumulatorInitialValue: 1,
      aggregateFunction: (accumulator, current) => accumulator + current,
      expected: 22
    },
    {
      toString: () => "Should aggregate collection based on item number",
      source: Manipula.from([1, 2, 3, 4, 5, 6]),
      accumulatorInitialValue: 1,
      aggregateFunction: (accumulator, current, index) => accumulator + current * index,
      expected: 71
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    expect(testCase.source.aggregate(testCase.accumulatorInitialValue, testCase.aggregateFunction)).toBe(
      testCase.expected
    );
  });
});

describe("Should test min", () => {
  const testCases = [
    {
      toString: () => "Should throw exception if source is empty",
      source: Manipula.from([]),
      expectedErrorMessage: "Source contains no elements"
    },
    {
      toString: () => "Should compute minimum",
      source: Manipula.from([1, 2, -3, 4, -5, -6.3]),
      expected: -6.3
    },
    {
      toString: () => "Should compute minimum using values selector",
      source: Manipula.from([1, 2, -3, 4, -5, -6.3]),
      selector: x => x * x,
      expected: 1
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.min(testCase.selector)).toBe(testCase.expected);
    else expect(() => testCase.source.min(testCase.selector)).toThrowWithMessage(Error, testCase.expectedErrorMessage);
  });
});

describe("Should test max", () => {
  const testCases = [
    {
      toString: () => "Should throw exception if source is empty",
      source: Manipula.from([]),
      expectedErrorMessage: "Source contains no elements"
    },
    {
      toString: () => "Should compute maximum",
      source: Manipula.from([1, 2, -3, 4, -5, -6.3]),
      expected: 4
    },
    {
      toString: () => "Should compute maximum using values selector",
      source: Manipula.from([1, 2, -3, 4, -5, -6.3]),
      selector: x => x * x,
      expected: 39.69
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.max(testCase.selector)).toBe(testCase.expected);
    else expect(() => testCase.source.max(testCase.selector)).toThrowWithMessage(Error, testCase.expectedErrorMessage);
  });
});

describe("Should test sum", () => {
  const testCases = [
    {
      toString: () => "Should return 0 if source is empty",
      source: Manipula.from([]),
      expected: 0
    },
    {
      toString: () => "Should compute sum",
      source: Manipula.from([1, 2, -3, 4, -5, -6.3]),
      expected: -7.3
    },
    {
      toString: () => "Should compute sum using values selector",
      source: Manipula.from([1, 2, -3, 4, -5, -6.3]),
      selector: x => x * x,
      expected: 94.69
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    expect(testCase.source.sum(testCase.selector)).toBe(testCase.expected);
  });
});

describe("Should test average", () => {
  const testCases = [
    {
      toString: () => "Should throw exception if source is empty",
      source: Manipula.from([]),
      expectedErrorMessage: "Source contains no elements"
    },
    {
      toString: () => "Should compute average",
      source: Manipula.from([1, 2, 3, 4]),
      expected: 2.5
    },
    {
      toString: () => "Should compute average using values selector",
      source: Manipula.from([2, -3, 4, -5, -6.3]),
      selector: x => x * x,
      expected: 18.738
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) expect(testCase.source.average(testCase.selector)).toBe(testCase.expected);
    else
      expect(() => testCase.source.average(testCase.selector)).toThrowWithMessage(Error, testCase.expectedErrorMessage);
  });
});

describe("Should test reverse", () => {
  const testCases = [
    {
      toString: () => "Should return empty array if source was empty",
      source: Manipula.from([]),
      expected: []
    },
    {
      toString: () => "Should reverse source",
      source: Manipula.from([1, 2, 3, 4, 5]),
      expected: [5, 4, 3, 2, 1]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.reverse();

    // Then
    expect(actual.toArray()).toEqual(testCase.expected);
    expect(actual.length).toEqual(testCase.expected.length);
  });
});

describe("Should test repeat", () => {
  const testCases = [
    {
      toString: () => "Should throw exception if count is negative",
      element: 1,
      count: -1,
      expectedErrorMessage: "Count mustn't be negative"
    },
    {
      toString: () => "Should produce empty collection",
      element: 1,
      count: 0,
      expected: []
    },
    {
      toString: () => "Should repeat twice",
      element: 1,
      count: 2,
      expected: [1, 1]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) {
      const actual = Manipula.repeat(testCase.element, testCase.count);

      expect(actual.toArray()).toEqual(testCase.expected);
      expect(actual.length).toEqual(testCase.expected.length);
    } else
      expect(() => Manipula.repeat(testCase.element, testCase.count)).toThrowWithMessage(
        RangeError,
        testCase.expectedErrorMessage
      );
  });
});

describe("Should test range", () => {
  const testCases = [
    {
      toString: () => "Should throw exception if count is negative",
      start: 1,
      count: -1,
      expectedErrorMessage: "Count mustn't be negative"
    },
    {
      toString: () => "Should produce empty collection",
      start: 1,
      count: 0,
      expected: []
    },
    {
      toString: () => "Should produce three elements",
      start: 1,
      count: 3,
      expected: [1, 2, 3]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When, Then
    if (testCase.expected) {
      const actual = Manipula.range(testCase.start, testCase.count);

      expect(actual.toArray()).toEqual(testCase.expected);
      expect(actual.length).toEqual(testCase.expected.length);
    } else
      expect(() => Manipula.range(testCase.start, testCase.count)).toThrowWithMessage(
        RangeError,
        testCase.expectedErrorMessage
      );
  });
});

describe("Should test skipLast", () => {
  const testCases = [
    {
      toString: () => "Skip less than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 2,
      expected: [1]
    },
    {
      toString: () => "Skip more than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 4,
      expected: []
    },
    {
      toString: () => "Skip zero count",
      source: Manipula.from([1, 2, 3]),
      count: 0,
      expected: [1, 2, 3]
    },
    {
      toString: () => "Skip negative count",
      source: Manipula.from([1, 2, 3]),
      count: -1,
      expected: [1, 2, 3]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.skipLast(testCase.count).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test takeLase", () => {
  const testCases = [
    {
      toString: () => "Take less than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 2,
      expected: [2, 3]
    },
    {
      toString: () => "Take more than elements count",
      source: Manipula.from([1, 2, 3]),
      count: 4,
      expected: [1, 2, 3]
    },
    {
      toString: () => "Take negative count",
      source: Manipula.from([1, 2, 3]),
      count: -1,
      expected: []
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.source.takeLast(testCase.count).toArray();

    // Then
    expect(actual).toEqual(testCase.expected);
  });
});

describe("Should test ordering", () => {
  const testCases = [
    {
      toString: () => "Should sort numbers in ascending order",
      source: Manipula.from([5, 3, 2, 1, 4]),
      sorter: source => source.orderBy(x => x),
      expected: [1, 2, 3, 4, 5]
    },
    {
      toString: () => "Should sort numbers in descending order",
      source: Manipula.from([5, 3, 2, 1, 4]),
      sorter: source => source.orderByDescending(x => x),
      expected: [5, 4, 3, 2, 1]
    },
    {
      toString: () => "Should sort strings in ascending order",
      source: Manipula.from(["March", "Jan", "Feb", "Dec"]),
      sorter: source => source.orderBy(x => x),
      expected: ["Dec", "Feb", "Jan", "March"]
    },
    {
      toString: () => "Should sort strings in descending order",
      source: Manipula.from(["March", "Jan", "Feb", "Dec"]),
      sorter: source => source.orderByDescending(x => x),
      expected: ["March", "Jan", "Feb", "Dec"]
    },
    {
      toString: () => "Should sort booleans in ascending order",
      source: Manipula.from([true, false, true, false]),
      sorter: source => source.orderBy(x => x),
      expected: [false, false, true, true]
    },
    {
      toString: () => "Should sort booleans in descending order",
      source: Manipula.from([true, false, true, false]),
      sorter: source => source.orderByDescending(x => x),
      expected: [true, true, false, false]
    },
    {
      toString: () => "Should sort complex object in ascending order",
      source: Manipula.from([new Key(1, 2), new Key(2, 7), new Key(2, 5), new Key(1, 3)]),
      sorter: source => source.orderBy(x => x.hi).thenBy(x => x.lo),
      expected: [new Key(1, 2), new Key(1, 3), new Key(2, 5), new Key(2, 7)]
    },
    {
      toString: () => "Should sort complex object in descending order",
      source: Manipula.from([new Key(1, 2), new Key(2, 7), new Key(2, 5), new Key(1, 3)]),
      sorter: source => source.orderByDescending(x => x.hi).thenByDescending(x => x.lo),
      expected: [new Key(2, 7), new Key(2, 5), new Key(1, 3), new Key(1, 2)]
    },
    {
      toString: () => "Should sort complex object in ascending order with custom comparer",
      source: Manipula.from([new Key(1, 2), new Key(2, 7), new Key(2, 5), new Key(1, 3)]),
      sorter: source =>
        source.orderBy(
          x => x,
          (a, b) => {
            if (a.hi !== b.hi) return a.hi - b.hi;
            return a.lo - b.lo;
          }
        ),
      expected: [new Key(1, 2), new Key(1, 3), new Key(2, 5), new Key(2, 7)]
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.sorter(testCase.source);

    // Then
    expect(actual.toArray()).toEqual(testCase.expected);
    expect(actual.length).toEqual(testCase.expected.length);
  });
});

describe("Should test sequenceEqual", () => {
  const testCases = [
    {
      toString: () => "Sequence must not be equal to null",
      first: Manipula.from([1, 2, 3]),
      second: null,
      expected: false
    },
    {
      toString: () => "Must determine that first sequence is larger",
      first: Manipula.from([1, 2, 3]),
      second: Manipula.from([1, 2]),
      expected: false
    },
    {
      toString: () => "Must determine that second sequence is larger",
      first: Manipula.from([1, 2]),
      second: Manipula.from([1, 2, 3]),
      expected: false
    },
    {
      toString: () => "Must determine that sequences are different",
      first: Manipula.from([1, "first", 3]),
      second: Manipula.from([1, "second", 3]),
      expected: false
    },
    {
      toString: () => "Must determine that sequences are equal",
      first: Manipula.from([1, "test", 3]),
      second: Manipula.from([1, "test", 3]),
      expected: true
    },
    {
      toString: () => "Must determine that sequences are equal using external comparer",
      first: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(3, 3)]),
      second: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(3, 3)]),
      comparer: new KeysComparer(),
      expected: true
    },
    {
      toString: () => "Must determine that sequences are equal using default comparer",
      first: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(3, 3)]),
      second: Manipula.from([new Key(1, 1), new Key(2, 2), new Key(3, 3)]),
      expected: true
    },
    {
      toString: () => "Must determine that sequences are not equal using external comparer",
      first: Manipula.from([new Key(3, 1), new Key(5, 2), new Key(3, 3)]),
      second: Manipula.from([new Key(1, 3), new Key(2, 5), new Key(3, 3)]),
      comparer: new KeysComparer(),
      expected: false
    },
    {
      toString: () => "Must determine that sequences are not equal using default comparer",
      first: Manipula.from([new Key(3, 1), new Key(5, 2), new Key(3, 3)]),
      second: Manipula.from([new Key(1, 3), new Key(2, 5), new Key(3, 3)]),
      expected: false
    }
  ];

  test.each(testCases)("%s", testCase => {
    // When
    const actual = testCase.first.sequenceEqual(testCase.second, testCase.comparer);

    // Then
    expect(actual).toBe(testCase.expected);
  });
});
