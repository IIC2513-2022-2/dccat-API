const Router = require('koa-router');

const router = new Router();
const {Player} = require('../../models');

router.get('players.show', '/', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll(
      {
        include: [
          {model: ctx.orm.Play},
          {model: ctx.orm.Match},
        ]
      }
    );
    ctx.body = players;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});
module.exports = router;