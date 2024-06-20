# 一、 使用Koa搭建服务的基建

1.新建nodeKoa文件
2.使用npm/pnpm/yarn初始化文件，执行yarn init
3.引入主体服务依赖Koa，yarn add koa
4.新建main.js文件
```
const Koa = require('koa');
const app = new Koa();
app.on('error',(error)=>{
  console.log('serve启动fail',error)
})
app.listen(3000,()=>{
  console.log('服务启动success！')
})
```
5.执行node main.js,检测服务是否启动ok

注意：直接在项目root文件下，和项目有些出入，下面会声明迁移

# 二、服务基建的router建设
1. 引入路由依赖，koa-router，yarn add koa-router
2. 新建router文件，在router新建index.js,调用router
```
const Router = require('koa-router');
const route = new Router({
  prefix:"/api"
})
route.post('/',(ctx,next) =>{
  ctx.body = {
    code:0,
    message:"这是我的第一个api服务",
    result:{}
  }
})
module.exports = route;
```
3.导入主服务进程文件main.js,并且注册路由
```
...
const route = require("./router/index.js");
app.use(route.routes()).use(route.allowMethods());
```
4.测试，执行node ./main.js,打开postCode或者postMan调用api

# 三、服务基建的热更新建设
1.添加nodemon，yarn add nodemon --dev
2.配置被监控服对象，新建nodemon.json
```
{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["src/**/*.test.js"],
  "exec": "node main.js"
}
```
3.在package.json文件下，配置scripts属性
```
"scripts": {
    "dev": "nodemon main.js"
  },
```
4.检测结果，在终端执行 yarn dev，修改文件代码，通过console来验证

# 四、服务基建的环境对象设置建设
1.引入dotenv，yarn add dotenv --dev
2.新建.env文件，设置环境变量
3.测试，在main.js文件导入
```
const { HOST,APOR } = require('dotenv').config().parsed;
console.log(HOST,APOR);
```
# 五、服务基建的body解析建设
1. 引入koa-koa，yarn add koa-body
2. 注册,在main.js文件下
```
...
const koaBody = require('koa-body');
app.use(koaBody())
```
3. 允许文件上传配置
```
...
const koaBody = require('koa-body');
app.use(koaBody({

}))
```
4.测试，在postMan中，调用api，结合console将ctx.request打印出来，文件上传功能，就需要写文件上传的api，由于是基建这里就不实现出来

# 六、服务基建的连接数据建设


整个服务基础基本完成了！
注意：这里服务的基建建设，不会涉及到真正的业务需求！





