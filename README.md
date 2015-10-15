Config
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Returns a directory for user-specific configuration files.


## Installation

``` bash
$ npm install utils-configdir
```


## Usage

``` javascript
var configdir = require( 'utils-configdir' );
```

#### configdir( [path] )

Returns a base directory for user-specific configuration files.

``` javascript
var dir = configdir();
// => e.g., /Users/<username>/Library/Preferences
```

To append a `path` to the base directory, provide a `path` argument.

``` javascript
var dir = configdir( 'appname/config' );
// => e.g., /Users/<username>/Library/Preferences/appname/config
```

On non-windows platforms, if the module is unable to locate the current user's [`home`](https://github.com/kgryte/utils-homedir) directory, the module returns `null`.

``` javascript
// When unable to resolve `home`...
var dir = configdir();
// returns null
```


## Notes

*	On Windows platforms, the module first checks for a `LOCALAPPDATA` [environment variable](https://en.wikipedia.org/wiki/Environment_variable#Windows) before checking for a `APPDATA` [environment variable](https://en.wikipedia.org/wiki/Environment_variable#Windows). This means that machine specific user configuration files have precedence over roaming user configuration files.



## Examples

``` javascript
var configdir = require( 'utils-configdir' );

console.log( configdir( 'appy/config' ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g utils-configdir
```

### Usage

```
Usage: configdir [options]

Options:
  -h,  --help     Print this message.
  -V,  --version  Print package version.
```

### Examples

``` bash
$ configdir
# => e.g., /Users/<username>/Library/Preferences
```

For local installations, modify the command to point to the local installation directory; e.g.,

``` bash
$ ./node_modules/.bin/configdir
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g.,

``` bash
$ node ./bin/cli
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-configdir.svg
[npm-url]: https://npmjs.org/package/utils-configdir

[travis-image]: http://img.shields.io/travis/kgryte/utils-configdir/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-configdir

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-configdir/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-configdir?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-configdir.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-configdir

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-configdir.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-configdir

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-configdir.svg
[github-issues-url]: https://github.com/kgryte/utils-configdir/issues
