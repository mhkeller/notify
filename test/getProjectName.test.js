/* globals describe it */
import assert from 'assert';

import fn from '../src/lib/getProjectName.js';

const name = 'getProjectName';

const tests = [
  { args: [], expected: 'notify' }
];

describe(name, () => {
  tests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      const actual = fn(t.args[0]);
      assert.equal(actual, t.expected);
    });
  });
});
