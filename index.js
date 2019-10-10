const Promise = require("./promise");
// const promise = new Promise((resolve, reject)=>{
//   setTimeout(()=>{
//     // resolve("aaa");
//     reject("bbb");
//   }, 1000)
// })
// const promise2 = promise.then((value) => {
//   // return promise2;
//   console.log(value,'ssss');
//   // return new Promise((resolve, reject) => {
//   //   resolve(value);
//   // });
//   return 'value'
// }, (err)=>{
//   console.log(err);
//   return err;
// }).then(value=>{
//   console.log(value, 'seeess');
// });
const promise1 = new Promise((resolve, reject) => {
  resolve(123);
});
const promise2 = new Promise((resolve, reject) => {
  resolve(1234);
});
const promise3 = new Promise((resolve, reject) => {
  resolve(125);
});
Promise.all([promise1, promise2, promise3]).then((data) => {
  console.log(data, 'aaasss');
});
