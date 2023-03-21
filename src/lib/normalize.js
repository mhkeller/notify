/* --------------------------------------------
 * Normalize what we pass as the message and value strings
 */
export default function normalize (val) {
  // Simple stringify numbers
  if (typeof val === 'number') {
    return String(val);
  // Pretty print objects (arrays, dates, dictionaries, errors) and booleans
  } else if (typeof val === 'object' || typeof val === 'boolean') {
    return JSON.stringify(val);
  } else {
    return val;
  }
}
