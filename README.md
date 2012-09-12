**A simple timing module that uses process.hrtime**

    npm install since-when

usage

    var T = require('since-when')
      , time = new T()
      ;
      
    setInterval(tick, 500)
    
    function tick(){
      console.log(time.sinceLast())  
    }

__METHODS__

**T.sinceBegin** - time since new T()

**T.sinceLast** - time since last tick, starts at new T()
 
see /examples