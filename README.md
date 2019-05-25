floatify . Common helper to floatify strings
===
[![Build Status](https://travis-ci.org/pocketrocket/floatify.svg?branch=master)](https://travis-ci.org/pocketrocket/floatify)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/pocketrocket/floatify/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/pocketrocket/floatify/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/pocketrocket/floatify/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/pocketrocket/floatify/?branch=master)

# New optional toggle
Since **v1.4.0** you have a 2nd optional parameter to prefer decimal separator instead of thousands separators (old standard, new default behaviour. See [Issue #8](https://github.com/pocketrocket/floatify/issues/8) and test/floatify.js for details)


## BC Break

Since v1.3.0 floatify exports as function!

```js
var floatify = require("floatify")
// old: floatify.floatify("123123.245346556")
// new:
floatify("123123.245346556")
```

## Usage
### Example

```js
var floatify = require("floatify")
floatify("123123.245346556")
>> 123123.245346556
floatify("123.242,5346556")
>> 123242.5346556
floatify("123,242.5346556")
>> 123242.5346556
floatify("123 242 123.7568")
>> 123242123.7568
```

for more detailed examples see Mocha Testcases in `test/floatify.js`

## Installation with npm
### with npm
`npm i floatify`
### with yarn
`yarn add floatify`

## Clone repo
### via ssh
`git clone git@github.com:pocketrocket/floatify`
### via https
`git clone https://github.com/pocketrocket/floatify.git`

## Testing
Basic testing done, use `npm test` or `yarn test`