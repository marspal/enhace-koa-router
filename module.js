var MyModules = (function Manager(){
  var modules = {};
  function define(name, deps, impl){
    // deps模块依赖
    for(var i = 0; i < deps.length; ++i){
      // 把deps中的每一个模块切换成modules模块
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }
  function get(name){
    return modules[name];
  }
  return {
    define: define,
    get: get,
  }
})();

// modules[name] = impl.apply(impl, deps)

MyModules.define("bar", [], function(){
  function hello(who){
    return "Let me introduce: " + who;
  }
  return {
    hello: hello,
  }
});

MyModules.define("foo", ["bar"], function(bar){
  var hungry = "hippo";

  function awesome(){
    console.log(bar.hello(hungry).toUpperCase());
  }
  return {
    awesome: awesome
  }
});

// var bar = MyModules.get("bar");
// var foo = MyModules.get("foo");

// console.log(bar.hello("hippo"));
// foo.awesome();
function foo() { 
  // a RHS引用到了全局作用域中的a, 因此会输出2 调用栈 词法作用域链, 词法作用域是写代码或者说定义时确定的
  console.log( a ); // 2
}

function bar(){
  var a = 3;
  foo();
}

var a = 2;
// bar();

var a = {
  a: 11,
  test: function() {
    console.log(this);
    setTimeout(()=>{
      console.log(this.a)
    },0)
  }
}
a.test();
a.test.apply({a: 12});

// arguments.callee来引用当前正在运行的函数对象

// this. 全面解析