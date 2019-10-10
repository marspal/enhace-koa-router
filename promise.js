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
    if(this.state === 'fulfilled'){
      onFulfilled(this.value);
    }
    if(this.state === 'rejected'){
      onRejected(this.reason);
    }
    if(this.state === 'pending'){
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      });
      this.onResolvedCallbacks.push(()=> {
        console.log(this.value, 'aaaa');
        onFulfilled(this.value)
      });
    }
  }
}

module.exports = Promise;