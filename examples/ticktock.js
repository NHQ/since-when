var Time = require('../');
var time = new Time();
var t2 = new Time();
// every billion nanoseconds tock()

time.every(1e9, tock);

function tock(tick, interval){
  console.log('since-when is ' + Math.abs(1e9 - interval) + ' nanoseconds off 1 second mark')
  tick()
};

setInterval(function(){
  console.log('setInterval is ' +  Math.abs(1e9 - t2.sinceLastNS()) + ' nanoseconds off 1 second mark')
}, 1000)
