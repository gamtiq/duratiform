# duratiform

Utility to separate into parts and to format time duration in milliseconds.

```js
duratiform.divide(123456789000, 4);   // { day: 1428, hour: 21, minute: 33, second: 9 }
duratiform.format(456789, '(h:h:)(m:mm:)(s:ss)');   // 07:36
```

[See additional examples below.](#examples)

[![NPM version](https://badge.fury.io/js/duratiform.png)](http://badge.fury.io/js/duratiform)
[![Build Status](https://travis-ci.org/gamtiq/duratiform.png)](https://travis-ci.org/gamtiq/duratiform)

## Installation

### Node

    npm install duratiform

### [Bower](https://bower.io)

    bower install duratiform

### AMD, &lt;script&gt;

Use `dist/duratiform.js` or `dist/duratiform.min.js` (minified version).

## Usage

### Node

```js
var duratiform = require('duratiform');
```

### AMD

```js
define(['path/to/dist/duratiform.js'], function(duratiform) {
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

### Examples <a name="examples"></a>

```js
var nDuration = 123456789000;
console.log('5 duration parts: ', duratiform.divide(nDuration, 5));   // { week: 204, day: 0, hour: 21, minute: 33, second: 9 }
console.log(nDuration, ' - ', duratiform.format(nDuration, 'w [weeks] d [days] h [hours] m [minutes] s [seconds]'));   // 204 weeks 0 days 21 hours 33 minutes 9 seconds
console.log('4 duration parts: ', duratiform.divide(nDuration, 4));   // { day: 1428, hour: 21, minute: 33, second: 9 }
console.log(nDuration, ' - ', duratiform.format(nDuration, 'd [days] h [hours] m [minutes] s [seconds]'));   // 1428 days 21 hours 33 minutes 9 seconds

console.log('120184000, 4 parts - ', duratiform.divide(120184000, 4));   // { day: 1, hour: 9, minute: 23, second: 4 }
console.log('120184000, 4 parts and strings - ', duratiform.divide(120184000, 4, true));   // { day: 1, day2: "01", hour: 9, hour2: "09", minute: 23, minute2: "23", second: 4, second2: "04" }
console.log('120184000, 3 parts - ', duratiform.divide(120184000, 3));   // { hour: 33, minute: 23, second: 4 }

console.log('4567890 - ', duratiform.format(4567890, '(h:h:)(m:mm:)(s:ss)'));   // 1:16:07
console.log('456789 - ', duratiform.format(456789, '(h:h:)(m:mm:)(s:ss)'));   // 07:36
console.log('456789 - ', duratiform.format(456789, '(h:h:(m:mm:)(s:ss))'));   // empty string

console.log('4567890 - ', duratiform.format(4567890, 'Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))'));   // Duration: 1 hr 16 min 07 sec
console.log('456789 - ', duratiform.format(456789, 'Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))'));   // Duration: 7 min 36 sec
console.log('6789 - ', duratiform.format(6789, 'Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))'));   // Duration: 6 sec

```

See `test/duratiform.js` for additional examples.

## API

### [divide(nDuration: number, [nPartQty: number], [bAddStrings: boolean]): object](https://gamtiq.github.io/duratiform/module-duratiform.html#.divide)

Separate time duration into parts.

### [format(nDuration: number, [sFormat: string]): string](https://gamtiq.github.io/duratiform/module-duratiform.html#.format)

Convert time duration into string.

See [`docs`](https://gamtiq.github.io/duratiform/) for details.

## License

MIT

