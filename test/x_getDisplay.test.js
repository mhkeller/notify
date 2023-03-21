/* globals describe it */
import assert from 'assert';

import fn from '../src/lib/getDisplay.js';
import defaults from '../src/defaults.js';

const name = 'getDisplay';

const rows = [
  // Empty
  { args: [defaults, undefined, undefined], expected: defaults.baseDisplay },

  // Setting desktop
  { args: [defaults, {}, true], expected: { ...defaults.baseDisplay, desktop: true } },
  { args: [defaults, {}, false], expected: { ...defaults.baseDisplay, desktop: false } },
  { args: [defaults, {}, {}], expected: { ...defaults.baseDisplay, desktop: false } },
  { args: [defaults, {}, []], expected: { ...defaults.baseDisplay, desktop: false } },
  { args: [defaults, {}, 1], expected: { ...defaults.baseDisplay, desktop: false } },
  { args: [defaults, {}, ''], expected: { ...defaults.baseDisplay, desktop: false } },

  // Setting colors
  { args: [defaults, 'red', ''], expected: { ...defaults.baseDisplay, messageStyle: 'red' } },
  { args: [defaults, 'bold', ''], expected: { ...defaults.baseDisplay, messageStyle: 'bold' } },
  { args: [defaults, ['red'], ''], expected: { ...defaults.baseDisplay, messageStyle: ['red'] } },
  { args: [defaults, ['bold'], ''], expected: { ...defaults.baseDisplay, messageStyle: ['bold'] } },
  { args: [defaults, ['bold', 'blue'], ''], expected: { ...defaults.baseDisplay, messageStyle: ['bold', 'blue'] } },

  // Setting colors and desktop
  { args: [defaults, 'red', true], expected: { ...defaults.baseDisplay, messageStyle: 'red', desktop: true } },
  { args: [defaults, 'bold', false], expected: { ...defaults.baseDisplay, messageStyle: 'bold', desktop: false } },
  { args: [defaults, ['red'], {}], expected: { ...defaults.baseDisplay, messageStyle: ['red'], desktop: false } },
  { args: [defaults, ['bold'], []], expected: { ...defaults.baseDisplay, messageStyle: ['bold'], desktop: false } },
  { args: [defaults, ['bold', 'blue'], ''], expected: { ...defaults.baseDisplay, messageStyle: ['bold', 'blue'], desktop: false } },

  // Setting an object
  { args: [defaults, { messageStyle: 'red' }, ''], expected: { ...defaults.baseDisplay, messageStyle: 'red' } },
  { args: [defaults, { messageStyle: 'bold' }, ''], expected: { ...defaults.baseDisplay, messageStyle: 'bold' } },
  { args: [defaults, { messageStyle: ['red'] }, ''], expected: { ...defaults.baseDisplay, messageStyle: ['red'] } },
  { args: [defaults, { messageStyle: ['bold'] }, ''], expected: { ...defaults.baseDisplay, messageStyle: ['bold'] } },
  { args: [defaults, { messageStyle: ['bold', 'blue'] }, ''], expected: { ...defaults.baseDisplay, messageStyle: ['bold', 'blue'] } },

  // Setting an object and desktop
  { args: [defaults, { messageStyle: 'red' }, true], expected: { ...defaults.baseDisplay, messageStyle: 'red', desktop: true } },
  { args: [defaults, { messageStyle: 'bold' }, false], expected: { ...defaults.baseDisplay, messageStyle: 'bold', desktop: false } },
  { args: [defaults, { messageStyle: ['red'] }, {}], expected: { ...defaults.baseDisplay, messageStyle: ['red'], desktop: false } },
  { args: [defaults, { messageStyle: ['bold'] }, []], expected: { ...defaults.baseDisplay, messageStyle: ['bold'], desktop: false } },
  { args: [defaults, { messageStyle: ['bold', 'blue'] }, ''], expected: { ...defaults.baseDisplay, messageStyle: ['bold', 'blue'], desktop: false } },

  // more display options
];

describe(name, () => {
  rows.forEach((t) => {
    it(`should match expected ${t.args[1]}`, () => {
      const actual = fn(...t.args);
      assert.deepEqual(actual, t.expected);
    });
  });
});
