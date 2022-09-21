const Router = require('koa-router');

const router = new Router();

router.get('matches.show', '/', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findOne(
      {
        include: [
          { model: ctx.orm.Player, as: "player1" },
          { model: ctx.orm.Player, as: "player2" },
          { model: ctx.orm.Play},
        ]
      });
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const currentPlayer = await match.getCurrentPlayer();
    const plays = await match.getPlays();
    ctx.body = {
      "match": match,
      "player1": player1,
      "player2": player2,
      "currentPlayer": currentPlayer,
      "plays": plays,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

module.exports = router;

