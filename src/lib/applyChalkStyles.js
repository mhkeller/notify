/* --------------------------------------------
 * A function that will take a string or list of strings
 * that are chalk styles and apply them to a string
 */
import chalk from 'chalk';

export default function applyChalkStyles (str, styles) {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }
  // Apply our styles
  styles.forEach(style => {
    const s = style.trim();
    if (chalk[s]) {
      str = chalk[s](str);
    } else {
      throw new TypeError(`Invalid chalk style: "${style}"`);
    }
  });

  return str;
}
