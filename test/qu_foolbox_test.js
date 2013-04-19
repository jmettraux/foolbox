
//
// testing Foolbox
//
// Mon Nov  5 11:16:48 JST 2012
//

a = document.getElementById('anchor');

function t(e, html) {
  $(a).html('');
  a.appendChild(e);
  equal($(a).html(), html);
}
function tba(f, html) {
  $(a).html('');
  $(a).append($("<div id='anchor1'></div>"));
  a1 = document.getElementById("anchor1");
  f.call();
  equal($(a).html(), html);
}

//
// classical usage

test('Foolbox.create(elt, tagName, {}, innerHTML)', function() {

  t(
    Foolbox.create(null, "div", {}, "hello"),
    '<div>hello</div>');
});

test('Foolbox.create(elt, tagName, ".class", innerHTML)', function() {

  t(
    Foolbox.create(a, "div", ".nada", "hello"),
    '<div class="nada">hello</div>');
});

test('Foolbox.create(elt, tagName, ".class-a.class-b", innerHTML)', function() {

  t(
    Foolbox.create(a, "div", ".class-a.class-b", "hello"),
    '<div class="class-a class-b">hello</div>');
});

test('Foolbox.create(elt, "p.class-a.class-b", innerHTML)', function() {

  t(
    Foolbox.create(a, "p.class-a.class-b", "hello"),
    '<p class="class-a class-b">hello</p>');
});

test('Foolbox.create(elt, "p#id.class@data-x=y", innerHTML)', function() {

  t(
    Foolbox.create(a, "p#id.class@data-x=y", "hello"),
    '<p id="id" class="class" data-x="y">hello</p>');
});

test('Foolbox.create("@x=y@z=4")', function() {

  t(
    Foolbox.create(a, "@x=y@z=4"),
    '<div x="y" z="4"></div>');
});

test('Foolbox.create("#id")', function() {

  t(
    Foolbox.create("#id"),
    '<div id="id"></div>');
});

test('Foolbox.create($(a), "#id")', function() {

  t(
    Foolbox.create($(a), "#id"),
    '<div id="id"></div>');
});

test('Foolbox.create(a, "td", "text")', function() {

  t(
    Foolbox.create(a, "td", "text"),
    '<td>text</td>');
});

test('Foolbox.c(a, "td", "text")', function() {

  t(
    Foolbox.c(a, "td", "text"),
    '<td>text</td>');
});

//
// createAsFirst() caf() f()

test('Foolbox.f(a, "div#bravo")', function() {

  tba(
    function() {
      Foolbox.f(a, 'div#bravo');
    },
    '<div id="bravo"></div><div id="anchor1"></div>');
});

test('Foolbox.f(empty, "div#bravo")', function() {

  t(
    Foolbox.f(a, 'div#bravo'),
    '<div id="bravo"></div>');
});

//
// after() and before()

test('Foolbox.after(a1, ".nada")', function() {

  tba(
    function() { Foolbox.after(a1, ".nada") },
    '<div id="anchor1"></div><div class="nada"></div>');
});

test('Foolbox.before(a1, ".nada")', function() {

  tba(
    function() { Foolbox.before(a1, ".nada") },
    '<div class="nada"></div><div id="anchor1"></div>');
});

//
// nested elements

test('Foolbox.c(elt, "#id0", Foolbox.c("#id1a"), Foolbox.c("#id1b"))', function() {

  t(
    Foolbox.c(a, "#id0", Foolbox.c("#id1a"), Foolbox.c("#id1b")),
    '<div id="id0"><div id="id1a"></div><div id="id1b"></div></div>');
});

//
// Foolbox.c().c()

test('Foolbox.c(elt, "#id0").c("#id1").c("#id2")', function() {

  $(a).html('');

  Foolbox.c(a, "#id0").c("#id1").c("#id2");

  equal(
    a.innerHTML,
    '<div id="id0"><div id="id1"><div id="id2"></div></div></div>');
});

//
// Foolbox.c().s()

test('Foolbox.c(elt, "#id0").c("#id1a").s("#id1b")', function() {

  $(a).html('');

  Foolbox.c(a, "#id0").c("#id1a").s("#id1b");

  equal(
    a.innerHTML,
    '<div id="id0"><div id="id1a"></div><div id="id1b"></div></div>');
});

//
// Foolbox.a().a() / Foolbox.a().b()

test('Foolbox.a(a1, ".alpha").a(".bravo")', function() {

  tba(
    function() {
      $(a).append("<div id='anchor2'></div>");
      Foolbox.a(a1, ".alpha").a(".bravo")
    },
    '<div id="anchor1"></div><div class="alpha"></div><div class="bravo"></div><div id="anchor2"></div>');
});

test('Foolbox.a(a1, ".alpha").b(".bravo")', function() {

  tba(
    function() {
      $(a).append("<div id='anchor2'></div>");
      Foolbox.a(a1, ".alpha").b(".bravo")
    },
    '<div id="anchor1"></div><div class="bravo"></div><div class="alpha"></div><div id="anchor2"></div>');
});

test('Foolbox.c().f()', function() {

  // haven't found a good use for it, pushing it anyway...

  tba(
    function() {
      Foolbox.c(a, 'div#alpha').f('div#bravo');
    },
    '<div id="anchor1"></div><div id="alpha"><div id="bravo"></div></div>');
});

//
// t() tap

test('Foolbox.c().t(func())', function() {

  t(
    Foolbox.c('div#oompf').t(function() { 1 + 1 }),
    '<div id="oompf"></div>');
});

test('Foolbox.c().t(func(e))', function() {

  t(
    Foolbox.c('div#oompf').t(function(e) { $(e).addClass('nada'); }),
    '<div id="oompf" class="nada"></div>');
});

//
// p()

test('Foolbox.c().p().c()', function() {

  tba(
    function() {
      Foolbox.c(a, 'div#alpha').p().c('div#bravo');
    },
    '<div id="anchor1"></div><div id="alpha"></div><div id="bravo"></div>');
});

//
// jq()

test('Foolbox.c().$', function() {

  equal(
    Foolbox.c(a, 'div#alpha', 'nada').$.text(),
    'nada')
});

