
//
// testing Foolbox
//
// Mon Nov  5 11:16:48 JST 2012
//

a = document.getElementById("anchor");

function t(e, html) {
  $(a).html('');
  a.appendChild(e);
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

//
// nested elements

test('Foolbox.c(elt, "#id0", Foolbox.c("#id1a"), Foolbox.c("#id1b"))', function() {

  t(
    Foolbox.c(a, "#id0", Foolbox.c("#id1a"), Foolbox.c("#id1b")),
    '<div id="id0"><div id="id1a"></div><div id="id1b"></div></div>')
});

