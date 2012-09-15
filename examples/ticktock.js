var Time = require('../')
  , time = new Time()
  ;
 
time.every(1e9, tock)
// every billion nanosecond tock()

function tock(tick, interval){
  console.log(interval + ' time in nanoseconds passed')
  tick()
}