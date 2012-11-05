
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

