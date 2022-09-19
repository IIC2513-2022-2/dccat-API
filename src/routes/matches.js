const Router = require('koa-router');

const router = new Router();
const {Match} = require('../../models');


router.get('matches.show', '/', async (ctx) => {
  await Match.findAll({}).then((matches) => {
    console.log(matches);
    ctx.body=matches;
}).catch((err) => {
    console.log(err);
});
});

module.exports = router;

