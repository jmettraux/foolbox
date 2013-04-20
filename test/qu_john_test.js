
//
// testing ruote-fluo-editor (the John module)
//
// Tue Aug 14 01:12:52 JST 2012
//


//
// testing John.parse(s)

function j_assert(source, expected, message) {

  deepEqual(John.parse(source), expected, message);
}

test('John.parse(o) atomic values', function() {

  j_assert('"oh yeah"', 'oh yeah');
  j_assert('"わしらの電車"', 'わしらの電車');
  j_assert('"a:b"', 'a:b');

  j_assert('1', 1);
  j_assert('1.2', 1.2);
  j_assert('1.2e10', 1.2e10);
  j_assert('-1', -1);

  j_assert('true', true);
  j_assert('false', false);

  j_assert('null', null);
});

test('John.parse(o) single quoted strings', function() {

  j_assert("'de nada'", 'de nada');
  j_assert("'わしらの電車'", 'わしらの電車');
  j_assert("'she said \"too bad!\"'", 'she said "too bad!"');
});

test('John.parse(o) standalone strings', function() {

  j_assert("炊飯器", '炊飯器');
  //j_assert("de nada", 'de nada');
});

test('John.parse(o) vanilla arrays', function() {

  j_assert('[]', []);
  j_assert('[ 1, 2, "trois" ]', [ 1, 2, 'trois' ]);
});

test('John.parse(o) vanilla objects', function() {

  j_assert('{}', {});
  j_assert('{ "a": 1 }', { a: 1 });
});

test('John.parse(o) relaxed arrays', function() {

  j_assert("[ 1, 2, 'trois' ]", [ 1, 2, 'trois' ]);
});

test('John.parse(o) relaxed objects', function() {

  j_assert("{ a: 0, b: 1 }", { a: 0, b: 1 });
});

test('John.parse(o) (readme)', function() {

  var r =
    John.parse(
      "{ a: alpha, b: 'bra vo', 'c': [ delta, echo ] }"
    );

  deepEqual(
    r,
    { a: 'alpha', b: 'bra vo', c: [ 'delta', 'echo' ] });
});

function t(s, expected, message) {

  deepEqual(John.t([], s), expected, message);
}

test('John tokenization', function() {

  t(
    "'a string'",
    [ "a string" ]);
  t(
    "{ a: b, c: d }",
    [ 0, "a", "b", "c", "d", 1 ]);
  t(
    "{ 'a': [ 1, 2, 'trois' ], c: d }",
    [ 0, "a", 2, "1", "2", "trois", 3, "c", "d", 1 ]);
});


//
// testing John.stringify(o)

function s_assert(o, expected, message) {

  equal(John.stringify(o), expected, message);
}

test('John.stringify(o)', function() {

  s_assert(null, 'null');

  s_assert('a', 'a');
  s_assert('a b', '"a b"');

  s_assert(1, '1');

  s_assert([ 1, 2 ], '[ 1, 2 ]');

  s_assert({ a: 0, b: 1 }, '{ a: 0, b: 1 }');
  s_assert({ a: 'apple', b: 'pie' }, '{ a: apple, b: pie }');
  s_assert({ a: null, b: 'burger' }, '{ a, b: burger }');
});

test('John.stringify(o) (readme)', function() {
});

