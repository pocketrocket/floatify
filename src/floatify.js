'use strict';

var floatify = function floatify(str) {
  var toFloatFormat = function toFloatFormat(str, ts, ds) {
    var string = str;
    var thousandsSeparator = ts || '';
    var decimalSeparator = ds || '';

    thousandsSeparator = thousandsSeparator === '.' ? '\\.' : thousandsSeparator;
    decimalSeparator = decimalSeparator === '.' ? '\\.' : decimalSeparator;

    string = thousandsSeparator !== '' ? string.replace(new RegExp(thousandsSeparator, 'g'), '') : string;
    string = decimalSeparator !== '' ? string.replace(new RegExp(decimalSeparator, 'g'), '.') : string;

    return parseFloat(string);
  };

  var parseParts = function parseParts(str, ele, count) {
    var string = str;
    var element = ele;
    var parts = string.split(element);
    for (var i = 1; i < parts.length; i++) {
      var left = parseInt(parts[i - 1], 10);

      if (parts[i].length === 0) {
        return Number.NaN;
      } else if (parts[i].length === 3) {
        if (parts[i - 1].length > 3 && parts.length - 1 !== i) {
          return Number.NaN;
        }

        if (
          (left === 0 || isNaN(left) || parts[i - 1].length > 3)
          && parts.length - 1 === i
        ) {
          return toFloatFormat(string, '', element);
        }
      } else if (i < parts.length - 1) {
        // violation in midPart -> NaN
        return Number.NaN;
      } else {
        // violation in end -> Could be decimalSeparator
        if (count === 1) {
          return toFloatFormat(string, '', element);
        }
        return Number.NaN;
      }
    }

    return toFloatFormat(string, element, '');
  };

  var parse = function parse(str) {
    var string = str;
    var spacePos;
    var spaceSplit;
    var spaceCount;
    var dotPos;
    var commaPos;
    var lDotPos;
    var lCommaPos;
    var dotCount;
    var commaCount;

    string = string.trim();

    // 1st dot position
    dotPos = string.indexOf('.');
    // 1st comma position
    commaPos = string.indexOf(',');
    // 1st space position
    spacePos = string.indexOf(' ');

    if (dotPos + commaPos + spacePos === -3) {
      // life is good, no separators
      return toFloatFormat(string);
    }

    // space count
    spaceSplit = string.split(' ');
    spaceCount = spaceSplit.length - 1;

    if (spaceCount > 0) {
      var first = spaceSplit.shift();
      var last = spaceSplit.pop();

      if (!string.match(/^(\d{1,3})?(\s\d{3})*([,\.]\d+)?$/)) {
        return Number.NaN;
      }

      spaceSplit.unshift(first);
      spaceSplit.push(last);

      string = spaceSplit.join('');
    }

    // dot count
    dotCount = string.split('.').length - 1;
    // comma count
    commaCount = string.split(',').length - 1;

    if (dotPos !== -1 && commaPos !== -1) {
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
        return toFloatFormat(string, ',', '.');
      }

      if (commaPos > dotPos && commaCount === 1) {
        // best guess: , is thousands separator and . is decimal point
        return toFloatFormat(string, '.', ',');
      }

      return Number.NaN;
    }

    if (dotPos !== -1) {
      // only dot(s) in format
      return parseParts(string, '.', dotCount);
    }

    if (commaPos !== -1) {
      // only comma(s) in format
      return parseParts(string, ',', commaCount);
    }

    return toFloatFormat(string);
  };

  return parse(str);
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = floatify;
  }
  exports.floatify = floatify;
}
