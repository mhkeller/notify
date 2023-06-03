/* --------------------------------------------
 *
 * Base notifyrc file.
 *
 * --------------------------------------------
 */

import projectName from './lib/getProjectName.js';
import formatTimestamp from './utils/formatTimestamp.js';

const defaults = {
  time: formatTimestamp,
  projectName: projectName(),
  prefixStyle: {
    open: '[',
    close: ']',
    sep: '|',
    timestampStyle: 'gray',
    projectNameStyle: ['blue', 'bold']
  },
  baseDisplay: {
    messageStyle: '',
    valueStyle: 'bold',
    preString: '',
    postString: '',
    skipPrefix: false,
    prefixStyle: {},
    projectName: null,
    time: null,
    desktop: false,
    level: 'log'
  },
  displays: {
    default: {},
    title: ['blue', 'bold', 'underline'],
    header: ['blue', 'bold'],
    group: ['magenta', 'bold'],
    task: ['cyan', 'bold'],
    note: ['gray', 'italic'],
    error: {
      messageStyle: 'red',
      desktop: true,
      level: 'error'
    },
    warn: {
      messageStyle: ['yellow', 'bold'],
      level: 'warn'
    },
    change: {
      preString: '\n',
      messageStyle: 'cyan'
    },
    success: ['green', 'bold']
  }
};

export default defaults;
