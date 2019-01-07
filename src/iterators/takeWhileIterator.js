const Manipula = require("../manipula");

class TakeWhileIterator extends Manipula {
  constructor(source, predicate) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    const iterator = this._source[Symbol.iterator]();
    for (
      let currentState = iterator.next(), i = 0;
      currentState.done === false && this._predicate(currentState.value, i);
      currentState = iterator.next(), i++
    )
      yield currentState.value;
  }
}

Manipula.prototype.takeWhile = function(predicate) {
  return new TakeWhileIterator(this, predicate);
};
