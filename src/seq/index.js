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
const testConnect = async () =>{
  try{
    await seq.authenticate()
    console.log("connect successful!")
  }catch(error){
    console.log("connect is error!",error)
  }
}
testConnect() //测试完成后，注销

module.exports = seq;