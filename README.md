###since-when###

__General purpose timing functions that use process.hrtime()__

process.hrtime() returns arrays like this:

    [seconds, partial nanoseconds]

where the second is nanoseconds more than seconds, which see

    var time = process.hrtime()
    var nanoSeconds = (time[0] * 1e9) + time[1]

Sometimes since-when returns these, sometimes it returns nanoseconds.
The reason being to be as slim as possible. If you are using the sinceLast()
method, you may only want the nanosecond value anyway, ie time.sinceLast()[1]

    npm install since-when

usage

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
    
__METHODS__

**T.sinceBegin()**

Returns an hrtime array [seconds, nanoseconds] of time since new Time() was called

```js
var Time = require('since-when');
var time = new Time();
  
setInterval(tick, 500);

function tick(){
  console.log(time.sinceBegin())  
};
```

**T.sinceLast()**
Returns hrtime array of time since last sinceLast().

```js
var Time = require('since-when');
var time = new Time();

setInterval(tick, 0);

function tick(){
  console.log(time.sinceLast())
};
```

**T.every(nanoseconds, event)** - 

This calls your __function event(tock, interval)__ every __nanoseconds__. 
Call __tock()__ in your function to keep the loop going.
Interval should be close to the value (nanoseconds) you passed, 
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

**T.avg()**

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
