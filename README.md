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
  host:"localhost"
}
const seq = new Sequelize(global.database,global.sqlUser,global.sqlPassword,{
  host:global.host, // 我是使用过本地数据库，实际的业务直接切换为服务器的主机地址
  dialect:"mysql" // 数据库类型
  
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

```终端显示的测试结果：

nodeKoa % node ./src/seq/index.js
Executing (default): SELECT 1+1 AS result
connect successful!

```

5. 导出seq，在src/seq/index.js继续添加code
```
module.exports = seq;
```

# 三、连接数据库服务基建搭建模型（创建表）
1. 创建文件model/user.model.js， 导入通信对象
```user.model.js
const seq = require("./../seq/index");
const { DataTypes } = require("sequelize"); // 对model的属性定义类型
```
2. 创建模型，定义模型属性
```user.model.js
const userRegister = seq.define("zdev_users",{
  user_name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "用户注册的账号名称"
  },
  password: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment:"密码"
  },
  is_admin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment:"是否为管理员"
  }
})
userRegister.sync({
  focus: true
}) //
```
打开终端，执行： node ./src/model/user.model.js

3. 检测
打开数据库管理UI工具，点开数据库zdev可以看到名为zdev_users的用户表;这里不做展示；
4. 导出
```user.model.js

...
<!-- userRegister.sync({
  focus: true
})  --> //这是同步传健表格，已经创建所有没必要再去重复执行，创建成功后直接注销
module.exports = userRegister;
```

# 四、服务基建之使用模型的增、删、查、改
下面的操作，是在创建了src/serve/user.serve.js下进行；
1. 增
```src/serve/user.serve.js
const  userRegister = require("./../model/user.model");
class userServe {
  async createUser (user_name="小花",password = "12345678"){ //
    try{
      const res = await userRegister.create({
        user_name,
        password
      })
      return res? res.dataValues : null
    }catch(error){
      console.log("error",error)
    }
  }
}
```
1.2 增,检测结果
```src/serve/user.serve.js
...
const userServeTest = new userServe()
userServeTest.userServeTest("小花","12345678") 

```
在终端，执行：node src/serve/user.serve.js，结果可以先看终端是否报错，在看数据库的管理工具的数据表是否已经入库，如果有就证明已经入库成功，如果没有，看打印出来的错误提示


2. 删
```src/serve/user.serve.js
...
// 很少了有删除客户的操作，这里拿来做案例
  async destroyUser(destroy_user_id,user_id,is_admin){
    try{
      if(!is_admin){
        return {
          message: "非管理员无法删除客户"
        }
      }
      const res = userRegister.destroy({
        where:{
          id: destroy_user_id
        }
      })
      return res > 0 ? true : false
    }catch(error){
      console.log("error",error)
    }
  }
```
2.1 删,检测结果（两种检测方式，为了具体呈现出来，所有现在中，不是说另一种不能具像化出来，而是不方便我编写）
```src/serve/user.serve.js
...
const userServeTest = new userServe()
userServeTest.destroyUser(1,2,true) // 1:用户笑话的id;2为管理员小棒的id;true小棒的是不是管理员
/**
  destroy_id:被删除的用户数据id
  id: 删除使用操作的管理员id
  admin: 判断该操作用户是否为管理员
  实操的时候：自己打开数据库数据表，直接拿表上的数据操作
*/
```
在终端，执行：node src/serve/user.serve.js，结果可以先看终端是否报错，在看数据库的管理工具的数据表是否已经删除，如果有就证明已经删除成功，如果没有，看打印出来的错误提示

3. 查
```src/serve/user.serve.js
...
async findUser(id,user_name,password,is_admin){ // user_name,password,is_admin可以不用传递
    try{
      // 实际在做些数据库操作之前，都会做一个参数校验
      // 这里没有做，是因为这里是基础部分，会在实际功能业务上输出
      const res = userRegister.findOne({
        attributes:["id","user_name","password","is_admin"],
        where:{id}
      })
      return res[0] ? res.dataValues : null
    }catch(error){
      console.log("error",error)
    }
  }
```
3.1 查,检测结果
```src/serve/user.serve.js
...
const userServeTest = new userServe()
userServeTest.findUser(1) // 查询id为1的用户数据
```
在终端，执行：node src/serve/user.serve.js，结果可以先看终端是否报错，在看数据库的管理工具的数据表是否已经删除，如果有就证明已经删除成功，如果没有，看打印出来的错误提示

4. 改
```src/serve/user.serve.js
```
4.1 改,检测结果
```在终端输出

```


# 五、服务基建之联表操作
1. 表之间的关系建立
2. 使用联表查询
3. 检测结果


# 六、服务基建之与路由进行桥接
1. 表之间的关系建立
2. 使用联表查询
3. 检测结果

# 七、项目的文件结构


提示：这个分支涉及较深的业务逻辑，所有不会有control层和middleWare，会下个终极分支涉及到,还会涉及一些功能性业务（方便项目结构优化）




