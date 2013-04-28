
# foolbox

A tiny javascript toolbox. Nothing awesome here.

Foolbox is a collection of 3 libraries.

First, [foolbox](#foolbox) itself provides quick methods for building DOM elements.

```javascript
  Foolbox.c(elt, "p#id.class@data-x=y", "hello");
    // => <p id="id" class="class" data-x="y">hello</p>
```

Second, [nu](#nu) is a library for dealing with arrays and hashes (cough, objects), collect, select, inject, etc.

```javascript
  var r = Nu.eachWithObject({ a: 1, b: 2, c: 3 }, {}, function(k, v, h) {
    if (v != 2) h[k] = v * 2;
  });
    // => { a: 2, c: 6 }
```

Third, [john](#john) is a library for parsing/emitting loose JSON/JS serializsation string.

```javascript
  // John is lazy, but not ambiguous
  //
  John.stringify(
    { a: 0, b: "trois", 'c': true, d: [ 'alpha', 'bravo', 'charly' ] }
  )
    // => '{ a: 0, b: trois, c: true, d: [ alpha, bravo, charly ] }'

  // likewise
  //
  John.parse('{ a: 0, b: tres, c: true, d: [ al, bob, cat ] }')
    // yields { a: 0, b: "tres", 'c': true, d: [ 'al', 'bob', 'cat' ] }
```


## foolbox

### create() (or c())

Creates a DOM element:

```javascript
// vanilla use

  Foolbox.c("#id"),
    // => <div id="id"></div>

  Foolbox.create(null, "div", {}, "hello")
    // => <div>hello</div>

  Foolbox.create(a, "div", ".nada", "hello")
    // => <div class="nada">hello</div>

  Foolbox.create(a, "div", ".class-a.class-b", "hello")
    // => <div class="class-a class-b">hello</div>

  Foolbox.create(a, "p.class-a.class-b", "hello")
    // => <p class="class-a class-b">hello</p>

  Foolbox.create(a, "p#id.class@data-x=y", "hello")
    // => <p id="id" class="class" data-x="y">hello</p>
```

Passing elements as final arguments nests them in the element created with the initial arguments:

```javascript
// nesting elements

  Foolbox.c(a, "#id0", Foolbox.c("#id1a"), Foolbox.c("#id1b"))
    // => <div id="id0"><div id="id1a"></div><div id="id1b"></div></div>
```

Created elements get three methods: c (create child), a (create after), b (create before):

```javascript
// elements get a c() method

  Foolbox.c(a, "#id0").c("#id1a").c("#id1b")
    // => <div id="id0"><div id="id1"><div id="id2"></div></div></div>

// elements get a a() method

  Foolbox.c(a, "#id0").c("#id1a").a("#id1b")
    // => <div id="id0"><div id="id1a"></div><div id="id1b"></div></div>

// elements get a b() method

  Foolbox.c(a, "#id0").c("#id1a").b("#id1b")
    // => <div id="id0"><div id="id1b"></div><div id="id1a"></div></div>
```


### before() (or b())

Like the create() method but the resulting element is inserted before the first argument:

```javascript
  var a = Foolbox.c(document.body, "#id0")
  Foolbox.b(a, "#id1")
    // => <div id="id1"></div><div id="id0"></div>
```

The created element also gets the c/a/b methods.


### after() (or a())

Like the create() method but the resulting element is appended after the first argument:

```javascript
  var a = Foolbox.c(document.body, "#id0")
  Foolbox.a(a, "#id1")
    // => <div id="id0"></div><div id="id1"></div>
```

The created element also gets the c/a/b methods.


### createAsFirst (or f())

Creates an element as the first child of the targetted container:

```javascript
  Foolbox.f(document.body, 'p', 'hello world!');
```

f() is also given to elements created by Foolbox, but it might not very useful...


### t() (tap)

Executes the function passed as argument, but still returns the element that got 'tapped'.

```javascript
  var a = Foolbox.c(document.body, "p#para0").t(function(e) {
    $(e).addClass('k');
  });
    // => <p id="para0" class="k"></p>
```

### p()

Returns the parent node of the Foolbox created element (also makes sure that this parent node is adorned with the single letter methods provided by the foolbox).

```javascript
  var a = Foolbox.c(document.body, "p#para0").p().c("p#para1").p();
    // para0 then para1...
```

### $

This pseudo-property returns the jQuery wrapped elt. Won't work if jQuery isn't around.


```javascript
  Foolbox.c(document.body, "p#para0").$.hide();
```

## nu

TODO

## john

TODO John.parse(), John.p(), John.stringify(), John.s(), John.sfy()


## license

MIT (see LICENSE.txt)

