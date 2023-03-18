import { isObject } from 'underscore';
import notifier from 'node-notifier';
import cS from 'clean-stack';
import stripAnsi from 'strip-ansi';

import defaults from './defaults.js';

import applyChalkStyles from './lib/applyChalkStyles.js';
import constructPrefix from './lib/constructPrefix.js';
import normalize from './lib/normalize.js';
import print from './lib/print.js';
import getDisplay from './lib/getDisplay.js';

/**
  Send a notification
  @param {Object} notification Settings
  @param {String} notification.m A description
  @param {String} notification.v A specific value
  @param {String|Array|Object} notification.d The display value. Can be a chalk color name, array of them, or a display object with more settings
  @param {Object} [notification.error] An optional error object to log out
  @param {Boolean} [notification.k = false] Send a desktop notification
*/
export default function notify (notification) {
  if (!isObject(notification)) {
    notify({ m: 'Input must be an object', d: 'error' });
  }

  const { m = '', v = '', d = '', error = false, k } = notification;

  /**
   * Configure the display object
   */
  const display = getDisplay(defaults, d, k);

  /**
   * Normalize json objects, numbers and falsey values
   */
  const mNormal = normalize(m);
  const vNormal = normalize(v);
  const errorNormal = error ? '\n' + cS(error.stack, { pretty: true }) : '';

  const prefix = constructPrefix(defaults, display);

  // Apply our styles, with some error checking
  const styledMsg = applyChalkStyles(mNormal, display.messageStyle);
  const styledValue = applyChalkStyles(vNormal, display.valueStyle);

  /**
   * Combine these two with a single space.
   * If one is empty, the space will not be placed
   */
  const msgValueCombo = [styledMsg, styledValue].filter(Boolean).join(' ');

  const notificationString = prefix + msgValueCombo + display.postString + errorNormal;

  if (display.desktop === true) {
    notifier.notify({
      title: display.projectName || defaults.projectName,
      subtitle: stripAnsi(mNormal),
      message: stripAnsi(vNormal || ' ')
    });
  }

  /**
   * Log it out
   */
  return print(notificationString, display.level);
}
