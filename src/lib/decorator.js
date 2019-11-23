const Router = require('koa-router');
const { resolve } = require("path");
const glob = require("glob");

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
        const controllers = Array.isArray(controller);
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

const normalizePath = path => path.startsWith("/")? path : `/${path}`;

const router = conf => (target, key, descriptor) => {
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