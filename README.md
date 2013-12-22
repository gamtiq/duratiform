# duratiform

[![NPM version](https://badge.fury.io/js/duratiform.png)](http://badge.fury.io/js/duratiform)

Utility to separate into parts and to format time duration in milliseconds.

## Installation

### Node

    npm install duratiform

### [Component](http://component.io)

    component install gamtiq/duratiform

### [Jam](http://jamjs.org)

    jam install duratiform

### [Bower](http://bower.io)

    bower install duratiform

### AMD, &lt;script&gt;

Use `dist/duratiform.js` or `dist/duratiform.min.js` (minified version).

## Usage

### Node, Component

```js
var duratiform = require("duratiform");
```

### Jam

```js
require(["duratiform"], function(duratiform) {
    ...
});
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
console.log("Duration parts: ", duratiform.divide(nDuration, 4));
console.log(nDuration, " - ", duratiform.format(nDuration, "d [days] h [hours] m [minutes] s [seconds]"));
```

See `test/duratiform.js` for additional examples.

## API

See `doc` folder.

## License

MIT

