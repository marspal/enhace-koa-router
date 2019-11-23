  
const Koa = require("koa");
const Router = require('koa-router');
const {resolve} = require("path");
const R = require("ramda");

const MIDDLEWARES = ['router'];

const useMiddlewares = async (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}
;(async () => {
  const app = new Koa();
  const router = new Router();
  router.get('/', (ctx, next) => {
    ctx.body = {
      status: 'success'
    }
  });
  
  await useMiddlewares(app)
  app.listen(8080)
})();