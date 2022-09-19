const Router = require('koa-router');

const router = new Router();
const {Player} = require('../../models');

router.get('players.show', '/', async (ctx) => {
  await Player.findAll({}).then((players) => {
    console.log(players);
    ctx.body=players;
}).catch((err) => {
    console.log(err);
});
});
module.exports = router;