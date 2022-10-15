module.exports = async (ctx, next) => {
    if (!ctx.session.userid) {
        ctx.throw("Debes iniciar sesión", 401);
    }
    console.log(ctx.session.userid);
    await next();
};