const Koa = require('koa');
const koaBody = require('koa-body');
const KoaLogger = require('koa-logger');
const router = require('./routes');
const cors = require('@koa/cors');

const PORT = 3000;

const app = new Koa();


app.use(cors());


// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

// app.use((ctx, next) => {
//   ctx.body = "Hello 2048 DCC!";
// })

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Starting app in port ${PORT}`);
});
