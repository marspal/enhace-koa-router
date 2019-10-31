function * go(a){
  console.log(1);
  
  const b = yield a;
  console.log(2);
  const c = yield b;
  console.log(3);
  return c;
}

// 第一次传参没有意义.
let it = go('aa');

console.log(it.next());
console.log(it.next('ssdasda'));
console.log(it.next('asdasdas'));