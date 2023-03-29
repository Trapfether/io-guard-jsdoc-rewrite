/**
 * @template T
 * @typedef {(x: any) => x is T} ObjectTypeGuard<T>
 */

/**
 * @template T
 * @typedef {(xs: any[]) => xs is T[]} ArrayTypeGuard<T>
 */

/**
 * @template T
 * @typedef {(x: T) => x is T} ValueTypeGuard<T>
 */

/**
 * @template T
 * @typedef {(x: T) => any} TypedTest<T>
 */

/**
 * @template T
 * @typedef {{[key in keyof T]: ValueTypeGuard<T[key]>}} ValidatorMap<T>
 */
/**
 * @template T
 * @typedef {{[key in keyof T]: T[key]}} ValueMap<T>
 */

/**
 * @template T
 * @typedef {T | null | undefined} Flaky<T>
 */
/**
 * @template T
 * @typedef {Flaky<T>} Flakey<T>
 */
/**
 * @template T
 * @typedef {Flaky<T>} Erratic<T>
 */
/**
 * @template T
 * @typedef {T | undefined} Optional<T>
 */
/**
 * @template T
 * @typedef {T | null} Nullable<T>
 */