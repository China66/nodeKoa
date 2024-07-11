const app = require("../src/app/index");
// const process = require("process");
/** net*/ 
// const net = require('net'); 
// console.log(net.Socket()) 
const { HOST,APOR } = require('dotenv').config().parsed;

app.listen(APOR,() =>{
  console.log(`${HOST}服务器启动success！`)
})