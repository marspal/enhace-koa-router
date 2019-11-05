// new Promise((resolve, reject) => {});
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class Promise {
  constructor(executor){
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    // l成功
    let resolve = (value) => {
      if(this.state === PENDING){
        this.state = FULFILLED;
        this.value = value;
      }
      this.onResolvedCallbacks.forEach(fn => fn());
    };
    let reject = (reason) => {
      if(this.state === PENDING){
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    // 立即执行
    try {
      executor(resolve, reject);
    }catch(err){
      reject(err);
    }
  }
  // Promise有一个叫做then的方法，里面有两个参数：onFulfilled,onRejected,成功有成功的值，失败有失败的原因
  then(onFulfilled, onRejected){
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    const promise2 = new Promise((resolve, reject)=> {
      if(this.state === FULFILLED){
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      }
      if(this.state === REJECTED){
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }
      if(this.state === PENDING){
        this.onResolvedCallbacks.push(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });
    return promise2;
  }
  catch(fn){
    return this.then(null, fn);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 循环引用报错
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      if(typeof then === 'function'){
        then.call(x, (y)=>{
          if(called){return;}
          called = true;
          // resolve(value);
          resolvePromise(promise2, y, resolve, reject);
        }, (reason)=>{
          if(called){return;}
          called = true;
          reject(reason);
        });
      }else {
        resolve(x);
      }
    } catch (e) {
      if(called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.resolve = function(val){
  return new Promise((resolve, reject)=>{
    resolve(val);
  });
}

Promise.reject = function(reason){
  return new Promise((resolve, reject) => {
    reject(reason);
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
  return new Promise((resolve, reject)=> {
    function processData(index, data){
      arr[index] = data;
      i++;
      if(i === promises.length){
        resolve(arr);
      }
    }
    for(let i = 0; i < promises.length; ++i){
      promises[i].then((data)=>processData(i, data), reject);
    }
  });
}


var promise = new Promise((resolve,  reject)=> {
  setTimeout(()=>{
    resolve('aaa');
  }, 10)
});

var promise1 = new Promise((resolve,  reject)=> {
  setTimeout(()=>{
    resolve('ssaaa');
  }, 10)
});

Promise.all([promise, promise1]).then((res)=> {
  console.log(res, '====');
});