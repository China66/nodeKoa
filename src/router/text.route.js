const Router = require("koa-router");
const route = new Router({
  prefix:"/text"
})
route.post("/",(ctx,next) =>{
  console.log("text router test success！")
})
route.get("/",(ctx,next) =>{
  console.log("text router test success！")
})
module.exports = route