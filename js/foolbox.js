/*
 * Copyright (c) 2007-2012, John Mettraux, jmettraux@gmail.com
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
 *
 * Made in Japan.
 */

var Foolbox = (function() {

  var self = this;

  //
  // create()

  function isString(o) {
    return ((typeof o) == 'string'); }
  function isElement(o) {
    return o && isString(o.nodeName); }
  function isHash(o) {
    return o && ((typeof o) == 'object') && ( ! isElement(o)); }
  function isArray(o) {
    return o && ( ! isString(o)) && (o.length === +o.length); };

  this.create = function() {

    var container = null;
    var tagName = 'div';
    var attributes = {};
    var innerHTML = null;

    var offset = 0;

    // argument: container

    var arg = arguments[0];
    offset++;
    if (arg) {
      if (arg.jquery) container = arg[0];
      else if (isElement(arg)) container = arg;
      else offset = 0;
    }

    // argument: tagName

    arg = arguments[offset];
    if (isString(arg) && arg.match(/^[a-zA-Z][a-zA-Z0-9]*$/)) {
      offset++;
      tagName = arg;
    }

    // argument: tagName#id.class

    arg = arguments[offset];
    if (isString(arg)) {
      offset++;
      var r = split(arg);
      if (r.tagName) tagName = r.tagName;
      if (r.id) attributes.id = r.id;
      if (r.class) attributes.class = r.class;
      if (r.atts) for (var k in r.atts) { attributes[k] = r.atts[k] };
    }

    // argument: attributes

    arg = arguments[offset];
    if (isHash(arg)) {
      offset++;
      for (var k in arg) { attributes[k] = arg[k]; }
    }

    // argument: innerHTML

    arg = arguments[offset];
    if (isString(arg)) {
      offset++;
      innerHTML = arg;
    }

    //
    // creation

    var e = document.createElement(tagName);
      // needed for the remaining arguments

    //
    // child elements

    while(offset < arguments.length) {
      arg = arguments[offset];
      offset++;
      if (isElement(arg)) e.appendChild(arg);
    }

    //
    // complete creation

    for (var k in attributes) e.setAttribute(k, attributes[k]);
    if (innerHTML) e.innerHTML = innerHTML;

    if (container) container.appendChild(e);

    e.c = childCreate;
    e.s = siblingCreate;

    return e;
  }

  function split(s) {

    var r = {};

    var m = s.split(/^([^\.#@]+)?(.*)$/)
    if (m[1]) { r.tagName = m[1]; s = m[2]; }

    while(s && (m = s.split(/^([\.#@])([^\.#@]+)/))) {

      if (m[1] == '#') {
        r.id = m[2];
      }
      else if (m[1] == '.') {
        r.class = r.class || [];
        r.class.push(m[2]);
      }
      else if (m[1] == '@') {
        var kv = m[2].split('=');
        r.atts = r.atts || {};
        r.atts[kv[0]] = kv[1];
      }

      s = m[3];
    }

    if (r.class) r.class = r.class.join(' ');

    return r;
  }

  function childCreate() {

    var args = [ this ];
    for (var k in arguments) { args.push(arguments[k]); }

    return self.create.apply(null, args);
  }

  function siblingCreate() {

    var args = [ this.parentNode ];
    for (var k in arguments) { args.push(arguments[k]); }

    return self.create.apply(null, args);
  }

  this.c = this.create;

  //
  // importScript()

  this.importScript = function(path) {

    var s = document.createElement('script');
    s.src = path;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  //
  // over.

  return this;

}).apply({});

