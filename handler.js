const Koa = require('koa');
const Router = require('@koa/router');
const serverless = require("serverless-http");
const getVinylCollection = require('./getVinylCollection');
const parseVinylCollection = require('./parseVinylCollection');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  try {
    const vinylCollection = await getVinylCollection();
    const parsedVinylCollection = parseVinylCollection(vinylCollection);
    ctx.body = parsedVinylCollection;
    ctx.status = 200;
  } catch (err) {
    console.log(err);
    ctx.body = {"error": "unable to retrieve vinyl collection"};
    ctx.status = 500;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const server = serverless(app, {
  basePath: 'vinyl-collection'
});
module.exports.vinylCollection = server; 
