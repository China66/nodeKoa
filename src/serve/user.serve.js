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
  // 很少了有删除客户的操作，这里拿来做案例
  async destroyUser(user_id,is_admin){
    try{
      if(!is_admin){
        return {
          message: "非管理员无法删除客户"
        }
      }
      const res = userRegister.destroy({
        where:{
          id: user_id
        }
      })
      return res > 0 ? true : false
    }catch(error){
      console.log("error",error)
    }
  }
}
// const userServeTest = new userServe()
// userServeTest.userServeTest("小花","12345678") 
// module.exports = new userServe()