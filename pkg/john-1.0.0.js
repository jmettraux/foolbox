/*
 * Copyright (c) 2012-2013, John Mettraux, jmettraux@gmail.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


//
// John, a relaxed Json parser
//
var John = (function() {

  var self = this;

  function jp(s) {
    try { return JSON.parse(s); } catch(e) {}; return undefined;
  }
  function js(o) {
    return JSON.stringify(o);
  }

  var SPA = ' \t';

  function ltrim(s) {
    while (s.length > 0 && SPA.indexOf(s.slice(0, 1)) > -1) { s = s.slice(1); }
    return s;
  }

  var GSQ = /^'((?:\\.|[^'])*)'/;
  var GSDQ = /^"((?:\\.|[^"])*)"/;

  function grabString(quote, s) {
    return (quote === '"' ? GSDQ : GSQ).exec(s)[1];
  }

  var NS = /^[^}\],:\s]+/;

  function grabNonString(s) {
    return NS.exec(s)[0];
  }

  var SEP = '{}[],:';

  function tokenize(result, s) {

    s = ltrim(s);

    var c = s.slice(0, 1);
    if (c.length === 0) {
      return result;
    }
    var i = SEP.indexOf(c);
    if (i > -1) {
      if (i < 5) result.push(i);
      return tokenize(result, s.slice(1));
    }
    if (c === '"' || c === "'") {
      var str = grabString(c, s);
      result.push(str);
      return tokenize(result, s.slice(str.length + 2));
    }
    var nstr = grabNonString(s);
    result.push(nstr);
    return tokenize(result, s.slice(nstr.length));
  }
  this.t = tokenize; // testing

  var comma = {};

  function doParseObject(tokens) {
    var o = {};
    while (true) {
      var k = doParse(tokens);
      if (k === comma) continue;
      if (k === undefined) break;
      var v = doParse(tokens);
      o[k] = (v === comma || v === undefined) ? null : v;
    }
    return o;
  };
  function doParseArray(tokens) {
    var a = [];
    while (true) {
      var e = doParse(tokens);
      if (e === comma) continue;
      if (e === undefined) break;
      a.push(e);
    }
    return a;
  };

  function doParse(tokens) {

    var token = tokens.shift();

    if (token === 0) return doParseObject(tokens);     // {
    if (token === 2) return doParseArray(tokens);      // [
    if (token === 1 || token === 3) return undefined;  // } or ]
    if (token === 4) return comma;                     // ,

    var j = jp(token);
    return j === undefined ? token : j;
  }

  this.parse = function(s) {

    return doParse(tokenize([], s));
  }
  this.p = this.parse; // shortcut

  this.stringify = function(o, opts) {

    opts = opts || {};

    if (o === null) return opts.ruby ? 'nil' : 'null';

    var t = (typeof o);

    if (t === 'number' || t === 'boolean') return '' + o;

    if (o instanceof Array) {
      var a = [];
      o.forEach(function(e) { a.push(self.s(e, opts)); });
      return (a.length < 1) ? '[]' : '[ ' + a.join(', ') + ' ]';
    }

    if (t === 'object') {
      var a = [];
      for(var k in o) {
        var s = self.s(k);
        var v = o[k];
        if (v !== null) s = s + ': ' + self.s(v, opts);
        a.push(s);
      }
      return (a.length < 1) ? '{}' : '{ ' + a.join(', ') + ' }';
    }

    return (o.match(/[\s:,]/) || opts.quote || opts.ruby) ? js(o) : o;
  }
  this.s = this.stringify; // shortcut

  this.sfy = function(o, opts) {

    var s = this.stringify(o, opts);
    if (s.match(/^{.*}$/) || s.match(/^\[.*\]$/)) s = s.slice(1, -1).trim();
    return s;
  }

  return this;

}).apply({});


/* compressed from commit c3d2258 */
