const Router = require('koa-router');
const auth_middle = require('./middlewares/auth');
const matches = require('./routes/matches');
const players = require('./routes/players');
const plays = require('./routes/plays');
const auth = require('./routes/auth');

const router = new Router();

router.use('/auth', auth.routes());

router.use('/matches', auth_middle, matches.routes());
router.use('/players', auth_middle, players.routes());
router.use('/plays', auth_middle, plays.routes());

module.exports = router;