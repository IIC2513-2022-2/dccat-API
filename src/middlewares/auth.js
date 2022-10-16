module.exports = async (ctx, next) => {
    if (!ctx.session.sessionid) {
        ctx.throw("Debes iniciar sesión", 401);
    }

    try {
        const session = await ctx.orm.Session.findByPk(ctx.session.sessionid);
        if (session) {
            await next();
        } else {
            ctx.throw('Sesión inválida, vuelve a iniciar sesión');
        }
    } catch (error) {
        ctx.throw(error);
    }
};