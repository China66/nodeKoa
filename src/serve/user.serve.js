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
const userServeTest = new userServe()
userServeTest.userServeTest("小花","12345678") 
// module.exports = new userServe()