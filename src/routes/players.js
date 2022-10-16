const Router = require('koa-router');


const router = new Router();

router.get('players.show', '/', async (ctx) => {
  try {
    const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
    const playerid = session.userid;

    const player = await ctx.orm.Player.findByPk(playerid,
      {
        include: [
          { model: ctx.orm.Play },
          { model: ctx.orm.Match },
        ],
      },
    );
    ctx.body = player;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});
module.exports = router;