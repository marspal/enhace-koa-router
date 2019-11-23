  
const Koa = require("koa");
const {resolve} = require("path");
const R = require("ramda");

const MIDDLEWARES = ['common','router'];

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
  await useMiddlewares(app)
  app.listen(8080, ()=> {
    console.log('server');
  })
})();