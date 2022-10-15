const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const protected_router = require('./routes/protected');
const orm = require('../models');
const session = require('koa-session');
const jwt = require('koa-jwt');

const app = new Koa();

// Atach Sequelize ORM to the context of the App
app.context.orm = orm;

app.use(cors());

// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

// Session
app.keys = ['Llave secreta'];
app.use(session(app));

app.use(router.routes());

app.use(jwt({ secret: process.env.JWT_SECRET, key: 'tokendata' }));

app.use(protected_router.routes());

module.exports = app;

