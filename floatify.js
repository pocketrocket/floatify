"use strict";

var floatify = function(str) {
    var toFloatFormat = function(str, ts, ds) {
        ts = ts || '';
        ds = ds || '';
        
        ds = '.' === ds ? '\\.' : ds;
        ts = '.' === ts ? '\\.' : ts;

        str = ts !== '' ? str.replace(new RegExp(ts, 'g'), '') : str;
        str = ds !== '' ? str.replace(new RegExp(ds, 'g'), '.') : str;

        return parseFloat(str);
    };

    var parseParts = function(str, ele, count) {
        var parts = str.split(ele);
        for (var i = 1; i < parts.length; i++) {
            var left = parseInt(parts[i-1]);

            if (0 === parts[i].length) {
                return NaN;
            } else if (3 === parts[i].length) {
                if (3 < parts[i-1].length && parts.length-1 !== i) {
                    return NaN;
                }

                if (
                    (0 === left || isNaN(left) || 3 < parts[i-1].length)
                    && parts.length-1 === i
                ) {
                    return toFloatFormat(str, '', ele);
                }
            } else if (i < parts.length-1) {
                //violation in midPart -> NaN
                return NaN;
            } else {
                //violation in end -> Could be decimalSeparator
                if (1 === count) {
                    return toFloatFormat(str, '', ele);
                }
                return NaN;
            }
        }

        return toFloatFormat(str, ele, '');
    };

    var parse = function (str) {
        var dotPos, commaPos, lDotPos, lCommaPos, dotCount, commaCount;
        str = str.trim();

        // 1st dot position
        dotPos = str.indexOf('.');
        // 1st comma position
        commaPos = str.indexOf(',');

        if (-2 === dotPos + commaPos) {
            // life is good, no separators
            return toFloatFormat(str);
        }

        // dot count
        dotCount = str.split('.').length - 1;
        // comma count
        commaCount = str.split(',').length - 1;

        if (-1 !== dotPos && -1 !== commaPos) {
            // format is using dot and comma

            // last dot position
            lDotPos = str.lastIndexOf('.');
            // last comma position
            lCommaPos = str.lastIndexOf(',');

            // order of 1st dot -> comma must be same as last dot -> comma
            // 123.123.123,123 -> ok 123.123,123.123 -> not ok
            if (Math.sign(dotPos - commaPos) != Math.sign(lDotPos - lCommaPos)) {
                return NaN;
            }

            // check positions to guess the thousands separator
            if (dotPos > commaPos && 1 === dotCount) {
                // best guess: . is thousands separator and , is decimal point
                return toFloatFormat(str, ',', '.');
            }

            if (commaPos > dotPos && 1 === commaCount) {
                // best guess: , is thousands separator and . is decimal point
                return toFloatFormat(str, '.', ',');
            }

            return NaN;
        }

        if (-1 !== dotPos) {
            // only dot(s) in format
            return parseParts(str, '.', dotCount);
        }

        if (-1 !== commaPos) {
            // only comma(s) in format
            return parseParts(str, ',', commaCount);
        }
    };

    return parse(str);
};

if ('undefined' !== typeof exports) {
    if ('undefined' !== typeof module && module.exports) {
        exports = module.exports = floatify
    }
    exports.floatify = floatify
}