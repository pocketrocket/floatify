# floatify

> Common helper to floatify strings — locale-aware string → float parsing.

`floatify` turns a numeric string into a `Number`, automatically guessing the
thousands and decimal separators (`.`, `,` or space) regardless of locale.
It returns `NaN` for ambiguous or invalid input.

## Installation

```sh
npm i floatify
```

## Usage

`floatify` is an **ES module** that exports a single function as the default export:

```js
import floatify from "floatify";

floatify("123123.245346556");
//=> 123123.245346556

floatify("123.242,5346556");
//=> 123242.5346556

floatify("123,242.5346556");
//=> 123242.5346556

floatify("123 242 123.7568");
//=> 123242123.7568
```

### Prefer decimal over thousands separator

By default an ambiguous single separator is treated as a **thousands**
separator. Pass `true` as the second argument to prefer a **decimal** point:

```js
floatify("123.123");        //=> 123123   (thousands, default)
floatify("123.123", true);  //=> 123.123  (decimal)
```

See `test/floatify.js` for the full set of supported formats.

## Requirements

- **Node.js ≥ 18** (pure ESM, no transpiler required).

## Breaking changes

### v2.0.0
- **ESM-only.** `floatify` is now a native ES module (`export default`).
  Import it with `import floatify from "floatify"` — `require()` is no longer
  supported (use Node ≥ 22.12 `require(esm)` if you must consume it from CJS).
- Modernised to ES6+ and migrated to the built-in Node test runner; no runtime
  dependencies.

### v1.3.0
- `floatify` exports the function directly: call `floatify(str)` instead of
  `floatify.floatify(str)`.

## Development

```sh
npm test     # node --test
npm run lint # eslint
```

## License

[MIT](LICENSE)
