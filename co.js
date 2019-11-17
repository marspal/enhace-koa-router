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
var obj = {
  id: "awesome",
  cool: function coolFn() {
    console.log(this)
    console.log( this.id );
  }
};
var id = "not awesome"
obj.cool(); // 酷
setTimeout( obj.cool, 100 ); // 不酷

// 关于this