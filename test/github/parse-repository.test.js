/*
 * Copyright (c) 2015, Groupon, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of GROUPON nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

var assert = require('assertive');
var _ = require('lodash');

var parseRepository = require('../../lib/github/parse-repository');

function checkParsed(expected, name) {
  var result = parseRepository(name);
  assert.deepEqual(expected, result);
}

describe('parseRepository', function () {
  describe('github.com', function () {
    var expected = {
      baseUrl: 'https://api.github.com',
      htmlBase: 'https://github.com',
      username: 'myname',
      repository: 'myproject',
    };

    it('understands ssh urls', function () {
      [
        'git+ssh://git@github.com/myname/myproject',
        'git+ssh://git@github.com/myname/myproject.git',
        'git@github.com:myname/myproject',
        'git@github.com:myname/myproject.git',
      ].forEach(_.partial(checkParsed, expected));
    });

    it('understands https urls', function () {
      [
        'https://github.com/myname/myproject',
        'https://github.com/myname/myproject.git',
      ].forEach(_.partial(checkParsed, expected));
    });

    it('understands git urls', function () {
      [
        'git://github.com/myname/myproject',
        'git://github.com/myname/myproject.git',
      ].forEach(_.partial(checkParsed, expected));
    });

    it('understands npm-style shorthands', function () {
      [
        'myname/myproject',
      ].forEach(_.partial(checkParsed, expected));
    });
  });

  describe('Github Enterprise', function () {
    var expected = {
      baseUrl: 'https://ghe.mycorp.com/api/v3',
      htmlBase: 'https://ghe.mycorp.com',
      username: 'myname',
      repository: 'myproject',
    };

    it('understands ssh urls', function () {
      [
        'git@ghe.mycorp.com:myname/myproject',
        'git@ghe.mycorp.com:myname/myproject.git',
        'git+ssh://git@ghe.mycorp.com/myname/myproject',
        'git+ssh://git@ghe.mycorp.com/myname/myproject.git',
      ].forEach(_.partial(checkParsed, expected));
    });

    it('understands https urls', function () {
      [
        'https://ghe.mycorp.com/myname/myproject',
        'https://ghe.mycorp.com/myname/myproject.git',
      ].forEach(_.partial(checkParsed, expected));
    });

    it('understands git urls', function () {
      [
        'git://ghe.mycorp.com/myname/myproject',
        'git://ghe.mycorp.com/myname/myproject.git',
      ].forEach(_.partial(checkParsed, expected));
    });
  });
});
