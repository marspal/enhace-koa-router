class Promise{
  constructor(executor){
    if(typeof executor !== 'function'){
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if(this.state === 'pending'){
        this.state = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }
    const reject = (reason) => {
      if(this.state === 'pending'){
        this.reason = reason;
        this.state = 'rejected';
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected){
    const p2 = new Promise((resolve, reject) => {
      if(this.state === 'fulfilled'){
        setTimeout(()=>{
          const x = onFulfilled(this.value);
          resolvePromise(p2, x, resolve, reject); // promise || 123 | '1234';
        }, 0)
          
      }
      if(this.state === 'rejected'){
        setTimeout(() => {
          const x = onRejected(this.reason);
          resolvePromise(p2, x, resolve, reject); // promise || 123 | '1234';
        }, 0);
      }

      if(this.state === 'pending'){
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => { // 为什么要加setTimeout
            const x = onFulfilled(this.value);
            resolvePromise(p2, x, resolve, reject); 
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(()=> {
            const x = onRejected(this.reason);
            resolvePromise(p2, x, resolve, reject); 
          }, 0);
        });
      }
    });
    return p2;
  }
}

const resolvePromise = (p2, x, resolve, reject) => {
  if(p2 === x){
    return reject(new TypeError('循环引用'));
  }
  if(x !== null && (typeof x === 'function' || typeof x === 'object')){
    try {
      const then = x.then;
      if(typeof then === 'function'){ // promise
        then.call(x, y => {
          // resolve(y)
          resolvePromise(p2, y, resolve, reject);
        }, r => {
          reject(r)
        });
      }
    } catch(error) {
      reject(error);
    }
  } else {
    resolve(x);
  }
}

module.exports = Promise;