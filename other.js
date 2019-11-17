// 'use strict'
// if(true){
//   function test(){}
// }
// // console.log(test);
// // var test = 1;
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

// function foo() {
//   console.log( a ); // 3（不是2 ！）
// }
// function bar() {
//   var a = 3;
//   foo();
// }
// var a = 2;
// bar();

// {
//   var a = 2;
//   console.log(a);
// }

// console.log(a);

// try {
//   throw 2;
// }catch(a) {
//   console.log(a);
// }

// console.log(a);

let (a=2) {
  console.log(a);
}

console.log(a)

