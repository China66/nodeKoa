# 一、 服务器连接的基建搭建--Mysql

1.安装mysql
2.检测mysql
```open 终端
mysql --version
```
3.安装mysql的管理工具Navicat Preminum
```
缺点就是：断开后或者关闭app后，无法继续使用，需要重新卸载，重新安装
优点：免费，绿色版
```
4.检测管理Tool连接数据库
```
```

# 二、集成数据操作之Sequelize

1. 安装，yarn add sequelize mysql2 --dev
2. 检测安装是否成功，打开package.json文件,是否存在下面代码
```
"devDependencies": {
    "mysql2": "^3.10.2",
    "sequelize": "^6.37.3"
  }
```
3. 在src/，创建seq的文件，在seq/下创建index.js

```index.js
const { Sequelize } = require("sequelize");
const global = {
  database: "数据库地址",
  sqlUser: "数据账号名称",
  sqlPassword: "账号密码"
}
const seq = new Sequelize(global.database,global.sqlUser,global.sqlPassword,{
  dialect:"mysql2", // 数据库类型
  host:"http://localhost:3000" // 我是使用过本地数据库，实际的业务直接切换为服务器的主机地址
})
```

4.检测，是否和数据建立通信,在src/seq/index.js继续添加检测code
```src/seq/index.js
const testConnect = async () =>{
  try{
    await seq.authenticate()
    console.log("connect successful!")
  }catch(error){
    console.log("connect is error!",error)
  }
}
testConnect() //测试完成后，注销
```
最后在终端执行：node src/seq/index.js 脚本

5. 导出seq，在src/seq/index.js继续添加code
```
module.exports = seq;
```

# 三、服务基建的热更新建设
