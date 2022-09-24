const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('../models');

const app = new Koa();

// Atach Sequelize ORM to the context of the App
app.context.orm = orm;

app.use(cors());

// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

app.use(router.routes());

module.exports = app;
