'use strict'
if(true){
  function test(){}
}
// console.log(test);
// var test = 1;
var b = 4;
function foo(a){
  console.log(a,b);
}
function bar(){
  var b = 3;
  foo(2);
}
bar();

// 作用域
