var Time = require('../');
var time = new Time();
<<<<<<< HEAD
var buf = new Buffer(128 * 2)
buf.write('zuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzuggzugg')
time.every(2902495, tock);
// every billion nanosecond tock()

function tock(tick, interval){
  console.log(buf.toString('utf8'))
=======
 
time.every(1e9, tock);
// every billion nanosecond tock()

function tock(tick, interval){
>>>>>>> 833235eff3aa59729242584078d7217ae34e9b9f
  console.log(interval + ' time in nanoseconds passed')
  tick()
};