var T = require('../')
  , time = new T()
  ;
  
setInterval(tick, 500)

function tick(){
  console.log(time.sinceLast())  
}