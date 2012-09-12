var T = require('../')
  , time = new T()
  ;
  
setInterval(tick, 1500)

function tick(){
  console.log(time.sinceLast())  
}