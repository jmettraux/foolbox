
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

  var e = document.createElement("nada");

  equal("nada", $(e).html());
});

