/**
 * 创建表，传健模型
 * 1、使用code创建
 * 2、使用数据库管理UI传健，比较容易上手（俗称傻瓜式）
 * 3、使用sql的语法在终端创建，比较繁琐（mysql的语法繁琐）
*/
const seq = require("./../seq/index");
const { DataTypes } = require("sequelize");
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
// userRegister.sync({
//   focus: true
// }) // 执行成功后注销
module.exports = userRegister;