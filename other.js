// 'use strict'
if(true){
  function test(){}
}
// console.log(test);
// var test = 1;
// var b = 4;
// function foo(a){
//   console.log(a,b);
// }
// function bar(){
//   var b = 3;
//   foo(2);
// }
// bar();

// 作用域

var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log( this.id );
  } 
};
var id = "not awesome"
obj.cool(); // 酷
setTimeout( obj.cool, 100 ); // 不酷