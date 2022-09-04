import Router from "koa-router"
import movies from "./routes/movies.js";

const router = new Router();

router.use('/movies', movies.routes());

export default router;
