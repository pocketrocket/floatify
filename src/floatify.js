module.exports = class floatify {
  toFloatFormat({ string, thousandsSeperator = '', decimalSeperator = '' }) {
    let returnString = string;

    if (!!thousandsSeperator) {
      returnString = returnString.replace(new RegExp(this.escapeForRegExp(thousandsSeperator), 'g'), '');
    }

    if (!!decimalSeperator) {
      returnString = returnString.replace(new RegExp(this.escapeForRegExp(decimalSeperator), 'g'), '.');
    }

    return parseFloat(returnString);
  }

  escapeForRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  parseParts({ string, element, count }) {
    const parts = string.split(element);

    for (let i = 1; i < parts.length; i++) {
      const left = {
        index: i - 1,
        value: parts[i - 1],
        parsed: parseInt(parts[i - 1], 10)
      };

      const part = parts[i];

      if (part.length === 0) {
        return Number.NaN;
      } else if (part.length === 3) {
        if (left.value.length > 3 && parts.length - 1 !== i) {
          return Number.NaN;
        } else if (
          (left.parsed === 0 || isNaN(left.parsed) || left.value.length > 3)
          && parts.length - 1 === i
        ) {
          return this.toFloatFormat({ string, thousandsSeperator: '', decimalSeperator: element });
        }
      } else if (i < parts.length - 1) {
        // violation in midPart -> NaN
        return Number.NaN;
      } else {
        // violation in end -> Could be decimalSeparator
        if (count === 1) {
          return this.toFloatFormat({ string, thousandsSeperator: '', decimalSeperator: element });
        }
        return Number.NaN;
      }
    }

    return this.toFloatFormat({ string, thousandsSeperator: element, decimalSeperator: '' });
  }

  parse(input) {
    let string = input.trim();

    const hasSpace = string.includes(' ');
    const spaceSplit = string.split(' ');
    const spaceCount = spaceSplit.length - 1;

    const hasDot = string.includes('.');
    const dotPos = string.indexOf('.');
    const dotCount = string.split('.').length - 1;
    let lDotPos;

    const hasComma = string.includes(',');
    const commaPos = string.indexOf(',');
    const commaCount = string.split(',').length - 1;
    let lCommaPos;


    if (hasDot ||  hasComma || hasSpace) {
      if (spaceCount > 0) {
        const first = spaceSplit.shift();
        const last = spaceSplit.pop();

        if (!string.match(/^(\d{1,3})?(\s\d{3})*([,\.]\d+)?$/)) {
          return Number.NaN;
        }

        spaceSplit.unshift(first);
        spaceSplit.push(last);

        string = spaceSplit.join('');
      }

      if (hasDot && hasComma) {
      // format is using dot and comma

        // last dot position
        lDotPos = string.lastIndexOf('.');
        // last comma position
        lCommaPos = string.lastIndexOf(',');

        // order of 1st dot -> comma must be same as last dot -> comma
        // 123.123.123,123 -> ok 123.123,123.123 -> not ok
        if (Math.sign(dotPos - commaPos) !== Math.sign(lDotPos - lCommaPos)) {
          return Number.NaN;
        }

        // check positions to guess the thousands separator
        if (dotPos > commaPos && dotCount === 1) {
        // best guess: . is thousands separator and , is decimal point
          return this.toFloatFormat({ string, thousandsSeperator: ',', decimalSeperator: '.' });
        }

        if (commaPos > dotPos && commaCount === 1) {
        // best guess: , is thousands separator and . is decimal point
          return this.toFloatFormat({ string, thousandsSeperator: '.', decimalSeperator: ',' });
        }

        return Number.NaN;
      } else if (hasDot) {
      // only dot(s) in format
        return this.parseParts({ string, element: '.', count: dotCount });
      } else if (hasComma) {
      // only comma(s) in format
        return this.parseParts({ string, element: ',', count: commaCount });
      }
    }

    return this.toFloatFormat({ string });
  }
};
