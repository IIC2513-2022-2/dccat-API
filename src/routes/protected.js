const Router = require('koa-router');


const router = new Router();

router.delete('matches.delete', '/delete/:id_match', async (ctx) => {
    try {
        // Buscamos ctx.params.id_Match
        var found = false
        console.log(ctx.state.tokendata.matches);

        ctx.state.tokendata.matches.forEach(match => {
            if (match.id == ctx.params.id_match) {
                found = true;
            };
        });

        if (found) {
            const response = await ctx.orm.Match.destroy({
                where: { id: `${ctx.params.id_match}` }
            })
            ctx.response.status = 202;
        } else {
            ctx.throw('No tienes permiso para eliminar esta partida', 401);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(404);
    }
});
module.exports = router;