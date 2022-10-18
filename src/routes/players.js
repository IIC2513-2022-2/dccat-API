const Router = require('koa-router');
const bcrypt = require('bcrypt');

const router = new Router();

router.post('players.create', '/', async (ctx) => {
  try {
    const hashContraseña = await bcrypt.hash(ctx.request.body.password, 5);
    const player = await ctx.orm.Player.create({
      nickname: ctx.request.body.nickname,
      email: ctx.request.body.email,
      hash_contrasena: hashContraseña,
    });
    ctx.status = 201;
    ctx.body = player;
  } catch (error) {
    ctx.throw(error);
  }
});

router.get('players.index', '/', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll(
      {
        include: [
          { model: ctx.orm.Play },
          { model: ctx.orm.Match },
        ],
      },
    );
    ctx.body = players;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

router.get('players.show', '/:id', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Play },
        { model: ctx.orm.Match, as: 'matchesPlayer1' },
        { model: ctx.orm.Match, as: 'matchesPlayer2' },
      ],
    });

    // We combine both matches array into just one matches property
    const matches = [...player.matchesPlayer1, ...player.matchesPlayer2];
    const serializedPlayer = {
      ...player.toJSON(),
      matches,
    };
    delete serializedPlayer.matchesPlayer1;
    delete serializedPlayer.matchesPlayer2;
    ctx.body = serializedPlayer;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});

// This endpoint is only to show how to call the ORM in this implementation, 
// could be changed for a test.

// GET players/:playerId/matchesCurrentPlayer
router.get('players.matches', '/:id/matchesCurrentPlayer', async (ctx) => {
  try {
    const player = await ctx.orm.Player.findByPk(ctx.params.id, {
      include: [
        { model: ctx.orm.Match, as: 'matchesCurrentPlayer' },
      ],
    });

    ctx.body = player.matchesCurrentPlayer;
  } catch (error) {
    console.log(error);
    ctx.throw(404);
  }
});
module.exports = router;
