/* globals describe it */
import assert from 'assert';

import fn from '../src/utils/formatTime.js';

const name = 'formatTime';

const tests = [
  { args: [0], expected: '0ms' },
  { args: [0.1 * 0.2], expected: '0ms' },
  { args: [2], expected: '2ms' },
  { args: [20], expected: '20ms' },
  { args: [6814], expected: '6.81s' },
  { args: [7565], expected: '7.56s' },
  { args: [7686], expected: '7.69s' },
  { args: [7692], expected: '7.69s' },
  { args: [7805], expected: '7.81s' },
  { args: [7944], expected: '7.94s' },
  { args: [20.4], expected: '20.4ms' },
  { args: [20.5], expected: '20.5ms' },
  { args: [20.6], expected: '20.6ms' },
  { args: [60.02000000000004], expected: '60ms' },
  { args: [60.1], expected: '60.1ms' },
  { args: [1500], expected: '1.5s' },
  { args: [1750], expected: '1.75s' },
  { args: [40000], expected: '40s' },
  { args: [40500], expected: '40.5s' },
  { args: [40750], expected: '40.75s' },
  { args: [60000], expected: '1m' },
  { args: [61000], expected: '1m 1s' },
  { args: [61750], expected: '1m 1s' },
  { args: [10 * 60 * 1000], expected: '10m' },
  { args: [60 * 1000 * 10 + 500], expected: '10m' },
  { args: [60 * 1000 * 10 + 1600], expected: '10m 1s' },
  { args: [51 * 60 * 1000 + 40 * 1000], expected: '51m 40s' },
  { args: [59 * 60 * 1000 + 59 * 1000], expected: '59m 59s' },
  { args: [60 * 60 * 1000 + 59 * 1000], expected: '1h 59s' },
  { args: [2 * 60 * 60 * 1000 + 30 * 1000 + 59 * 1000], expected: '2h 1m 29s' },
  { args: [2 * 60 * 60 * 1000 + 30 * 1000], expected: '2h 30s' },
  { args: [2 * 60 * 60 * 1000 + 300], expected: '2h 1s' },
  { args: [2 * 60 * 60 * 1000 + 1200], expected: '2h 1s' },
  { args: [2 * 60 * 60 * 1000 + 300], expected: '2h 1s' }
];

describe(name, () => {
  tests.forEach(t => {
    it(`should match expected ${t.expected}`, () => {
      const actual = fn(t.args[0]);
      assert.equal(actual, t.expected);
    });
  });
});
