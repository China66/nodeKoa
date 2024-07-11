const Koa = require("koa");
const app = new Koa();
const { koaBody } = require("koa-body");
const route = require("../router/index");
app.use(koaBody({
  multipart: true
}))
app.use(route.routes()).use(route.allowedMethods());
app.on("error",(err,ctx) =>{
  console.log("错误提示",err)
})

module.exports = app;
