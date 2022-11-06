const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('../models');
const session = require('koa-session');
const app = new Koa();

// Atach Sequelize ORM to the context of the App
app.context.orm = orm;

app.use(cors(({ credentials: true })));

// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

// Session
app.keys = [`${process.env.SECRET_KEY}`];

const CONFIG = {
    httpOnly: false,
}
app.use(session(CONFIG, app));

app.use(router.routes());

module.exports = app;

