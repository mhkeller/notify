/* globals describe it beforeEach afterEach */
import assert from 'assert';
import sinon from 'sinon';

import fn from '../src/index.js';

const name = 'notify';

// sinon.spy(console, 'log');
// sinon.spy(console, 'warn');
// sinon.spy(console, 'error');

const tests = [
  {
    args: [{ m: 'hello', v: 'value' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] hello \x1B[1mvalue\x1B[22m'
  },
  {
    args: [{ m: 'hello', v: 'value', d: 'blue' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[34mhello\x1B[39m \x1B[1mvalue\x1B[22m'
  },
  {
    args: [{ m: 'hello', v: 'value', d: ['blue', 'bold'] }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[34mhello\x1B[39m\x1B[22m \x1B[1mvalue\x1B[22m'
  },
  {
    args: [
      { m: 'hello', v: 'value', d: { messageStyle: ['blue', 'bold'], skipPrefix: true } },
      { time: '12:00:00.10' }
    ],
    expected: '\x1B[1m\x1B[34mhello\x1B[39m\x1B[22m \x1B[1mvalue\x1B[22m'
  },
  {
    args: [
      { m: 'hello', v: 'value', d: { messageStyle: ['blue', 'bold'], postString: '\n' } },
      { time: '12:00:00.10' }
    ],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[34mhello\x1B[39m\x1B[22m \x1B[1mvalue\x1B[22m\n'
  },
  {
    args: [
      { m: 'hello', v: 'value', d: ['red', 'bold', 'underline', 'italic'] },
      { time: '12:00:00.10' }
    ],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[3m\x1B[4m\x1B[1m\x1B[31mhello\x1B[39m\x1B[22m\x1B[24m\x1B[23m \x1B[1mvalue\x1B[22m'
  },
  {
    args: [
      {
        m: 'hello',
        v: 'value',
        d: {
          messageStyle: ['magenta', 'bold', 'underline', 'italic'],
          valueStyle: ['bold', 'yellow']
        }
      },
      { time: '12:00:00.10' }
    ],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[3m\x1B[4m\x1B[1m\x1B[35mhello\x1B[39m\x1B[22m\x1B[24m\x1B[23m \x1B[33m\x1B[1mvalue\x1B[22m\x1B[39m'
  },
  {
    args: [{ v: 'value', d: ['blue', 'bold'] }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1mvalue\x1B[22m'
  },
  {
    args: [{ m: 'hello', d: ['blue', 'bold'] }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[34mhello\x1B[39m\x1B[22m'
  },
  {
    args: [{ m: 'hello', d: ['blue', 'bold'], k: true }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[34mhello\x1B[39m\x1B[22m'
  },
  {
    args: [{ m: 'header', d: 'header' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[34mheader\x1B[39m\x1B[22m'
  },
  {
    args: [{ m: 'group', d: 'group' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[35mgroup\x1B[39m\x1B[22m'
  },
  {
    args: [{ m: 'task', d: 'task' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[36mtask\x1B[39m\x1B[22m'
  },
  {
    args: [{ m: 'note', d: 'note' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[3m\x1B[90mnote\x1B[39m\x1B[23m'
  },
  {
    args: [{ m: 'change', d: 'change' }, { time: '12:00:00.10' }],
    expected:
      '\n[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[36mchange\x1B[39m'
  },
  {
    args: [{ m: 'success', d: 'success' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[32msuccess\x1B[39m\x1B[22m'
  }
];

const errorTests = [
  {
    args: [{ m: 'hello', d: 'error' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[31mhello\x1B[39m'
  }
];

const warnTests = [
  {
    args: [{ m: 'hello', d: 'warn' }, { time: '12:00:00.10' }],
    expected:
      '[\x1B[90m12:00:00.10\x1B[39m | \x1B[1m\x1B[34mnotify\x1B[39m\x1B[22m] \x1B[1m\x1B[33mhello\x1B[39m\x1B[22m'
  }
];

describe(name, () => {
  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    sandbox.spy(console);
  });

  afterEach(function () {
    sandbox.restore();
  });

  tests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      fn(...t.args);
      const actual = console.log.getCall(0).args[0];
      assert.equal(actual, t.expected);
    });
  });

  errorTests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      fn(...t.args);
      const actual = console.error.getCall(0).args[0];
      assert.equal(actual, t.expected);
    });
  });

  warnTests.forEach((t) => {
    it(`should match expected ${t.expected}`, () => {
      fn(...t.args);
      const actual = console.warn.getCall(0).args[0];
      assert.equal(actual, t.expected);
    });
  });
});
