import { Guard, GuardEach } from "./index";
import { and } from "./operators/operators.mjs";
import { isString } from "./guards/guards.mjs";

describe("Guard", () => {
  it("takes an object of keys and validators, validates input with the same keys, and passes if every validator passes (short-ciruit on fail)", () => {
    /**
     * @typedef {Object} Person
     * @property {string} name
     * @property {number} age
     */

    /**
     * @param {String} x
     * @returns {x is String}
     */
    const isName = x => isString(x) && x.length > 1;
    /**
     * @param {Number} x
     * @returns {x is Number}
     */
    const isAge = x => 0 <= x && x < 120;

    /**
     * @type {ObjectTypeGuard<Person>}
     */
    const isPerson = Guard({
      name: isName,
      age: isAge
    });

    expect(isPerson({ name: "Kirk", age: 65 })).toBe(true);

    expect(
      isPerson({
        name: "Spock",
        age: 161
      })
    ).toBe(false);

    // @ts-ignore
    expect(isPerson({ name: "tribble" })).toBe(false);
  });

  it("fails gracefully, if passed null or undefined", () => {
    /** @type {User} */
    const holmes = {
      name: "Sherlock Holmes",
      address: {
        street: "221B Baker St",
        city: "London",
        geo: { lat: "51.520664584", long: "-0.15499938" }
      }
    };

    /** @type {User} */
    const dent = {
      name: "Arthur Dent",
      // @ts-ignore
      address: null
    };

    /**
     * @param {Number} max
     * @returns {((x: string | number) => Boolean)}
     */
    const lte = function(max) {
      return function(x) {
        return +x <= max;
      };
    }
    /**
     * @param {Number} min
     * @returns {((x: string | number) => Boolean)}
     */
    const gte = function(min) {
      return function(x) {
        return +x >= min;
      };
    }

    /**
     * @param {String} x
     * @returns {Boolean}
     */
    const isNumberAsString = function(x) {
      return typeof +x === "number" && !isNaN(+x);
    }
    const isValidLat = and(isNumberAsString, gte(-90), lte(90));
    const isValidLong = and(isNumberAsString, gte(-180), lte(180));

    const isValidAddress = Guard({
      street: isString,
      city: isString,
      /**
       * @type {ObjectTypeGuard<Geo>}
       */
      geo: Guard({ lat: isValidLat, long: isValidLong })
    });

    /**
     * @type {ObjectTypeGuard<User>}
     */
    const isValidUser = Guard({
      name: isString,
      address: isValidAddress
    });

    /**
     * @typedef {Object} User
     * @property {string} name
     * @property {Address} address
     */

    /**
     * @typedef {Object} Address
     * @property {string} street
     * @property {string} city
     * @property {Geo} geo
     */

    /**
     * @typedef {Object} Geo
     * @property {string} lat
     * @property {string} long
     */

    // @ts-ignore
    expect(isValidUser(null)).toBe(false);
    expect(isValidUser(holmes)).toBe(true);
    expect(isValidUser(dent)).toBe(false);
  });
});

describe("GuardEach", () => {
  it("takes a TypeGuard and an Iterable<T> and passes if each T passes", () => {
    /**
     * @typedef {Object} CrewMember
     * @property {string} name
     * @property {string} role
     * @property {string} posting
     */

    /**
     * @param {CrewMember} x
     * @returns {x is CrewMember}
     */
    const isCrewMember = function(x) {
      return x.posting === "Enterprise";
    };

    const isCrew = GuardEach(isCrewMember);

    const crew1 = [
      { name: "Kirk", role: "captain", posting: "Enterprise" },
      { name: "Spock", role: "commander", posting: "Enterprise" }
    ];

    const crew2 = [
      { name: "Picard", role: "captain", posting: "Enterprise" },
      { name: "Q", role: "foil", posting: "Q-Continuum" }
    ];

    expect(isCrew(crew1)).toBe(true);
    expect(isCrew(crew2)).toBe(false);
  });

  it("returns false if given a value which is not an array", () => {
    /**
     * @param {boolean} x
     * @returns {x is true}
     */
    const isTrue = function(x) {
      return x === true;
    };
    const allRight = GuardEach(isTrue);

    // @ts-ignore
    expect(allRight({})).toBe(false);
    // @ts-ignore
    expect(allRight(false)).toBe(false);
    // @ts-ignore
    expect(allRight([false])).toBe(false);
    expect(allRight([])).toBe(true);
    expect(allRight([true])).toBe(true);
  });
});
