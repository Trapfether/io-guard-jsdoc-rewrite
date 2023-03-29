/**
 * @template T
 * @param {T} type
 * @returns {ValueTypeGuard<T>}
 */
function isTypeof(type) {
  /**
   * @param {T} x
   * @returns {x is T}
   */
  return function (x) {
    return typeof x === typeof type;
  };
}

const isString = isTypeof(String());
const isNumber = isTypeof(Number());
const isBoolean = isTypeof(Boolean());

/**
 * @template T
 * @param {T[]} xs
 * @returns {xs is T[]}
 */
function isArray(xs) {
  return Array.isArray(xs);
}

export { isString, isNumber, isBoolean, isArray, isTypeof };