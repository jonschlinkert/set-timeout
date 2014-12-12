/*!
 * set-timeout <https://github.com/jonschlinkert/set-timeout>
 *
 * This is based on the excellent MOUT's implementation of
 * timeout. <https://github.com/mout/mout>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var timeout = require('./');

var sinon = require('sinon');
var clock;

describe('timeout', function() {
  function doIt() {
    this.a++;
  }

  function manipulate(value) {
    this.a = value;
  }

  beforeEach(function() {
    clock = sinon.useFakeTimers();
  });

  it('should delay the execution', function() {
    var callback = sinon.spy();
    timeout(callback, 300);

    clock.tick(100);
    callback.notCalled.should.be.true;

    clock.tick(250);
    callback.calledOnce.should.be.true;
  });

  it('should call function in given context', function() {
    var context = {a: 0};

    timeout(doIt, 300, context);
    clock.tick(350);

    context.a.should.equal(1);
  });

  it('should curry arguments', function() {
    var context = {a: 0};

    timeout(manipulate, 300, context, 5);
    clock.tick(350);

    context.a.should.equal(5);
  });

  it('should cancel a timemout', function() {
    var callback = sinon.spy();

    var id = timeout(callback, 200);
    clock.tick(100);
    clearTimeout(id);
    clock.tick(200);

    callback.notCalled.should.be.true;
  });
});
