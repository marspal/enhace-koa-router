// 'use strict'
<<<<<<< HEAD
// if(true){
//   function test(){}
// }
// // console.log(test);
// // var test = 1;
=======
if(true){
  function test(){}
}
// console.log(test);
// var test = 1;
>>>>>>> fb1af68435eee96caa69aae07b26c7904411ab73
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

<<<<<<< HEAD
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

=======
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log( this.id );
  } 
};
var id = "not awesome"
obj.cool(); // 酷
setTimeout( obj.cool, 100 ); // 不酷
>>>>>>> fb1af68435eee96caa69aae07b26c7904411ab73
