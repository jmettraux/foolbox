/*
 * Copyright (c) 2007-2013, John Mettraux, jmettraux@gmail.com
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

  var VERSION = '1.0.0';
  this.foolbox = VERSION;

  var self = this;

  //
  // create()

  function isString(o) {
    return ((typeof o) === 'string'); }
  function isHash(o) {
    return o && ((typeof o) === 'object') && ( ! isElement(o)); }
  function isArray(o) {
    return o && ( ! isString(o)) && (o.length === +o.length); };

  function isElement(o) {
    return o && isString(o.nodeName); }
  function isJquery(o) {
    return o && isString(o.jquery); }
  function isElementOrJquery(o) {
    return isElement(o) || isJquery(o); }

  function refine(elt) {
    if (elt.jquery) return elt[0];
    return elt;
  }

  this.create = function() {

    var container = null;
    var tagName = null;
    var attributes = {};
    var innerHTML = null;

    var offset = 0;

    // argument: container

    var arg = arguments[0];
    offset++;
    if (arg) {
      if (isJquery(arg)) container = arg[0];
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
    var r = null;
    if (isString(arg) && (r = split(tagName, arg))) {
      offset++;
      if (r.tagName) tagName = r.tagName;
      if (r.id) attributes.id = r.id;
      if (r['class']) attributes['class'] = r['class'];
      if (r.atts) for (var k in r.atts) { attributes[k] = r.atts[k] };
    }

    // argument: attributes

    arg = arguments[offset];
    if ( ! isJquery(arg) && isHash(arg)) {
      offset++;
      for (var k in arg) { attributes[k] = arg[k]; }
    }

    // argument: innerHTML

    arg = arguments[offset];
    if (isString(arg)) {
      offset++;
      innerHTML = arg;
    }

    // adding a raw element?

    var e;

    arg = arguments[offset];
    if ( ! tagName && arguments.length === 2 && isElementOrJquery(arg)) {
      offset++;
      e = refine(arg);
    }

    //
    // creation

    e = e || document.createElement(tagName || 'div');

    //
    // child elements

    while (offset < arguments.length) {
      arg = arguments[offset];
      offset++;
      if (isElement(arg)) e.appendChild(arg);
    }

    //
    // complete creation

    for (var k in attributes) e.setAttribute(k, attributes[k]);
    if (innerHTML) e.innerHTML = innerHTML;

    if (container) container.appendChild(e);

    adorn(e);

    return e;
  }

  // Add helper methods to the newly created elt
  //
  function adorn(elt) {

    elt.c = childCreate;

    elt.s = siblingCreate;
    elt.a = siblingCreate;

    elt.b = beforeSiblingCreate;
    elt.f = firstChildCreate;

    elt.t = tap;
    elt.p = returnParent;

    elt.e = empty;

    elt.table = self.table;
    elt.thead = self.thead; elt.tbody = self.tbody; elt.tfoot = self.tfoot;
    elt.tr = self.tr; elt.th = self.th; elt.td = self.td;
    elt.ul = self.ul; elt.ol = self.ol; elt.li = self.li;
    elt.div = self.div; elt.span = self.span;
    elt.para = self.para;

    // obviously, this one only works if jQuery is around
    //
    try {
      Object.defineProperty(elt, '$', {
        get: function() { return $(elt); },
        set: function() {}
      });
    } catch(ex) {}
  }

  function split(tagName, s) {

    if (s.match(/\s/)) return false;
    if (tagName && ( ! s.match(/[\.#@]/))) return false;

    var r = {};

    var m = s.split(/^([^\.#@]+)?(.*)$/)
    if (m[1]) { r.tagName = m[1]; s = m[2]; }

    while(s && (m = s.split(/^([\.#@])([^\.#@]+)/))) {

      if (m[1] === '#') {
        r.id = m[2];
      }
      else if (m[1] === '.') {
        r['class'] = r['class'] || [];
        r['class'].push(m[2]);
      }
      else if (m[1] === '@') {
        var kv = m[2].split('=');
        r.atts = r.atts || {};
        r.atts[kv[0]] = kv[1];
      }

      s = m[3];
    }

    if (r['class']) r['class'] = r['class'].join(' ');

    return r;
  }

  function childCreate() {

    var args = [ this ]; for (var k in arguments) args.push(arguments[k]);

    return self.create.apply(null, args);
  }

  function firstChildCreate() {

    var args = [ this ]; for (var k in arguments) args.push(arguments[k]);

    return self.createAsFirst.apply(null, args);
  }

  function siblingCreate() {

    var args = [ this ]; for (var k in arguments) args.push(arguments[k]);

    return self.after.apply(null, args);
  }

  function beforeSiblingCreate() {

    var args = [ this ]; for (var k in arguments) args.push(arguments[k]);

    return self.before.apply(null, args);
  }

  function tap(f) {

    f.apply(null, [ this ]);

    return this;
  }

  function returnParent() {

    adorn(this.parentNode);

    return this.parentNode;
  }

  function empty() {

    while (this.firstChild) this.removeChild(this.firstChild);

    return this;
  }

  this.c = this.create;

  //
  // table, tr, td, div, span

  function eltFunction(eltName, parentTags) {

    return function() {

      var args = [];

      if ( ! this.foolbox) args.push(this);

      for (var k in arguments) args.push(arguments[k]);

      args.splice(1, 0, eltName);

      while (
        parentTags &&
        parentTags.indexOf(args[0].tagName.toLowerCase()) < 0
      ) {
        args[0] = args[0].parentNode;
      }

      return self.create.apply(null, args);
    }
  }

  this.table = eltFunction('table');
  this.thead = eltFunction('thead', [ 'table' ]);
  this.tbody = eltFunction('tbody', [ 'table' ]);
  this.tfoot = eltFunction('tfoot', [ 'table' ]);
  this.tr = eltFunction('tr', [ 'table', 'thead', 'tbody', 'tfoot' ]);
  this.th = eltFunction('th', [ 'tr' ]);
  this.td = eltFunction('td', [ 'tr' ]);
  this.ol = eltFunction('ol');
  this.ul = eltFunction('ul');
  this.li = eltFunction('li', [ 'ol', 'ul' ]);
  this.div = eltFunction('div');
  this.span = eltFunction('span');
  this.para = eltFunction('p');

  //
  // createAsFirst() f()

  this.createAsFirst = function() {

    var e = self.create.apply(null, arguments);

    e.parentNode.insertBefore(e, e.parentNode.firstChild);

    return e;
  }

  this.caf = this.createAsFirst;
  this.f = this.createAsFirst;

  //
  // empty() e()

  this.empty = function() {

    var e = refine(arguments[0]);
    while (e.firstChild) e.removeChild(e.firstChild);

    adorn(e);

    return e;
  };

  this.e = this.empty;

  //
  // after()

  this.after = function() {

    var sibling = refine(arguments[0]);

    var args = [];
    for (var i = 1, l = arguments.length; i < l; i++) args.push(arguments[i]);

    var e = self.create.apply(null, args);

    if (sibling.nextSibling)
      sibling.parentNode.insertBefore(e, sibling.nextSibling);
    else
      sibling.parentNode.appendChild(e);

    return e;
  }

  this.a = this.after;

  //
  // before()

  this.before = function() {

    var sibling = refine(arguments[0]);

    var args = [];
    for (var i = 1, l = arguments.length; i < l; i++) args.push(arguments[i]);

    var e = self.create.apply(null, args);

    sibling.parentNode.insertBefore(e, sibling);

    return e;
  }

  this.b = this.before;

  //
  // importScript()

  this.importScript = function(path) {

    var s = document.createElement('script');
    s.src = path;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
  }

  //
  // wrap() w()

  this.wrap = function(elt) {

    elt = refine(elt);
    adorn(elt);

    return elt;
  };

  this.w = this.wrap;

  //
  // over.

  return this;

}).apply({});


/* from commit d45f26b on 2013-12-18 14:16:57 +0900 */
