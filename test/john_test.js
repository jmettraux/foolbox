
//
// testing ruote-fluo-editor (the John module)
//
// Tue Aug 14 01:12:52 JST 2012
//


//
// testing John.parse(s)

function pa(source, expected, message) {

  deepEqual(John.parse(source), expected, message);
}

test('John.parse(o) atomic values', function() {

  pa('"oh yeah"', 'oh yeah');
  pa('"わしらの電車"', 'わしらの電車');
  pa('"a:b"', 'a:b');

  pa('1', 1);
  pa('1.2', 1.2);
  pa('1.2e10', 1.2e10);
  pa('-1', -1);

  pa('true', true);
  pa('false', false);

  pa('null', null);
});

test('John.parse(o) single quoted strings', function() {

  pa("'de nada'", 'de nada');
  pa("'わしらの電車'", 'わしらの電車');
  pa("'she said \"too bad!\"'", 'she said "too bad!"');
});

test('John.parse(o) standalone strings', function() {

  pa("炊飯器", '炊飯器');
  //pa("de nada", 'de nada');
});

test('John.parse(o) vanilla arrays', function() {

  pa('[]', []);
  pa('[ 1, 2, "trois" ]', [ 1, 2, 'trois' ]);
});

test('John.parse(o) vanilla objects', function() {

  pa('{}', {});
  pa('{ "a": 1 }', { a: 1 });
  pa('{ "a": 1, "b": "deux" }', { a: 1, b: 'deux' });
});

test('John.parse(o) relaxed arrays', function() {

  pa("[ 1, 2, 'trois' ]", [ 1, 2, 'trois' ]);
  pa("[ 1 2 'trois' ]", [ 1, 2, 'trois' ]);
});

test('John.parse(o) relaxed objects', function() {

  pa("{ a: 0, b: 1 }", { a: 0, b: 1 });
  pa("{ a 0, b 1 }", { a: 0, b: 1 });
  pa("{ a 0 b 1 }", { a: 0, b: 1 });
});

test('John.parse(o) very relaxed objects', function() {

  pa('{ alpha, "task": "clean lab" }', { alpha: null, task: 'clean lab' });
  pa('{ "alpha", "task": "clean lab" }', { alpha: null, task: 'clean lab' });
  pa('{ alpha, task }', { alpha: null, task: null });
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

function ta(s, expected, message) {

  deepEqual(John.t([], s), expected, message);
}

test('John tokenization', function() {

  ta(
    "'a string'",
    [ "a string" ]);
  ta(
    "{ a: b, c: d }",
    [ 0, "a", "b", 4, "c", "d", 1 ]);
  ta(
    "{ 'a': [ 1, 2, 'trois' ], c: d }",
    [ 0, "a", 2, "1", 4, "2", 4, "trois", 3, 4, "c", "d", 1 ]);
});


//
// testing John.stringify(o)

function sa(o, expected, message) {

  equal(John.stringify(o), expected, message);
}

test('John.stringify(o)', function() {

  sa(null, 'null');

  sa('a', 'a');
  sa('a b', '"a b"');

  sa(1, '1');

  sa([ 1, 2 ], '[ 1, 2 ]');

  sa({ a: 0, b: 1 }, '{ a: 0, b: 1 }');
  sa({ a: 'apple', b: 'pie' }, '{ a: apple, b: pie }');
  sa({ a: null, b: 'burger' }, '{ a, b: burger }');
});

test('John.stringify(o) (readme)', function() {

  sa(
    { a: 0, b: "trois", 'c': true, d: [ 'alpha', 'bravo', 'charly' ] },
    '{ a: 0, b: trois, c: true, d: [ alpha, bravo, charly ] }'
  );
});

test('John.sfy(o)', function() {

  // vanilla case

  equal(John.sfy({}), '');
  equal(John.sfy({ a: 'apple' }), 'a: apple');
  equal(John.sfy({ a: 'apple', b: 2 }), 'a: apple, b: 2');

  // other cases

  equal(John.sfy([]), '');
  equal(John.sfy([ 1, 2, 3 ]), '1, 2, 3');
  equal(John.sfy("abc"), 'abc');
  equal(John.sfy([ 1, 'deux', 3 ]), '1, deux, 3');
});

