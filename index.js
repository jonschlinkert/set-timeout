/*!
 * set-timeout <https://github.com/jonschlinkert/set-timeout>
 *
 * This is based on the excellent MOUT's implementation of
 * timeout. <https://github.com/mout/mout>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Copyright (c) 2012, 2014 moutjs team and contributors
 * Licensed under the MIT license.
 */

'use strict';

var slice = require('array-slice');

module.exports = function timeout(fn, ms, context) {
  var args = slice(arguments, 3);

  return setTimeout(function () {
    fn.apply(context, args);
  }, ms);
};
