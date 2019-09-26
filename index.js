const Promise = require("./promise");
const promise = new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve("sssaas");
  }, 100);
});

const p1 = promise.then(res => {
  console.log(res);
  // return p1;
  return new Promise((resolve, reject)=>{
   resolve(new Promise((resolve, reject) => {
     resolve("asdasds");
   }))
  });
  // return "ssssfasfdas";
}, error => {
  console.log(error, '==ss')
});

const p2 = p1.then(res => {
  console.log(res, 'sss');
});

