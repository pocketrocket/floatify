'use strict';

var floatify = require('../src/floatify.js');
var assert = require('assert');

const tests = [
  {
    title: 'should work without dot and comma',
    assertions: [
      { input: '-1234567', expectation: -1234567.0 },
      { input: '-123456', expectation: -123456.0 },
      { input: '-12345', expectation: -12345.0 },
      { input: '-1234', expectation: -1234.0 },
      { input: '-123', expectation: -123.0 },
      { input: '-12', expectation: -12.0 },
      { input: '-1', expectation: -1.0 },
      { input: '1', expectation: 1.0 },
      { input: '12', expectation: 12.0 },
      { input: '123', expectation: 123.0 },
      { input: '1234', expectation: 1234.0 },
      { input: '12345', expectation: 12345.0 },
      { input: '123456', expectation: 123456.0 },
      { input: '1234567', expectation: 1234567.0 }
    ]
  },
  {
    title: 'should work with one dot only',
    assertions: [
      { input: '.1', expectation: 0.1 },
      { input: '1.', expectation: 1.0 },
      { input: '.12', expectation: 0.12 },
      { input: '.123', expectation: 0.123 },
      { input: '.1234', expectation: 0.1234 },
      { input: '.12345', expectation: 0.12345 },
      { input: '.123456', expectation: 0.123456 },
      { input: '.1234567', expectation: 0.1234567 },
      { input: '0.1', expectation: 0.1 },
      { input: '0.12', expectation: 0.12 },
      { input: '0.123', expectation: 0.123 },
      { input: '0.1234', expectation: 0.1234 },
      { input: '0.12345', expectation: 0.12345 },
      { input: '0.123456', expectation: 0.123456 },
      { input: '0.1234567', expectation: 0.1234567 },
      { input: '10.1', expectation: 10.1 },
      { input: '10.12', expectation: 10.12 },
      { input: '10.123', expectation: 10123 },
      { input: '10.1234', expectation: 10.1234 },
      { input: '10.12345', expectation: 10.12345 },
      { input: '10.123456', expectation: 10.123456 },
      { input: '10.1234567', expectation: 10.1234567 },
      { input: '210.1', expectation: 210.1 },
      { input: '210.12', expectation: 210.12 },
      { input: '210.123', expectation: 210123 },
      { input: '210.1234', expectation: 210.1234 },
      { input: '210.12345', expectation: 210.12345 },
      { input: '210.123456', expectation: 210.123456 },
      { input: '210.1234567', expectation: 210.1234567 },
      { input: '1.1', expectation: 1.1 },
      { input: '12.1', expectation: 12.1 },
      { input: '123.1', expectation: 123.1 },
      { input: '1234.1', expectation: 1234.1 },
      { input: '12345.1', expectation: 12345.1 },
      { input: '123456.1', expectation: 123456.1 },
      { input: '1234567.1', expectation: 1234567.1 },
      { input: '123456.71', expectation: 123456.71 },
      { input: '12345.671', expectation: 12345.671 },
      { input: '1234.5671', expectation: 1234.5671 },
      { input: '123.45671', expectation: 123.45671 },
      { input: '12.345671', expectation: 12.345671 },
      { input: '1.2345671', expectation: 1.2345671 }
    ]
  },
  {
    title: 'should work with one comma only',
    assertions: [
      { input: ',1', expectation: 0.1 },
      { input: '1,', expectation: 1.0 },
      { input: ',12', expectation: 0.12 },
      { input: ',123', expectation: 0.123 },
      { input: ',1234', expectation: 0.1234 },
      { input: ',12345', expectation: 0.12345 },
      { input: ',123456', expectation: 0.123456 },
      { input: ',1234567', expectation: 0.1234567 },
      { input: '0,1', expectation: 0.1 },
      { input: '0,12', expectation: 0.12 },
      { input: '0,123', expectation: 0.123 },
      { input: '0,1234', expectation: 0.1234 },
      { input: '0,12345', expectation: 0.12345 },
      { input: '0,123456', expectation: 0.123456 },
      { input: '0,1234567', expectation: 0.1234567 },
      { input: '10,1', expectation: 10.1 },
      { input: '10,12', expectation: 10.12 },
      { input: '10,123', expectation: 10123 },
      { input: '10,1234', expectation: 10.1234 },
      { input: '10,12345', expectation: 10.12345 },
      { input: '10,123456', expectation: 10.123456 },
      { input: '10,1234567', expectation: 10.1234567 },
      { input: '210,1', expectation: 210.1 },
      { input: '210,12', expectation: 210.12 },
      { input: '210,123', expectation: 210123 },
      { input: '210,1234', expectation: 210.1234 },
      { input: '210,12345', expectation: 210.12345 },
      { input: '210,123456', expectation: 210.123456 },
      { input: '210,1234567', expectation: 210.1234567 },
      { input: '1,1', expectation: 1.1 },
      { input: '12,1', expectation: 12.1 },
      { input: '123,1', expectation: 123.1 },
      { input: '1234,1', expectation: 1234.1 },
      { input: '12345,1', expectation: 12345.1 },
      { input: '123456,1', expectation: 123456.1 },
      { input: '1234567,1', expectation: 1234567.1 },
      { input: '123456,71', expectation: 123456.71 },
      { input: '12345,671', expectation: 12345.671 },
      { input: '1234,5671', expectation: 1234.5671 },
      { input: '123,45671', expectation: 123.45671 },
      { input: '12,345671', expectation: 12.345671 },
      { input: '1,2345671', expectation: 1.2345671 }
    ]
  },
  {
    title: 'should work with multiple dots as thousands separators',
    assertions: [
      { input: '1.123', expectation: 1123 },
      { input: '12.123', expectation: 12123 },
      { input: '123.123', expectation: 123123 },
      { input: '1.234.567', expectation: 1234567 },
      { input: '1.234.567.890', expectation: 1234567890 },
      { input: '1.234.567.890,', expectation: 1234567890 }
    ]
  },
  {
    title: 'should work with multiple commas as thousands separators',
    assertions: [
      { input: '1,123.0', expectation: 1123 },
      { input: '12,123.0', expectation: 12123 },
      { input: '123,123.0', expectation: 123123 },
      { input: '1,234,567.0', expectation: 1234567 },
      { input: '1,234,567,890.0', expectation: 1234567890 },
      { input: '1,123.1', expectation: 1123.1 },
      { input: '12,123.1', expectation: 12123.1 },
      { input: '123,123.1', expectation: 123123.1 },
      { input: '1,234,567.1', expectation: 1234567.1 },
      { input: '1,234,567,890.1', expectation: 1234567890.1 },
      { input: '1,123.12', expectation: 1123.12 },
      { input: '12,123.12', expectation: 12123.12 },
      { input: '123,123.12', expectation: 123123.12 },
      { input: '1,234,567.12', expectation: 1234567.12 },
      { input: '1,234,567,890.12', expectation: 1234567890.12 },
      { input: '1,123.123', expectation: 1123.123 },
      { input: '12,123.123', expectation: 12123.123 },
      { input: '123,123.123', expectation: 123123.123 },
      { input: '1,234,567.123', expectation: 1234567.123 },
      { input: '1,234,567,890.123', expectation: 1234567890.123 },
      { input: '1,123.1234', expectation: 1123.1234 },
      { input: '12,123.1234', expectation: 12123.1234 },
      { input: '123,123.1234', expectation: 123123.1234 },
      { input: '1,234,567.1234', expectation: 1234567.1234 },
      { input: '1,234,567,890.1234', expectation: 1234567890.1234 },
      { input: '1,234,567,890.', expectation: 1234567890.0 }
    ]
  },
  {
    title: 'should work with space as thousands separators',
    assertions: [
      { input: '1 123', expectation: 1123 },
      { input: '1 123.0', expectation: 1123 },
      { input: '12 123', expectation: 12123 },
      { input: '12 123.0', expectation: 12123 },
      { input: '123 123', expectation: 123123 },
      { input: '123 123.0', expectation: 123123 },
      { input: '1 234 567', expectation: 1234567 },
      { input: '1 234 567.0', expectation: 1234567 },
      { input: '1 234 567 890', expectation: 1234567890 },
      { input: '1 234 567 890.0', expectation: 1234567890 },
      { input: '1 123.1', expectation: 1123.1 },
      { input: '12 123.1', expectation: 12123.1 },
      { input: '123 123.1', expectation: 123123.1 },
      { input: '1 234 567.1', expectation: 1234567.1 },
      { input: '1 234 567 890.1', expectation: 1234567890.1 },
      { input: '1 123.12', expectation: 1123.12 },
      { input: '12 123.12', expectation: 12123.12 },
      { input: '123 123.12', expectation: 123123.12 },
      { input: '1 234 567.12', expectation: 1234567.12 },
      { input: '1 234 567 890.12', expectation: 1234567890.12 },
      { input: '1 123.123', expectation: 1123.123 },
      { input: '12 123.123', expectation: 12123.123 },
      { input: '123 123.123', expectation: 123123.123 },
      { input: '1 234 567.123', expectation: 1234567.123 },
      { input: '1 234 567 890.123', expectation: 1234567890.123 },
      { input: '1 123.1234', expectation: 1123.1234 },
      { input: '12 123.1234', expectation: 12123.1234 },
      { input: '123 123.1234', expectation: 123123.1234 },
      { input: '1 234 567.1234', expectation: 1234567.1234 },
      { input: '1 234 567 890.1234', expectation: 1234567890.1234 },
      { input: '1 123,0', expectation: 1123 },
      { input: '12 123,0', expectation: 12123 },
      { input: '123 123,0', expectation: 123123 },
      { input: '1 234 567,0', expectation: 1234567 },
      { input: '1 234 567 890,0', expectation: 1234567890 },
      { input: '1 123,1', expectation: 1123.1 },
      { input: '12 123,1', expectation: 12123.1 },
      { input: '123 123,1', expectation: 123123.1 },
      { input: '1 234 567,1', expectation: 1234567.1 },
      { input: '1 234 567 890,1', expectation: 1234567890.1 },
      { input: '1 123,12', expectation: 1123.12 },
      { input: '12 123,12', expectation: 12123.12 },
      { input: '123 123,12', expectation: 123123.12 },
      { input: '1 234 567,12', expectation: 1234567.12 },
      { input: '1 234 567 890,12', expectation: 1234567890.12 },
      { input: '1 123,123', expectation: 1123.123 },
      { input: '12 123,123', expectation: 12123.123 },
      { input: '123 123,123', expectation: 123123.123 },
      { input: '1 234 567,123', expectation: 1234567.123 },
      { input: '1 234 567 890,123', expectation: 1234567890.123 },
      { input: '1 123,1234', expectation: 1123.1234 },
      { input: '12 123,1234', expectation: 12123.1234 },
      { input: '123 123,1234', expectation: 123123.1234 },
      { input: '1 234 567,1234', expectation: 1234567.1234 },
      { input: '1 234 567 890,1234', expectation: 1234567890.1234 }
    ]
  },
  {
    title: 'should fail with spaces as thousands separators',
    assertions: [
      { input: '12 12 12', expectation: Number.NaN },
      { input: '12 123 12', expectation: Number.NaN },
      { input: '12 12 123', expectation: Number.NaN },
      { input: '1234 123 123', expectation: Number.NaN },
      { input: '123 1234 123', expectation: Number.NaN },
      { input: '123 123 1234', expectation: Number.NaN }
    ]
  },
  {
    title: 'should work with mixed dots and commas as thousands separators',
    assertions: [
      { input: '1,123.0', expectation: 1123 },
      { input: '12,123.0', expectation: 12123 },
      { input: '123,123.0', expectation: 123123 },
      { input: '1,234,567.0', expectation: 1234567 },
      { input: '1,234,567,890.0', expectation: 1234567890 },
      { input: '1,123.1', expectation: 1123.1 },
      { input: '12,123.1', expectation: 12123.1 },
      { input: '123,123.1', expectation: 123123.1 },
      { input: '1,234,567.1', expectation: 1234567.1 },
      { input: '1,234,567,890.1', expectation: 1234567890.1 },
      { input: '1,123.12', expectation: 1123.12 },
      { input: '12,123.12', expectation: 12123.12 },
      { input: '123,123.12', expectation: 123123.12 },
      { input: '1,234,567.12', expectation: 1234567.12 },
      { input: '1,234,567,890.12', expectation: 1234567890.12 },
      { input: '1,123.123', expectation: 1123.123 },
      { input: '12,123.123', expectation: 12123.123 },
      { input: '123,123.123', expectation: 123123.123 },
      { input: '1,234,567.123', expectation: 1234567.123 },
      { input: '1,234,567,890.123', expectation: 1234567890.123 },
      { input: '1,123.1234', expectation: 1123.1234 },
      { input: '12,123.1234', expectation: 12123.1234 },
      { input: '123,123.1234', expectation: 123123.1234 },
      { input: '1,234,567.1234', expectation: 1234567.1234 },
      { input: '1,234,567,890.1234', expectation: 1234567890.1234 }
    ]
  },
  {
    title: 'should prefer thousands separators',
    assertions: [
      { input: '123.123', expectation: 123123 },
      { input: '123,123', expectation: 123123 }
    ]
  },
  {
    title: 'should optionally prefer decimal separators',
    assertions: [
      {
        input: '123.123',
        options: {preferDecimalSeparator: true},
        expectation: 123.123
      },
      {
        input: '123,123',
        options: {preferDecimalSeparator: true},
        expectation: 123.123
      },
    ]
  },
  {
    title: 'should work with mixed commas and dots as thousands separators',
    assertions: [
      { input: '1.123,0', expectation: 1123 },
      { input: '12.123,0', expectation: 12123 },
      { input: '123.123,0', expectation: 123123 },
      { input: '1.234.567,0', expectation: 1234567 },
      { input: '1.234.567.890,0', expectation: 1234567890 },
  
      { input: '1,123.0', expectation: 1123 },
      { input: '12,123.0', expectation: 12123 },
      { input: '123,123.0', expectation: 123123 },
      { input: '1,234,567.0', expectation: 1234567 },
      { input: '1,234,567,890.0', expectation: 1234567890 }
    ]
  },
  {
    title: 'should return NaN for all wrong formats',
    assertions: [
      { input: '.', expectation: Number.NaN },
      { input: '..', expectation: Number.NaN },
      { input: '...', expectation: Number.NaN },
      { input: '1.1234.1', expectation: Number.NaN },
      { input: '123.123.1234', expectation: Number.NaN },
      { input: '123.1234.123', expectation: Number.NaN },
      { input: '1234.123.123', expectation: Number.NaN },
      { input: '1.2.3', expectation: Number.NaN },
  
      { input: ',', expectation: Number.NaN },
      { input: ',,', expectation: Number.NaN },
      { input: ',,,', expectation: Number.NaN },
      { input: '1,1234,1', expectation: Number.NaN },
      { input: '123,123,1234', expectation: Number.NaN },
      { input: '123,1234,123', expectation: Number.NaN },
      { input: '1234,123,123', expectation: Number.NaN },
      { input: '1,2,3', expectation: Number.NaN },
  
      { input: ' ', expectation: Number.NaN },
      { input: '  ', expectation: Number.NaN },
      { input: '   ', expectation: Number.NaN },
      { input: '1 1 123', expectation: Number.NaN },
      { input: '1 123 1', expectation: Number.NaN },
      { input: '123 1 1', expectation: Number.NaN },
      { input: '123 123 1234', expectation: Number.NaN },
      { input: '123 1234 123', expectation: Number.NaN },
      { input: '1234 123 123', expectation: Number.NaN },
      { input: '1 2 3', expectation: Number.NaN },
      { input: '123 123,123 123', expectation: Number.NaN },
      { input: '123 123.123 123', expectation: Number.NaN },
  
      { input: '123.123,123.123,123', expectation: Number.NaN },
      { input: '123.123,123.123.123', expectation: Number.NaN },
      { input: '123,123.123,123.123', expectation: Number.NaN },
      { input: '123,123.123,123,123', expectation: Number.NaN },
  
      { input: '..,-', expectation: Number.NaN },
      { input: 'seven', expectation: Number.NaN },
  
      { input: '123 123,123.12', expectation: Number.NaN },
      { input: '123,123,123.123.2', expectation: Number.NaN },
      { input: '123 123 123.123.2', expectation: Number.NaN },
      { input: '123 123 123,123,2', expectation: Number.NaN },
      { input: '123 123 123,123 2', expectation: Number.NaN },
      { input: '123 123 123.123 2', expectation: Number.NaN },
      { input: '123,123.123,123', expectation: Number.NaN },
      { input: '123.123,123,123', expectation: Number.NaN },
      { input: '123,123.123.123', expectation: Number.NaN },
      { input: '12.12.12', expectation: Number.NaN },
      { input: '12,12,12', expectation: Number.NaN },
      { input: '12.12.123', expectation: Number.NaN },
      { input: '12,12,123', expectation: Number.NaN },
      { input: '12.123.12', expectation: Number.NaN },
      { input: '12,123,12', expectation: Number.NaN },
      { input: '123.12.12', expectation: Number.NaN },
      { input: '123,12,12', expectation: Number.NaN }
    ]
  }
];

tests.forEach((test) => {
  describe(test.title, () => {
    test.assertions.forEach((assertion) => {
      it(`${assertion.input} gives ${assertion.expectation}`, () => {
        if (Number.isNaN(assertion.expectation)) {
          assert.strictEqual(
            isNaN(floatify(assertion.input)),
            true
          );
          return;
        }

        assert.equal(
          floatify(assertion.input, assertion.options && assertion.options.preferDecimalSeparator),
          assertion.expectation
        );
      });
    });
  });
});
