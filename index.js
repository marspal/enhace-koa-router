const Promise = require("./promise");
new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("aaa");
    // reject("bbb");
  }, 1000)
}).then((value) => {
  console.log(value, 'sss');
}, (reason) => {
  console.log(reason, 'sssaa');
});

