/* globals describe it */
import assert from 'assert';

import fn from '../src/lib/normalize.js';

const name = 'normalize';

const date = new Date();

const tests = [
  { args: [0], expected: '0' },
  { args: [1], expected: '1' },
  { args: [NaN], expected: 'NaN' },
  { args: [Infinity], expected: 'Infinity' },
  { args: [{ hi: 'hello' }], expected: JSON.stringify({ hi: 'hello' }) },
  { args: [[0, 1, 2, 3, 4]], expected: JSON.stringify([0, 1, 2, 3, 4]) },
  { args: [new Error('hi')], expected: JSON.stringify(new Error('hi')) },
  { args: [date], expected: JSON.stringify(date) },
  { args: [false], expected: 'false' },
  { args: [false], expected: 'false' },
  { args: [true], expected: 'true' },
  { args: ['hi'], expected: 'hi' }
];

describe(name, () => {
  tests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      const actual = fn(...t.args);
      assert.equal(actual, t.expected);
    });
  });
});
