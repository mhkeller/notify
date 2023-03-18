/* --------------------------------------------
 *
 * Create the timestamp and project dir portion of the notification
 * This will add any line breaks if they are designated in the display
 * --------------------------------------------
 */
import * as _ from 'underscore';

import applyChalkStyles from './applyChalkStyles.js';

export default function constructPrefix (defaults, display) {
  let returnVal = display.preString;

  if (display.skipPrefix === true) {
    return returnVal;
  }

  const prefixStyle = { ...defaults.prefixStyle, ...display.prefixStyle };

  const d = new Date();
  let time;

  const customTime = defaults.time;
  if (_.isFunction(customTime)) {
    time = customTime(d);
  } else {
    time = typeof customTime === 'string' ? customTime : String(customTime);
  }

  const prjString = display.projectName || defaults.projectName;
  returnVal += prefixStyle.open +
    applyChalkStyles(time, prefixStyle.timestampStyle) + ' ' +
    prefixStyle.sep + ' ' +
    applyChalkStyles(prjString, prefixStyle.projectNameStyle) +
    prefixStyle.close;

  return returnVal + ' ';
}
