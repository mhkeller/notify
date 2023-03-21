/* globals describe it */
import assert from 'assert';

import fn from '../src/lib/getProjectName.js';

const name = 'getProjectName';

const rows = [
  { args: [], expected: 'notify' }
];

describe(name, () => {
  rows.forEach((t) => {
    it(`should match expected`, () => {
      const actual = fn(t.args[0]);
      assert.equal(actual, t.expected);
    });
  });
});
