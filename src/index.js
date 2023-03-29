/**
 * @template T
 * @param {ValidatorMap<T>} validators
 * @returns {ObjectTypeGuard<T>}
 */
const Guard = function (validators) {
  /**
   * @param {ValueMap<T>} values
   * @returns {values is T}
   */
  return function (values) {
    if (values == null) return false;
    for (const key in validators) {
      const test = validators[key];
      const value = values[key];
      if (!test(value)) return false;
      else continue;
    }
    return true;
  };
};

/**
 * @template T
 * @param {ValueTypeGuard<T>} test
 * @returns {ArrayTypeGuard<T>}
 */
const GuardEach = function (test) {
  /**
   * @param {T[]} values
   * @returns {values is T[]}
   */
  return function (values) {
    if (!Array.isArray(values)) return false;
    for (const value of values) {
      if (!test(value)) return false;
      else continue;
    }
    return true;
  };
};

export { Guard, GuardEach };

export { isNumber, isString, isBoolean, isArray } from "./guards/guards.mjs";
export { compose, and, or, optional, nullable, erratic, customTest, test, unsafeTest } from "./operators/operators.mjs";
