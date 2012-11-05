
//
// testing Foolbox
//
// Mon Nov  5 11:16:48 JST 2012
//

function jequal(actual, expected, message) {

  equal(JSON.stringify(actual), JSON.stringify(expected), message)
}

//
// the tests

test('Foolbox.create(...)', function() {

  var a = document.getElementById("anchor");
  var e = Foolbox.create(a, "div", {}, "hello");

  equal($(a).html(), "<div>hello</div>");
  equal($(e).html(), "hello");
});

