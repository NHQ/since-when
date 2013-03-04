var Time = require('../');
var time = new Time();

time.every(1e9, tock);
// every billion nanosecond tock()

function tock(tick, interval){
  console.log(interval + ' time in nanoseconds passed')
  tick()
};

var t2 = new Time()

t2.every(1000000000, tockle)

function tockle(tick, interval){
  var tick = tick
  console.log(interval + ' time since last tockle')
  setTimeout(function(){tick()}, 2000)	
}
