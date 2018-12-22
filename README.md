# duratiform

Utility to separate into parts and to format time duration in milliseconds.

[![NPM version](https://badge.fury.io/js/duratiform.png)](http://badge.fury.io/js/duratiform)
[![Build Status](https://travis-ci.org/gamtiq/duratiform.png)](https://travis-ci.org/gamtiq/duratiform)

## Installation

### Node

    npm install duratiform

### [Bower](http://bower.io)

    bower install duratiform

### AMD, &lt;script&gt;

Use `dist/duratiform.js` or `dist/duratiform.min.js` (minified version).

## Usage

### Node

```js
var duratiform = require("duratiform");
```

### AMD

```js
define(["path/to/dist/duratiform.js"], function(duratiform) {
    ...
});
```

### Bower, &lt;script&gt;

```html
<!-- Use bower_components/duratiform/dist/duratiform.js if the library was installed by Bower -->
<script type="text/javascript" src="path/to/dist/duratiform.js"></script>
<script type="text/javascript">
    // duratiform is available via duratiform field of window object
    ...
</script>
```

### Example

```js
var nDuration = 123456789000;
console.log("Duration parts: ", duratiform.divide(nDuration, 4));   // { day: 1428, hour: 21, minute: 33, second: 9 }
console.log(nDuration, " - ", duratiform.format(nDuration, "d [days] h [hours] m [minutes] s [seconds]"));   // 1428 days 21 hours 33 minutes 9 seconds
console.log("120184000, 4 parts - ", duratiform.divide(120184000, 4));   // { day: 1, hour: 9, minute: 23, second: 4 }
console.log("120184000, 4 parts and strings - ", duratiform.divide(120184000, 4, true));   // { day: 1, day2: "01", hour: 9, hour2: "09", minute: 23, minute2: "23", second: 4, second2: "04" }
console.log("120184000, 3 parts - ", duratiform.divide(120184000, 3));   // { hour: 33, minute: 23, second: 4 }
console.log("4567890 - ", duratiform.format(4567890, "(h:h:)(m:mm:)(s:ss)"));   // 1:16:07
console.log("456789 - ", duratiform.format(456789, "(h:h:)(m:mm:)(s:ss)"));   // 07:36
```

See `test/duratiform.js` for additional examples.

## API

### divide(nDuration: number, [nPartQty: number], [bAddStrings: boolean]): object

Separate time duration into parts.

### format(nDuration: number, [sFormat: string]): string

Convert time duration into string.

See `doc` folder for details.

## License

MIT

