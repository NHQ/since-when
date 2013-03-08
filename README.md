##since-when?##

__General purpose timing functions that use process.hrtime()__

These timing functions give you more precise readings bu using Node's Process.hrtime(). hrtime() returns arrays like this:

    [seconds, partial nanoseconds]

where nanoseconds is in addition to seconds, which see

    var time = process.hrtime()
    var totalNanoSeconds = (time[0] * 1e9) + time[1]

Sometimes since-when returns these arrays.
The reason being to be as slim as possible. If you are using the sinceLast()
method, you may only want the nanosecond value anyway, ie time.sinceLast()[1]

There is also a timed event loop method, see below time.loop(ns, callback) which is accurate to sub-milliseconds intervals.

    npm install since-when

###usage###

```js

// A SYNCRONOUS FIBONACCI SEQUENCER

var time = require('since-when');

var fib = function(n){
  var t = new time()
  var nacho = 0
    , p1 = 0
    , p2 = 0
    , a = 0;
  while(a <= n){
    nacho = p1 + p2;
    p2 = p1;
    p1 = (a === 1) ? nacho += 1 : nacho
    a++;
  }
  return [nacho, t.sinceBegin()]
};

var f = fib(100)
var ns = f[1][0] * 1e9 + f[1][1]
console.log('calculated answer to be: ' + f[0] + ' in %sns', ns)
```
    
##METHODS##

**Time.sinceBegin()**

Returns an hrtime array [seconds, nanoseconds] of time since new Time() was called

```js
var Time = require('since-when');
var time = new Time();
  
setInterval(tick, 500);

function tick(){
  console.log(time.sinceBegin())  
};
```

**Time.sinceLast()**
Returns hrtime array of time since last sinceLast().

```js
var Time = require('since-when');
var time = new Time();

setInterval(tick, 0);

function tick(){
  console.log(time.sinceLast())
};
```

**Time.loop(nanoseconds, event, boolean)** - 
aka Time.every(ns, eventm boolean)...
This calls your __function__ every __nanoseconds__.
The boolean argument decides whether to call yr function immediately,
or wait the interval first. Defafaults to the interval. You function
is called with two arguments, loop[function] and interval[number].
Call __loop()__  to keep the loop going. Don't call it and it stops.
Interval is the actual time since the last cycle, and
should be close to the value (nanoseconds) you passed, 
unless your process takes longer than that.

This method is somewhat optimized. It does a little math
to keep polling to a minimum, so as not to fill Node's event cue
with a million process.nextTick()s. It does so by averaging how
long your function takes to callback, and setting a threshold to a percentage of that interval.

```js
var Time = require('since-when');
var time = new Time();

// every billion nanoseconds tock()

time.every(1e9, tock);

function tock(tick, interval){
  console.log(interval + ' time in nanoseconds passed')
  tick()
};
```

**Time.avg()**

Call this and it returns the average interval bewteen calls to T.avg()

```js
var Time = require('../');
var time = new Time();
var t2 = new Time();

// this function outputs the average interval of calls
// which should normalize to 10 ms over time
// it also takes into account how long it takes   
// to compute the average

var averages = function(){

  var i = Math.random() * 20

  var t = t2.sinceLast()
    , avg = time.avg()
    , dur = t2.sinceLast()[1] / 1e6
  ;

  console.log(avg / 1e6)

  var t = setTimeout(averages, i - Math.ceil(dur))

};

averages()
```
