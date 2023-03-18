/* --------------------------------------------
 * Normalize what we pass as the message and value strings
 */
import { isNumber, isBoolean } from 'underscore';

export default function normalize (val) {
  // Simple stringify numbers
  if (isNumber(val)) {
    return String(val);
  // Pretty print objects (arrays, dates, dictionaries, errors) and booleans
  } else if (typeof val === 'object' || isBoolean(val)) {
    return JSON.stringify(val);
  } else {
    return val;
  }
}
