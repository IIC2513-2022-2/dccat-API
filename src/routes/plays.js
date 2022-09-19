const Router = require('koa-router');

const router = new Router();
const {Play} = require('../../models');

router.get('plays.show', '/', async (ctx) => {
  await Play.findAll({}).then((plays) => {
    console.log(plays);
    ctx.body={plays};
}).catch((err) => {
    console.log(err);
});
});
module.exports = router;
