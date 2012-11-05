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

  this.create = function(container, tagName, attributes, innerHTML) {

    var e = document.createElement(tagName);

    if (attributes && ((typeof attributes) == 'string')) {
      var i = identify(attributes);
      if (i.className) e.className = i.className;
      else if (i.id) e.id = i.id;
    }
    else if (attributes) {
      for (var k in attributes) e.setAttribute(k, attributes[k]);
    }

    if (innerHTML) e.innerHTML = innerHTML;
    if (container) container.appendChild(e);

    return e;
  }

  function identify(path) {

    var cs = [];
    var i = null;
    var t = null;

    var s = path;

    while (m = s.match(/^ *([#\.][^#\. ]+)/)) {
      var m = m[1];
      var ms = m.slice(1, m.length);
      if (m[0] == '.') cs.push(ms);
      else if (m[0] == '#') i = ms;
      else t = m.toLowerCase();
      s = s.slice(m.length, s.length);
    }

    var cn = cs.join(' ');

    return {
      'className': cn,
      'id': i,
      'tagName': t,
      'accepts': function (elt) { return hasClass(elt, cn); }
    };
  }

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

