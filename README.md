
# foolbox

A tiny javascript toolbox. Nothing awesome here.

## usage

### create() (or c())

Creates a DOM element

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

// nesting elements

  Foolbox.c(a, "#id0", Foolbox.c("#id1a"), Foolbox.c("#id1b"))
    // => <div id="id0"><div id="id1a"></div><div id="id1b"></div></div>

// elements get a c() method

  Foolbox.c(a, "#id0").c("#id1a").c("#id1b")
    // => <div id="id0"><div id="id1"><div id="id2"></div></div></div>

// elements get a s() method

  Foolbox.c(a, "#id0").c("#id1a").s("#id1b")
    // => <div id="id0"><div id="id1a"></div><div id="id1b"></div></div>
```

## license

MIT (see LICENSE.txt)

