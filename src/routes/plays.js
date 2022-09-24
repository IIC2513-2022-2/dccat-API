const Router = require('koa-router');

const router = new Router();

router.get('plays.show', '/', async (ctx) => {
  try {
    const play = await ctx.orm.Play.findAll({
      include: [
        { model: ctx.orm.Match },
        { model: ctx.orm.Player },
      ],
    });
    ctx.body = play;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});
module.exports = router;
