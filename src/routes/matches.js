const Router = require('koa-router');

const router = new Router();

router.get('matches.show', '/:id/players/:playerId', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(
      ctx.params.id,
      {
        include: [
          { model: ctx.orm.Player, as: 'player1' },
          { model: ctx.orm.Player, as: 'player2' },
          { model: ctx.orm.Play },
        ],
      },
    );
    if (!match) {
      ctx.throw(404);
    }
    const requestPlayer = await ctx.orm.Player.findByPk(ctx.params.playerId);
    const player1 = await match.getPlayer1();
    const player2 = await match.getPlayer2();
    const plays = await match.getPlays();
    if (![player1.id, player2.id].includes(requestPlayer.id)) {
      ctx.throw('No tienes permiso para acceder al tablero', 403);
    }
    const moves0 = plays.filter((play) => play.player === requestPlayer.id)
      .map((play) => [play.dataValues.x, play.dataValues.y], []);
    const moves1 = plays.filter((play) => play.player !== requestPlayer.id)
      .map((play) => [play.dataValues.x, play.dataValues.y], []);

    ctx.body = {
      0: moves0,
      1: moves1,
      current: match.current,
      turno: match.turno,
      player1,
      player2,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(error);
  }
});

router.get('matches.index', '/', async (ctx) => {
  const match = await ctx.orm.Match.findAll({
    include: [
      { model: ctx.orm.Player, as: 'player1' },
      { model: ctx.orm.Player, as: 'player2' },
      { model: ctx.orm.Player, as: 'currentPlayer' },
    ],
  });
  ctx.body = match;
});

// GET /matches/:matchId/player1
router.get('matches.player1', '/:id/player1', async (ctx) => {
  const match = await ctx.orm.Match.findByPk(ctx.params.id);
  const player1 = await match.getPlayer1();
  ctx.body = player1;
});

// GET /matches/:matchId/player2
router.get('matches.player2', '/:id/player2', async (ctx) => {
  const match = await ctx.orm.Match.findByPk(ctx.params.id);
  const player2 = await match.getPlayer2();
  ctx.body = player2;
});

// GET /matches/:matchId/currentPlayer
router.get('matches.currentPlayer', '/:id/currentPlayer', async (ctx) => {
  const match = await ctx.orm.Match.findByPk(ctx.params.id);
  const player2 = await match.getCurrentPlayer();
  ctx.body = player2;
});

module.exports = router;
