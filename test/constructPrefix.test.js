/* globals describe it */
import assert from 'assert';

import fn from '../src/lib/constructPrefix.js';
import defaults from '../src/defaults.js';

const name = 'constructPrefix';

const tests = [
  {
    args: [{ ...defaults, time: (d) => '12:00:00.10' }, { preString: '' }],
    expected: '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] '
  },
  {
    args: [defaults, { skipPrefix: true, preString: 'hi' }],
    expected: 'hi'
  },
  {
    args: [defaults, { skipPrefix: true, preString: '\n' }],
    expected: '\n'
  },
  {
    args: [{ ...defaults, time: (d) => '12:00:00.10' }, { preString: 'hi' }],
    expected: 'hi[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] '
  },
  {
    args: [{ ...defaults, time: (d) => '12:00:00.10' }, { preString: '', projectName: 'hello' }],
    expected: '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mhello\x1B[39m\x1B[22m] '
  },
  {
    args: [{ ...defaults, time: (d) => '12:00:00.10', projectName: 'hi' }, { preString: '' }],
    expected: '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mhi\x1B[39m\x1B[22m] '
  }
];

describe(name, () => {
  tests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      const actual = fn(...t.args);
      assert.equal(actual, t.expected);
    });
  });
});
