const Router = require('koa-router');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const router = new Router();

router.post("/login", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findOne({
            where: { email: ctx.request.body.email },
            include: [
                { model: ctx.orm.Match, attributes: ['id'] }
            ]
        });
        if (player) {
            if (bcrypt.compare(ctx.request.body.password, player.hash_contrasena)) {
                // Creamos la sesión en la base de datos y le agregamos el id a la cookie
                const new_session = await ctx.orm.Session.create({
                    userid: player.id
                });
                ctx.session.sessionid = new_session.id;

                // Agregamos el id del usuario a la session cookie
                ctx.session.userid = player.id;

                // Creamos el jwt
                payload = { matches: player.Matches };
                var token = JWT.sign(payload, `${process.env.JWT_SECRET}`);

                // Lo enviamos
                ctx.response.body = { token: token };

                ctx.status = 201;
            } else {
                ctx.throw("Contraseña incorrecta", 401);
            }
        } else {
            console.log("No encontrado");
            ctx.throw("Usuario con ese email no encontrado", 404);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(error);
    }
});

router.post('players.create', '/signup', async (ctx) => {
    try {
        const hash_contraseña = await bcrypt.hash(ctx.request.body.password, 5);
        const player = await ctx.orm.Player.create({
            nickname: ctx.request.body.nickname,
            email: ctx.request.body.email,
            hash_contrasena: hash_contraseña
        });
        ctx.status = 201;
    } catch (error) {
        ctx.throw(error);
    }
});

module.exports = router;

