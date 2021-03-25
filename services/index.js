const Koa = require("koa");
const Router = require("koa-router");
const Cors = require("koa2-cors");
const router = new Router();
const App = new Koa();
App.use(Cors());
App.use(router.routes());

async function delayer(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

router.get("/", async (ctx, next) => {
  console.log("ctx", ctx);
  await delayer(5000);
  await next();
  ctx.body = {
    a: "aa",
  };
});

App.listen("3000", (res) => {
  console.log(res, "3000端口启动");
});
