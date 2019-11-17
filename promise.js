class Promise{
  constructor(excutor){
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    // 成功
    const resolve = (value) => {
      if(this.state === 'pending'){
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    } 
    // 失败
    const reject = (reason) => {
      if(this.state === 'pending'){
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    try {
      excutor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected){
    // 声明返回的promise2
    let promise2 = new Promise((resolve, reject) => {
      if(this.state === 'fulfilled'){
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      }
      if(this.state === 'rejected'){
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      if(this.state === 'pending'){
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject){
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x 不是null 且x是对象或者行数
  if(x != null && (typeof x === 'object' || typeof x === 'function')){
    try{
      // A+规定, 声明then=x的then方法
      let then = x.then;
      if(typeof then === 'function'){
        then.call(x, y => {
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if(called) return;
          called = true;
          reject(err);
        });
      }
    } catch(e) {
      // 输入于失败
      if(called) return;
      called = true;
      reject(e);
    }
  }else {
    resolve(x);
  }
}

// promise = Promise.resolve("aaa");
Promise.resolve = function(value){
  return new Promise((resolve, reject) => {
    resolve(value);
  });
}
Promise.reject = function(err){
  return new Promise((resolve, reject) => {
    reject(err);
  });
}

Promise.race = function(promises){
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; ++i){
      promises[i].then(resolve, reject);
    }
  });
}

Promise.all = function(promises){
  let arr = [];
  let i = 0;
  function processData(index, data, resolve){
    arr[index] = data;
    i ++;

    if(i == promises.length){
      resolve(arr);
    }
  }
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promises.length; ++i){
      promises[i].then(data=>{
        processData(i, data, resolve);
      }, reject);
    }
  });
}
module.exports = Promise;