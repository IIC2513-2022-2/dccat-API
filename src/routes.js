const Router = require('koa-router');
const movies = require('./routes/movies');
const firstGet = require('./routes/firstGet');

const router = new Router();

router.use('/movies', movies.routes());
router.use('/firstGet', firstGet.routes());

module.exports = router;
