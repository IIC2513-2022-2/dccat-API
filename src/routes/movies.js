const Router = require('koa-router');

const router = new Router();

router.get('movies.show', '/', async (ctx) => {
  ctx.body = await ctx.orm.Movies.findAll();
})

module.exports = router;
