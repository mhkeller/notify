import { isObject, isBoolean } from 'underscore';

/**
 * If we are passing an object, set the entire display
 * if we are passing a string or an array of strings
 * only set the `messageStyle`
 */
function construct (val) {
  if (isObject(val)) {
    return val;
  }
  return {
    messageStyle: val
  };
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
    if (isBoolean(desktop) === true) {
      result.desktop = desktop;
    }
  }
  return { ...baseDisplay, ...result };
}
