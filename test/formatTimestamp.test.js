/* globals describe it */
import assert from 'assert';

import fn from '../src/utils/formatTimestamp.js';

const name = 'formatTimestamp';

const rows = [
  { args: [new Date(2017, 0, 1)], expected: '00:00:00.00' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 0)], expected: '11:33:30.00' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 50)], expected: '11:33:30.05' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 45)], expected: '11:33:30.05' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 40)], expected: '11:33:30.04' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 100)], expected: '11:33:30.10' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 350)], expected: '11:33:30.35' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 340)], expected: '11:33:30.34' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 356)], expected: '11:33:30.36' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 900)], expected: '11:33:30.90' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 990)], expected: '11:33:30.99' },
  { args: [new Date(2017, 0, 1, 11, 33, 30, 998)], expected: '11:33:30.99' }
];

describe(name, () => {
  rows.forEach((t) => {
    it(`should match expected ${t.args[0]}`, () => {
      const actual = fn(t.args[0]);
      assert.equal(actual, t.expected);
    });
  });
});
