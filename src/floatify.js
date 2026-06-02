// floatify — locale-aware string → float parser.
// Handles dot/comma/space thousands and decimal separators and guesses the
// intended format. Behaviour is covered by the test suite in test/floatify.js.

const floatify = (str, preferDecimalSeparator) => {
  // by default we prefer thousands separators
  const preferThousandsSeparators = preferDecimalSeparator !== true;

  const toFloatFormat = (input, ts, ds) => {
    const decimalSeparator = ds || '';
    let string = input.split(ts || '').join('');
    if (decimalSeparator !== '') {
      string = string.split(decimalSeparator).join('.');
    }
    return parseFloat(string);
  };

  const parseParts = (string, element, count, preferThousands) => {
    const parts = string.split(element);
    // Shared across the loop and the nested parsers (was var-hoisted before).
    let current;
    let left;
    let leftVal;
    let parseResult;

    const parseMidPart = () => {
      if (current.length !== 3) {
        return Number.NaN;
      }
      if (left.length > 3) {
        return Number.NaN;
      }
      // no decision, continue
      return null;
    };

    const parseEndPart = () => {
      if (leftVal === 0 || Number.isNaN(leftVal) || left.length > 3) {
        return toFloatFormat(string, '', element);
      }
      if (current.length === 3) {
        if (preferThousands) {
          return toFloatFormat(string, element, '');
        }
        return toFloatFormat(string, '', element);
      }
      if (count === 1) {
        return toFloatFormat(string, '', element);
      }
      return Number.NaN;
    };

    for (let i = 1; i < parts.length; i += 1) {
      current = parts[i];
      left = parts[i - 1];
      leftVal = parseInt(left, 10);
      const isLast = parts.length - 1 === i;

      parseResult = isLast ? parseEndPart() : parseMidPart();

      if (parseResult !== null) {
        break;
      }
    }
    return parseResult || Number.NaN;
  };

  const parse = (input, preferThousands) => {
    let string = input.trim();

    const dotPos = string.indexOf('.');
    const commaPos = string.indexOf(',');
    const spacePos = string.indexOf(' ');

    if (dotPos + commaPos + spacePos === -3) {
      // life is good, no separators
      return toFloatFormat(string);
    }

    const spaceSplit = string.split(' ');
    const spaceCount = spaceSplit.length - 1;
    const dotCount = string.split('.').length - 1;
    const commaCount = string.split(',').length - 1;

    // format is using dot and comma
    const parseMixedSeparators = () => {
      // order of 1st dot -> comma must match last dot -> comma
      // 123.123.123,123 -> ok | 123.123,123.123 -> not ok
      const lDotPos = string.lastIndexOf('.');
      const lCommaPos = string.lastIndexOf(',');

      if (Math.sign(dotPos - commaPos) !== Math.sign(lDotPos - lCommaPos)) {
        return Number.NaN;
      }

      // check positions to guess the thousands separator
      if (dotPos > commaPos) {
        if (dotCount > 1) {
          return Number.NaN;
        }
        // best guess: . is thousands separator and , is decimal point
        return toFloatFormat(string, ',', '.');
      }

      if (commaCount > 1) {
        return Number.NaN;
      }
      // best guess: , is thousands separator and . is decimal point
      return toFloatFormat(string, '.', ',');
    };

    const parseSingleSeparators = () => {
      if (dotPos !== -1) {
        // only dot(s) in format
        return parseParts(string, '.', dotCount, preferThousands);
      }
      if (commaPos !== -1) {
        // only comma(s) in format
        return parseParts(string, ',', commaCount, preferThousands);
      }
      return toFloatFormat(string);
    };

    const precheckFormat = () => {
      // only a combination of 2 separators is allowed
      if (dotCount > 0 && commaCount > 0 && spaceCount > 0) {
        return false;
      }
      // if any separator occurs more than once, the others must not
      if (dotCount > 1 && (commaCount > 1 || spaceCount > 1)) {
        return false;
      }
      return !(commaCount > 1 && spaceCount > 1);
    };

    if (!precheckFormat()) {
      return Number.NaN;
    }

    if (spaceCount > 0) {
      if (!string.match(/^(\d{1,3})?(\s\d{3})*([,.]\d+)?$/)) {
        return Number.NaN;
      }
      string = spaceSplit.join('');
    }

    if (dotPos !== -1 && commaPos !== -1) {
      return parseMixedSeparators();
    }

    return parseSingleSeparators();
  };

  return parse(str, preferThousandsSeparators);
};

export default floatify;
