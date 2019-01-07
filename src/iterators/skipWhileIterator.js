const Manipula = require("../manipula");

class SkipWhileIterator extends Manipula {
  constructor(source, predicate) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    const iterator = this._source[Symbol.iterator]();
    for (
      var currentState = iterator.next(), i = 0;
      currentState.done === false && this._predicate(currentState.value, i);
      currentState = iterator.next(), i++
    );
    for (; currentState.done === false; currentState = iterator.next()) yield currentState.value;
  }
}

Manipula.prototype.skipWhile = function(predicate) {
  return new SkipWhileIterator(this, predicate);
};
