const Router = require('koa-router');
const {resolve} = require("path");
const glob = require("glob");
const R = require("ramda")
const symbolPrefix = Symbol('prefix');
const routerMap = new Map();
export class Route{
  constructor(app, apiPath){
    this.app = app;
    this.apiPath = apiPath;
    this.router = new Router();
  }
  init(){
      // 加载路有文件，同时初始化每一个路由控制器
      glob.sync(resolve(this.apiPath, "./**/*.js")).forEach(require)
      for(let [conf, controller] of routerMap){
        const controllers = toArray(controller);
        let prefixPath = conf.target[symbolPrefix];
        if(prefixPath) prefixPath = normalizePath(prefixPath);
        const routerPath = prefixPath + conf.path;
        if(!conf["method"]){
          conf["method"] = "GET";
        }
        
        this.router[conf.method.toLowerCase()](routerPath, ...controllers)
      }
      this.app.use(this.router.routes())
      this.app.use(this.router.allowedMethods())
  }
}
const toArray = c => Array.isArray(c)? c : [c];
const normalizePath = path => path.startsWith("/")? path : `/${path}`;

const router = conf => (target, key) => {
  conf.path = normalizePath(conf.path);
  routerMap.set({
    target,
    ...conf
  }, target[key]);
}

export const controller = path => (target) => target.prototype[symbolPrefix] = path;

export const get = path => router({
  method: 'get',
  path,
});

export const post = path => router({
  method: 'POST',
  path: path
});

export const put = path => router({
  method: 'PUT',
  path: path
});

export const del = path => router({
  method: 'DEL',
  path: path
});

export const use = path => router({
  method: 'USE',
  path: path
});

export const all = path => router({
  method: 'ALL',
  path: path
});

const decorate = (args, middleware) => {
  let [target, key, descriptor] = args;
  // 添加到key
  target[key] = toArray(target[key]);
  target[key].unshift(middleware)
  return descriptor;
}

const convert = middleware => (...args) => decorate(args, middleware);

// 把中间件加载在target[key]
export const auth = convert(async (ctx, next) => {
  if(!ctx.user){
    return (
      ctx.body = {
        success: false,
        code: 401,
        err: '登录信息失效,重新登录'
      }
    );
  }
  await next();
});

export const admin = role => convert(async (ctx, next)=> {
  // const {role} = ctx.session.user;
  const rules = { // 分配不同的权限值
    admin: [1, 2, 5],
    supperAdmin: [1,2,3,4]
  };
  if(!role || role !== 'admin'){
    return ctx.body = {
      success: false,
      code:403,
      err: '没有权限,来做地方了'
    }
  }
  await next();
});

export const log = convert(async (ctx, next) => {
  await next();
  console.log(ctx.body, 'asdsa');
});

export const required = rules => convert(async (ctx, next) => {
  let errors = [];
  const checkRules = R.forEachObjIndexed(
    (value,key) => {
      errors = R.filter(i => !R.has(i, ctx, ctx.request[key]))(value)
    }
  );
  checkRules(rules);
  
  if(errors.length) {
    ctx.body = {
      status: false,
      code: 412,
      err: `${errors.join(',')} is required`
    }
    return 
  } 
  await next();
});