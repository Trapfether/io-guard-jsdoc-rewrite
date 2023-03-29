
/**
 * @template T
 * @param {Erratic<T>} x
 * @return {x is null}
 */
const isNull = function(x) {
  return x === null;
}

/**
 * @template T
 * @param {Erratic<T>} x
 * @returns {x is undefined}
 */
const isUndefined = function(x) {
  return x === undefined;
}

/**
 * @template T
 * @param {Erratic<T>} x
 * @returns {x is null | undefined}
 */
const isErratic = function(x) {
  return isNull(x) || isUndefined(x);
}

/**
 * @template T
 * @param {TypedTest<T>[]} tests
 * @returns {(x: Erratic<T>) => x is T}
 */
const and = function(...tests) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return isErratic(x) ? false : tests.every(test => test(x));
  }
}

/**
 * @template T
 * @param {TypedTest<T>[]} tests
 * @returns {(x: Erratic<T>) => x is T}
 */
const or = function(...tests) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return isErratic(x) ? false : tests.some(test => test(x));
  }
}

/**
 * @template T
 * @param {TypedTest<T>} test
 * @returns {(x: Erratic<T>) => x is T}
 */
const optional = function(test) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return isNull(x) ? false : isUndefined(x) ? true : test(x);
  }
}

/**
 * @template T
 * @param {TypedTest<T>} test
 * @returns {(x: Erratic<T>) => x is T}
 */
const nullable = function(test) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return isNull(x) ? true : isUndefined(x) ? false : test(x);
  }
}

/**
 * @template T
 * @param {TypedTest<T>} test
 * @returns {(x: Erratic<T>) => x is T}
 */
const erratic = function(test) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return isErratic(x) ? true : test(x);
  }
}

const compose = and;

/**
 * @template T
 * @param {TypedTest<T>} test
 * @returns {(x: Erratic<T>) => x is T}
 */
const customTest = function(test) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return isErratic(x) ? false : test(x);
  }
}

const test = customTest;

/**
 * @template T
 * @param {TypedTest<Erratic<T>>} test
 * @returns {(x: Erratic<T>) => x is T}
 */
const unsafeTest = function(test) {
  /**
   * @param {Erratic<T>} x
   * @returns {x is T}
   */
  return function(x) {
    return test(x);
  }
}

export { compose, and, or, optional, nullable, erratic, customTest, test, unsafeTest };
