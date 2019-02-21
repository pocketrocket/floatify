"use strict";

var test = require('../floatify.js');
var assert = require('assert');

describe('testing valid number formats', function() {
    it('should work without dot and comma', function (done) {
        assert.equal(test.floatify('-1234567'), -1234567.0);
        assert.equal(test.floatify('-123456'), -123456.0);
        assert.equal(test.floatify('-12345'), -12345.0);
        assert.equal(test.floatify('-1234'), -1234.0);
        assert.equal(test.floatify('-123'), -123.0);
        assert.equal(test.floatify('-12'), -12.0);
        assert.equal(test.floatify('-1'), -1.0);
        assert.equal(test.floatify('1'), 1.0);
        assert.equal(test.floatify('12'), 12.0);
        assert.equal(test.floatify('123'), 123.0);
        assert.equal(test.floatify('1234'), 1234.0);
        assert.equal(test.floatify('12345'), 12345.0);
        assert.equal(test.floatify('123456'), 123456.0);
        assert.equal(test.floatify('1234567'), 1234567.0);
        done();
    });

    it('should work with one dot only', function (done) {
        assert.equal(test.floatify('.1'), .1);
        assert.equal(test.floatify('.12'), .12);
        assert.equal(test.floatify('.123'), .123);
        assert.equal(test.floatify('.1234'), .1234);
        assert.equal(test.floatify('.12345'), .12345);
        assert.equal(test.floatify('.123456'), .123456);
        assert.equal(test.floatify('.1234567'), .1234567);
        assert.equal(test.floatify('0.1'), .1);
        assert.equal(test.floatify('0.12'), .12);
        assert.equal(test.floatify('0.123'), .123);
        assert.equal(test.floatify('0.1234'), .1234);
        assert.equal(test.floatify('0.12345'), .12345);
        assert.equal(test.floatify('0.123456'), .123456);
        assert.equal(test.floatify('0.1234567'), .1234567);
        assert.equal(test.floatify('10.1'), 10.1);
        assert.equal(test.floatify('10.12'), 10.12);
        assert.equal(test.floatify('10.123'), 10123);
        assert.equal(test.floatify('10.1234'), 10.1234);
        assert.equal(test.floatify('10.12345'), 10.12345);
        assert.equal(test.floatify('10.123456'), 10.123456);
        assert.equal(test.floatify('10.1234567'), 10.1234567);
        assert.equal(test.floatify('210.1'), 210.1);
        assert.equal(test.floatify('210.12'), 210.12);
        assert.equal(test.floatify('210.123'), 210123);
        assert.equal(test.floatify('210.1234'), 210.1234);
        assert.equal(test.floatify('210.12345'), 210.12345);
        assert.equal(test.floatify('210.123456'), 210.123456);
        assert.equal(test.floatify('210.1234567'), 210.1234567);
        assert.equal(test.floatify('1.1'), 1.1);
        assert.equal(test.floatify('12.1'), 12.1);
        assert.equal(test.floatify('123.1'), 123.1);
        assert.equal(test.floatify('1234.1'), 1234.1);
        assert.equal(test.floatify('12345.1'), 12345.1);
        assert.equal(test.floatify('123456.1'), 123456.1);
        assert.equal(test.floatify('1234567.1'), 1234567.1);
        assert.equal(test.floatify('123456.71'), 123456.71);
        assert.equal(test.floatify('12345.671'), 12345.671);
        assert.equal(test.floatify('1234.5671'), 1234.5671);
        assert.equal(test.floatify('123.45671'), 123.45671);
        assert.equal(test.floatify('12.345671'), 12.345671);
        assert.equal(test.floatify('1.2345671'), 1.2345671);
        done();
    });

    it('should work with one comma only', function (done) {
        assert.equal(test.floatify(',1'), .1);
        assert.equal(test.floatify(',12'), .12);
        assert.equal(test.floatify(',123'), .123);
        assert.equal(test.floatify(',1234'), .1234);
        assert.equal(test.floatify(',12345'), .12345);
        assert.equal(test.floatify(',123456'), .123456);
        assert.equal(test.floatify(',1234567'), .1234567);
        assert.equal(test.floatify('0,1'), .1);
        assert.equal(test.floatify('0,12'), .12);
        assert.equal(test.floatify('0,123'), .123);
        assert.equal(test.floatify('0,1234'), .1234);
        assert.equal(test.floatify('0,12345'), .12345);
        assert.equal(test.floatify('0,123456'), .123456);
        assert.equal(test.floatify('0,1234567'), .1234567);
        assert.equal(test.floatify('10,1'), 10.1);
        assert.equal(test.floatify('10,12'), 10.12);
        assert.equal(test.floatify('10,123'), 10123);
        assert.equal(test.floatify('10,1234'), 10.1234);
        assert.equal(test.floatify('10,12345'), 10.12345);
        assert.equal(test.floatify('10,123456'), 10.123456);
        assert.equal(test.floatify('10,1234567'), 10.1234567);
        assert.equal(test.floatify('210,1'), 210.1);
        assert.equal(test.floatify('210,12'), 210.12);
        assert.equal(test.floatify('210,123'), 210123);
        assert.equal(test.floatify('210,1234'), 210.1234);
        assert.equal(test.floatify('210,12345'), 210.12345);
        assert.equal(test.floatify('210,123456'), 210.123456);
        assert.equal(test.floatify('210,1234567'), 210.1234567);
        assert.equal(test.floatify('1,1'), 1.1);
        assert.equal(test.floatify('12,1'), 12.1);
        assert.equal(test.floatify('123,1'), 123.1);
        assert.equal(test.floatify('1234,1'), 1234.1);
        assert.equal(test.floatify('12345,1'), 12345.1);
        assert.equal(test.floatify('123456,1'), 123456.1);
        assert.equal(test.floatify('1234567,1'), 1234567.1);
        assert.equal(test.floatify('123456,71'), 123456.71);
        assert.equal(test.floatify('12345,671'), 12345.671);
        assert.equal(test.floatify('1234,5671'), 1234.5671);
        assert.equal(test.floatify('123,45671'), 123.45671);
        assert.equal(test.floatify('12,345671'), 12.345671);
        assert.equal(test.floatify('1,2345671'), 1.2345671);
        done();
    });

    it('should work with multiple dots as thousands separators', function (done) {
        assert.equal(test.floatify('1.123'), 1123);
        assert.equal(test.floatify('12.123'), 12123);
        assert.equal(test.floatify('123.123'), 123123);
        assert.equal(test.floatify('1.234.567'), 1234567);
        assert.equal(test.floatify('1.234.567.890'), 1234567890);
        done();
    });

    it('should work with multiple commas as thousands separators', function (done) {
        assert.equal(test.floatify('1,123.0'), 1123);
        assert.equal(test.floatify('12,123.0'), 12123);
        assert.equal(test.floatify('123,123.0'), 123123);
        assert.equal(test.floatify('1,234,567.0'), 1234567);
        assert.equal(test.floatify('1,234,567,890.0'), 1234567890);
        assert.equal(test.floatify('1,123.1'), 1123.1);
        assert.equal(test.floatify('12,123.1'), 12123.1);
        assert.equal(test.floatify('123,123.1'), 123123.1);
        assert.equal(test.floatify('1,234,567.1'), 1234567.1);
        assert.equal(test.floatify('1,234,567,890.1'), 1234567890.1);
        assert.equal(test.floatify('1,123.12'), 1123.12);
        assert.equal(test.floatify('12,123.12'), 12123.12);
        assert.equal(test.floatify('123,123.12'), 123123.12);
        assert.equal(test.floatify('1,234,567.12'), 1234567.12);
        assert.equal(test.floatify('1,234,567,890.12'), 1234567890.12);
        assert.equal(test.floatify('1,123.123'), 1123.123);
        assert.equal(test.floatify('12,123.123'), 12123.123);
        assert.equal(test.floatify('123,123.123'), 123123.123);
        assert.equal(test.floatify('1,234,567.123'), 1234567.123);
        assert.equal(test.floatify('1,234,567,890.123'), 1234567890.123);
        assert.equal(test.floatify('1,123.1234'), 1123.1234);
        assert.equal(test.floatify('12,123.1234'), 12123.1234);
        assert.equal(test.floatify('123,123.1234'), 123123.1234);
        assert.equal(test.floatify('1,234,567.1234'), 1234567.1234);
        assert.equal(test.floatify('1,234,567,890.1234'), 1234567890.1234);
        done();
    });

    it('should work with mixed dots and commas as thousands separators', function (done) {
        assert.equal(test.floatify('1,123.0'), 1123);
        assert.equal(test.floatify('12,123.0'), 12123);
        assert.equal(test.floatify('123,123.0'), 123123);
        assert.equal(test.floatify('1,234,567.0'), 1234567);
        assert.equal(test.floatify('1,234,567,890.0'), 1234567890);
        assert.equal(test.floatify('1,123.1'), 1123.1);
        assert.equal(test.floatify('12,123.1'), 12123.1);
        assert.equal(test.floatify('123,123.1'), 123123.1);
        assert.equal(test.floatify('1,234,567.1'), 1234567.1);
        assert.equal(test.floatify('1,234,567,890.1'), 1234567890.1);
        assert.equal(test.floatify('1,123.12'), 1123.12);
        assert.equal(test.floatify('12,123.12'), 12123.12);
        assert.equal(test.floatify('123,123.12'), 123123.12);
        assert.equal(test.floatify('1,234,567.12'), 1234567.12);
        assert.equal(test.floatify('1,234,567,890.12'), 1234567890.12);
        assert.equal(test.floatify('1,123.123'), 1123.123);
        assert.equal(test.floatify('12,123.123'), 12123.123);
        assert.equal(test.floatify('123,123.123'), 123123.123);
        assert.equal(test.floatify('1,234,567.123'), 1234567.123);
        assert.equal(test.floatify('1,234,567,890.123'), 1234567890.123);
        assert.equal(test.floatify('1,123.1234'), 1123.1234);
        assert.equal(test.floatify('12,123.1234'), 12123.1234);
        assert.equal(test.floatify('123,123.1234'), 123123.1234);
        assert.equal(test.floatify('1,234,567.1234'), 1234567.1234);
        assert.equal(test.floatify('1,234,567,890.1234'), 1234567890.1234);
        done();
    });
    
    it('should prefer thousands separators', function (done) {
        assert.equal(test.floatify('123.123'), 123123);
        assert.equal(test.floatify('123,123'), 123123);
        done();
    });

    it('should work with mixed commas and dots as thousands separators', function (done) {
        assert.equal(test.floatify('1.123,0'), 1123);
        assert.equal(test.floatify('12.123,0'), 12123);
        assert.equal(test.floatify('123.123,0'), 123123);
        assert.equal(test.floatify('1.234.567,0'), 1234567);
        assert.equal(test.floatify('1.234.567.890,0'), 1234567890);
        done();
    });
});

describe('testing invalid number formats', function() {
    it('should return NaN for all wrong formats', function(done){
        assert.equal(isNaN(test.floatify('.')), true);
        assert.equal(isNaN(test.floatify('..')), true);
        assert.equal(isNaN(test.floatify('...')), true);
        assert.equal(isNaN(test.floatify('1.')), true);
        assert.equal(isNaN(test.floatify('1.1234.1')), true);
        assert.equal(isNaN(test.floatify('123.123.1234')), true);
        assert.equal(isNaN(test.floatify('123.1234.123')), true);
        assert.equal(isNaN(test.floatify('1234.123.123')), true);
        assert.equal(isNaN(test.floatify('1.2.3')), true);

        assert.equal(isNaN(test.floatify(',')), true);
        assert.equal(isNaN(test.floatify(',,')), true);
        assert.equal(isNaN(test.floatify(',,,')), true);
        assert.equal(isNaN(test.floatify('1,')), true);
        assert.equal(isNaN(test.floatify('1,1234,1')), true);
        assert.equal(isNaN(test.floatify('123,123,1234')), true);
        assert.equal(isNaN(test.floatify('123,1234,123')), true);
        assert.equal(isNaN(test.floatify('1234,123,123')), true);
        assert.equal(isNaN(test.floatify('1,2,3')), true);

        assert.equal(isNaN(test.floatify('123.123,123.123,123')), true);
        assert.equal(isNaN(test.floatify('123.123,123.123.123')), true);
        assert.equal(isNaN(test.floatify('123.123,123.123')), true);
        assert.equal(isNaN(test.floatify('123,123.123,123')), true);
        assert.equal(isNaN(test.floatify('123,123.123,123.123')), true);
        assert.equal(isNaN(test.floatify('123,123.123,123,123')), true);

        assert.equal(isNaN(test.floatify('..,-')), true);
        assert.equal(isNaN(test.floatify('seven')), true);

        assert.equal(isNaN(test.floatify('12.12.12')), true);
        assert.equal(isNaN(test.floatify('12,12,12')), true);
        assert.equal(isNaN(test.floatify('12.12.123')), true);
        assert.equal(isNaN(test.floatify('12,12,123')), true);
        assert.equal(isNaN(test.floatify('12.123.12')), true);
        assert.equal(isNaN(test.floatify('12,123,12')), true);
        assert.equal(isNaN(test.floatify('123.12.12')), true);
        assert.equal(isNaN(test.floatify('123,12,12')), true);
        done();
    });

});