var later = require('later');

// fires every 5 minutes
var text = 'every 5 sec';
var sched = later.parse.text(text);

var t = later.setInterval(test, sched);
var count = 5;


function test() {
  console.log(new Date());
  count--;
  if(count <= 0) {
    t.clear();
  }
}