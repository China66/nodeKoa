const { Sequelize } = require("sequelize");
const global = {
  database: "zdev",
  sqlUser: "root",
  sqlPassword: "12345678",
  host:"localhost"
}
const seq = new Sequelize(global.database,global.sqlUser,global.sqlPassword,{
  host: global.host,// 我是使用过本地数据库，实际的业务直接切换为服务器的主机地址
  dialect:"mysql" // 数据库类型
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