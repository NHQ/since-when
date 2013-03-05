var Time = require('../');
var time = new Time();

// every billion nanoseconds tock()

time.every(1e9, tock);

function tock(tick, interval){
  console.log(interval + ' time in nanoseconds passed')
  tick()
};

