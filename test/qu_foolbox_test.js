
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
    '<div class="class-a class-b">hello</div>')
});

test('Foolbox.create(elt, "p.class-a.class-b", innerHTML)', function() {

  t(
    Foolbox.create(a, "p.class-a.class-b", "hello"),
    '<p class="class-a class-b">hello</p>')
});

test('Foolbox.create(elt, "p#id.class@x=y", innerHTML)', function() {

  t(
    Foolbox.create(a, "p#id.class@data-x=y", "hello"),
    '<p id="id" class="class" data-x="y">hello</p>')
});

//
// nested creates

test('Foolbox.create(elt, "#id0", [ "#id1" ])', function() {

  t(
    Foolbox.create(a, "#id0", [ "#id1" ]),
    '<div id="id0"><div id="id1"></div></div>')
});

test('Foolbox.create(elt, "#id0", [ [ "#id1a" ], [ "#id1b" ]  ])', function() {

  t(
    Foolbox.create(a, "#id0", [ [ "#id1a" ], [ "#id1b" ] ]),
    '<div id="id0"><div id="id1a"></div><div id="id1b"></div></div>')
});

