import isObject from '../utils/isObject.js';

/**
 * If we are passing an object, set the entire display
 * if we are passing a string or an array of strings
 * only set the `messageStyle`
 */
function construct (val) {
  if (isObject(val)) {
    return val;
  }
  if (val) {
    return {
      messageStyle: val
    };
  }
  return {};
}

export default function getDisplay ({ baseDisplay, displays }, display, desktop) {
  let result;
  /**
   * Set the display if this is a display name
   * Otherwise set the display settings
   */
  if (displays[display]) {
    result = construct(displays[display]);
  } else {
    result = construct(display);
  }
  if (typeof desktop === 'boolean') {
    result.desktop = desktop;
  }
  return { ...baseDisplay, ...result };
}
