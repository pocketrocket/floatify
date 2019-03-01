'use strict';

var floatify = function floatify(str) {
  var toFloatFormat = function toFloatFormat(str, ts, ds) {
    var string = str;
    var decimalSeparator = ds || '';

    string = string.split(ts || '').join('');
    if (decimalSeparator !== '') {
      string = string.split(decimalSeparator).join('.');
    }

    return parseFloat(string);
  };

  var parseParts = function parseParts(str, ele, count) {
    var string = str;
    var element = ele;
    var parts = string.split(element);

    function parseMidPart() {
      if (current.length !== 3) {
        return Number.NaN;
      }

      if (left.length > 3) {
        return Number.NaN;
      }

      // no decision, continue
      return null;
    }

    function parseEndPart() {
      if ((leftVal === 0 || isNaN(leftVal) || left.length > 3)) {
        return toFloatFormat(string, '', element);
      }

      if (current.length === 3) {
        return toFloatFormat(string, element, '');
      }

      if (count === 1) {
        return toFloatFormat(string, '', element);
      }

      return Number.NaN;
    }

    for (var i = 1; i < parts.length; i++) {
      var current = parts[i];
      var left = parts[i - 1];
      var leftVal = parseInt(left, 10);
      var isLast = parts.length - 1 === i;
      var parseResult;

      if (!isLast) {
        parseResult = parseMidPart();
      } else {
        parseResult = parseEndPart();
      }

      if (parseResult !== null) {
        break;
      }
    }
    return parseResult;
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

    spaceSplit = string.split(' ');
    spaceCount = spaceSplit.length - 1;
    dotCount = string.split('.').length - 1;
    commaCount = string.split(',').length - 1;

    // only combination of 2 separators allowed
    if (dotCount > 0 && commaCount > 0 && spaceCount > 0) {
      return Number.NaN;
    }

    // if there is any separator (space, comma, dot) found more than once,
    // all other must not be found more than once
    if (dotCount > 1 && (commaCount > 1 || spaceCount > 1)) {
      return Number.NaN;
    }

    if (commaCount > 1 && spaceCount > 1) {
      return Number.NaN;
    }

    if (spaceCount > 0) {
      if (!string.match(/^(\d{1,3})?(\s\d{3})*([,\.]\d+)?$/)) {
        return Number.NaN;
      }
      string = spaceSplit.join('');
    }

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
}
