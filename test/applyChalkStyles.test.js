/* globals describe it */
import assert from 'assert';

import fn from '../src/lib/applyChalkStyles.js';

const name = 'applyChalkStyles';

const tests = [
  { args: ['target', 'blue'], expected: '\x1B[34mtarget\x1B[39m' },
  { args: ['target', ['blue']], expected: '\x1B[34mtarget\x1B[39m' },
  { args: ['target', ['blue ']], expected: '\x1B[34mtarget\x1B[39m' },
  { args: ['target', [undefined, 'blue ', '']], expected: '\x1B[34mtarget\x1B[39m' },
  { args: ['target', 'blue '], expected: '\x1B[34mtarget\x1B[39m' },
  { args: ['target', ['red ', ' bold']], expected: '\x1B[1m\x1B[31mtarget\x1B[39m\x1B[22m' },
  { args: ['target', ['cyan', ' bold']], expected: '\x1B[1m\x1B[36mtarget\x1B[39m\x1B[22m' },
  { args: ['target', ['cyan']], expected: '\x1B[36mtarget\x1B[39m' },
  { args: ['target', [null, 'cyan']], expected: '\x1B[36mtarget\x1B[39m' },
  { args: ['target', ['', 'cyan']], expected: '\x1B[36mtarget\x1B[39m' },
  { args: ['target', [undefined, 'cyan']], expected: '\x1B[36mtarget\x1B[39m' },
  { args: ['target', ['yellow', 'underline']], expected: '\x1B[4m\x1B[33mtarget\x1B[39m\x1B[24m' }
];

const errorTests = [
  {
    args: ['target', ['orange', 'underline']],
    expected: /^TypeError: Invalid chalk style: "orange"$/
  },
  {
    args: ['target', 'purple'],
    expected: /^TypeError: Invalid chalk style: "purple"$/
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

errorTests.forEach(test => {
  describe(JSON.stringify(test.args), () => {
    it(`should throw error ${test.expected}`, () => {
      const actual = () => fn(...test.args);
      assert.throws(actual, test.expected);
    });
  });
});
