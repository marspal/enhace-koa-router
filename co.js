let fs =  require("fs");
function readFile(filename){
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      err ? reject(err): resolve(data); 
    });
  });
}

function *read(){
  let a = yield readFile('./a.txt');
  console.log(a);
  let b = yield readFile('./b.txt');
  console.log(b);
  let c = yield readFile('./c.txt');
  console.log(c);
  return c;
}

function co(gen){
  let it = gen();
  return new Promise(function(resolve, reject){
    !function next(lastVal){
      let {value, done} = it.next(lastVal);
      if(done){
        resolve(value)
      }else {
        value.then(next, reject);
      }
    }()
  });
}

// co(read);

// let it = read();
// let r1 = it.next();
// r1.value.then((data)=> {
//   let r2 = it.next(data);
//   r2.value.then((data)=>{
//     let r3 = it.next(data);
//     r3.value.then((data)=>{
//       let r4 = it.next(data);
//       console.log(r4);
//     });
//   });
// });
// co(read).then(data=>{
//   console.log(data);
// });

function test(){
  return new Promise((resolve, reject)=> {
    // console.log('ss');
    setTimeout(()=> {
      resolve('ss')
    }, 0)
  });
}

// test(); // promise  status = pending?

// function foo(a){
//   var b = a * 2;
//   function bar(c){
//     console.log(a,b,c);
//   }
//   bar(b * 3);
// }
// foo(2);
function foo(){
  var a = 2;
  function baz(){
    console.log(a); // RHS查询 词法作用域查找规则
  }
  // bar();
  // return bar;
  bar(baz);
}
// foo();

// var baz = foo();
// baz();

function bar(fn){
  fn();
}

// foo();

// console.log(a);

// 关于this
// test(); // promise  status = pending?

// async function async1() {
//   console.log(1);
//   const result = await async2();
//   console.log(3);
// }

// async function async2() {
//   console.log(2);
// }

// Promise.resolve().then(() => {
//   console.log(4);
// });

// setTimeout(() => {
//   console.log(5);
// });

// async1();
// console.log(6);

// function foo(){
//   var a = 2;
//   this.bar();
// }

// function bar(){
//   console.log(this.a);
// }

// foo();
// function foo() { console.log( this.a );
// }
// var a = 2;
// (function(){
//   "use strict";
//   foo(); // 2
// })();


// var id = "not awesome";
// console.log(obj.cool());
// setTimeout(obj.cool, 100);
function identify(){
  return this.name.toUpperCase();
}
function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = {
  name: 'Kyle'
};

var you = {
  name: "Reader"
}

// console.log(identify.call(me));
// console.log(identify.call(you));

// speak.call(me);
// speak.call(you);
function foo(){
  var a = 2;
  this.bar();
}

function bar(){
  console.log(this.a);
}

// foo();
function foo(){
  console.log(this.a);
}
var obj2 = {
  a: 41,
  foo: foo,
}
var obj1 = {
  a: 2,
  obj2,
}
obj1.obj2.foo();

// 2.2.4 new 绑定