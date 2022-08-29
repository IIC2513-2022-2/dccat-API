import Koa from "koa";
import koaBody from "koa-body";
import KoaLogger from "koa-logger";

const PORT = 3000;

const app = new Koa();

// Logs requests from the server
app.use(KoaLogger());

// Parse Request Body
app.use(koaBody());

app.use((ctx, next) => {
  ctx.body = "Hello 2048 DCC!";
})

app.listen(PORT, () => {
  console.log(`Starting app in port ${PORT}`);
});
