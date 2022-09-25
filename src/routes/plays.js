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

router.post('plays.create', '/', async (ctx) => {
  try {
    const match = await ctx.orm.Match.findByPk(ctx.request.body.match_id, {
      include: [
        {
          model: ctx.orm.Play,
          required: false,
        },
      ],
    });
    // construimos un array que tenga las posiciones utilizadas en formato 'x,y'
    const plays = match.Plays.map((play) => `${play.dataValues.x}, ${play.dataValues.y}`);
    if (![match.player_1, match.player_2].includes(ctx.request.body.player)) {
      ctx.throw('No tienes permiso para realizar esta jugada', 403);
    }
    if (match.current !== (ctx.request.body.player)) {
      ctx.throw('No es tu turno', 403);
    }
    if (!(ctx.request.body.x >= 0 && ctx.request.body.x <= 2)
    || !(ctx.request.body.y >= 0 && ctx.request.body.y <= 2)) {
      ctx.throw('La casilla ingresada no existe', 400);
    }
    if (plays.includes(`${ctx.request.body.x}, ${ctx.request.body.y}`)) {
      ctx.throw('El casillero ya ha sido utilizado en otra jugada', 400);
    }

    const play = await ctx.orm.Play.create(ctx.request.body);
    match.turno += 1;
    match.current = ctx.request.body.player === match.player_1 ? match.player_2 : match.player_1;
    match.save();
    ctx.throw(play.dataValues, 201);
  } catch (error) {
    ctx.throw(error);
  }
});

module.exports = router;
