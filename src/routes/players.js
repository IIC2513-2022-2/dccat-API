const Router = require('koa-router');
const bcrypt = require('bcrypt');


const router = new Router();

router.post('players.create', '/', async (ctx) => {
  try {
    const hash_contraseña = await bcrypt.hash(ctx.request.body.password, 5);
    const player = await ctx.orm.Player.create({
      nickname: ctx.request.body.nickname,
      email: ctx.request.body.email,
      hash_contrasena: hash_contraseña
    });
    ctx.status = 201;
  } catch (error) {
    ctx.throw(error);
  }
})

router.get('players.show', '/', async (ctx) => {
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
module.exports = router;
