const Router = require('koa-router');
const matches = require('./routes/matches');
const players = require('./routes/players');
const plays = require('./routes/plays');

const router = new Router();

router.use('/matches', matches.routes());
router.use('/players', players.routes());
router.use('/plays', plays.routes());
module.exports = router;
