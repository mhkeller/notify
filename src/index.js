import notifier from 'node-notifier';
import cS from 'clean-stack';
import stripAnsi from 'strip-ansi';

import notifyDefaults from './defaults.js';

import applyChalkStyles from './lib/applyChalkStyles.js';
import constructPrefix from './lib/constructPrefix.js';
import normalize from './lib/normalize.js';
import print from './lib/print.js';
import getDisplay from './lib/getDisplay.js';
import isObject from './utils/isObject.js';

/**
  Send a notification
  @param {Object} notification Settings
  @param {String} notification.m A description
  @param {String} notification.v A specific value
  @param {String|Array|Object} notification.d The display style. Can be a chalk style name, array of chalk styles, the name of a built-in display, or a full display config
  @param {Object} [notification.error] An optional error object to log out
  @param {Boolean} [notification.k = false] Send a desktop notification
*/
export default function notify (notification, dflts = {}) {
  if (!isObject(notification)) {
    notify({ m: 'Input must be an object', d: 'error' });
  }

  /**
   * Allow extension of defaults, useful for testing
   */
  const defaults = { ...notifyDefaults, ...dflts };

  const { m = '', v = '', d = '', k, error } = notification;

  /**
   * Configure the display object
   */
  const display = getDisplay(defaults, d, k);

  /**
   * Normalize json objects, numbers and falsey values
   */
  const mNormal = normalize(m);
  const vNormal = normalize(v);
  const errorNormal = isObject(error) ? '\n' + cS(error.stack, { pretty: true }) : '';

  const prefix = constructPrefix(defaults, display);

  /**
   * Style messages
   */
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
