function cloneShallow(source){
  var target = {};
  for(var key in source){
    console.log(source.hasOwnProperty());
    if(Object.prototype.hasOwnProperty.call(source, key)){
      target[key] = source[key];
    }
  }
  return target;
}

var a = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  },
  a1: undefined,
  a2: null,
  a3: 123,
  saa: Symbol('saa'),
  // test: function(){},
};

// var b = cloneShallow(a);
// console.log(b);

// var b = cloneDeep1(a);


a.name = "高级前端进阶";
a.book.price = "55";

function cloneDeep1(source){
  if(!isObject(source)) return source; 
  var target = Array.isArray(source)? [] : {};
  for(var key in source){
    if(Object.prototype.hasOwnProperty.call(source, key)){
      if(isObject(source[key])){
        target[key] = cloneDeep1(source[key])
      }else{
        target[key] = source[key]
      }
    }
  }
  return target;
}

function isObject(obj){
  return typeof obj === 'object' && obj != null;
}

// 测试用例

// var a = [1,[2,3,4]];
// var b = cloneDeep1(a);
// a[1][0] = 3;

// a.circleRef = a;
var b = cloneDeep2(a);
console.log(a);
console.log(b);
// JSON.parse(JSON.stringify(a));

// 使用hash表
function cloneDeep2(source, hash = new WeakMap()){
  if(!isObject(source)) return source; 
  if(hash.has(source)) return hash.get(source);
  var target = Array.isArray(source)? [] : {};
  hash.set(source, target); // 新增代码, hash设值
  for(var key in source){
    if(Object.prototype.hasOwnProperty.call(source, key)){
      if(isObject(source[key])){
        target[key] = cloneDeep2(source[key], hash)
      }else{
        target[key] = source[key]
      }
    }
  }
  return target;
}

// 使用数组
function deepClone3(source, uniqueList){
  if(!isObject[source]) return source;
  if(!uniqueList) uniqueList = [];

  var target = Array.isArray(source)? [] : {};

  var uniqueData = find(uniqueList, source);
  if(uniqueData){
    return uniqueList.target;
  }

  uniqueList.push({
    source: source,
    target: target
  });
  
  for(var key in source){
    if(Object.prototype.hasOwnProperty.call(source, key)){
      if(isObject(source[key])){
        target[key] = deepClone3(source[key], uniqueList);
      }else{
        target[key] = source[key];
      }
    }
  }
  return target;
}

function find(arr, item) {
  for(var i = 0; i < arr.length; i++) {
      if (arr[i].source === item) {
          return arr[i];
      }
  }
  return null;
}

// typeof null typeof {} typeof []

// 问题get set属性的拷贝有问题