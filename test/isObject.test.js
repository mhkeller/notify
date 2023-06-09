/* globals describe it */
import assert from 'assert';

import fn from '../src/utils/isObject.js';

const name = 'isObject';

const tests = [
  { args: [{}], expected: true },
  { args: [0], expected: false },
  { args: [1], expected: false },
  { args: [NaN], expected: false },
  { args: [undefined], expected: false },
  { args: [null], expected: false },
  { args: [false], expected: false },
  { args: [true], expected: false },
  { args: [Infinity], expected: false },
  { args: [-Infinity], expected: false }
];

describe(name, () => {
  tests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      const actual = fn(t.args[0]);
      assert.equal(actual, t.expected);
    });
  });
});
