/* --------------------------------------------
 *
 * Pretty-print milliseconds into their most-sensible units, up to the minute
 * Rules:
 *  Up to milliseconds, they are displayed in full
 *  Up to seconds, they are displayed up to two decimal places
 *  Up to minutes, displayed with seconds, rounded to nearest second if milliseconds
 *  Up to hours, displayed with minutes and seconds rounded up to nearest second if milliseconds.
 *  Round up so you don't get something like `1h 0s`.
 *
 * See tests for examples.
 * --------------------------------------------
 */

// Remove trailing zeros
function truncate (val, to) {
  const str = val.toFixed(to);
  return str.replace(/0$/, '');
}

export default function formatTime (milliseconds) {
  const oneHour = 3600000;
  const oneMinute = 60000;
  const oneSecond = 1000;
  const seconds = 0;
  const minutes = 0;
  const hours = 0;
  const result = '';
  if (milliseconds === 0) {
    return '0ms';
  }

  if (milliseconds >= oneHour) {
    hours = Math.floor(milliseconds / oneHour);
  }

  milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

  if (milliseconds >= oneMinute) {
    minutes = Math.floor(milliseconds / oneMinute);
  }

  milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

  if (milliseconds >= oneSecond) {
    seconds = Math.floor(milliseconds / oneSecond);
  }

  milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

  if (hours) {
    result += hours + 'h ';
  }
  if (minutes) {
    result += minutes + 'm';
    if (seconds) {
      result += (' ' + seconds + 's');
    }
  } else if (seconds && !milliseconds) {
    result += seconds + 's';
  } else if (hours && seconds && milliseconds) {
    result += Math.round(seconds + milliseconds / 1000) + 's';
  } else if (seconds && milliseconds) {
    result += truncate(seconds + (Math.round((milliseconds / 1000) * 100) / 100), 2) + 's';
  } else if (hours && !seconds && milliseconds) {
    result += Math.ceil(milliseconds / 1000) + 's';
  } else if (milliseconds) {
    result += (Math.round(milliseconds * 10) / 10) + 'ms';
  }

  return result;
};
