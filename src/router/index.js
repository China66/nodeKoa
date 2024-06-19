const fs = require("fs");
const Router = require("koa-router");
const route = new Router();

fs.readdirSync(__dirname).forEach(file =>{
  if(file !== "index.js"){
    let r = require("./"+file);
    route.use(r.routes());
  }
})
 
// 检查文件是否可访问
// fs.access(__dirname, fs.constants.F_OK, (err) => {
//   if (err) {
//     console.error(`${__dirname} does not exist.`);
//     // 创建文件后再写入内容
//     fs.writeFile(__dirname, 'Your content here', (createErr) => {
//       // if (createErr) throw createErr;
//       console.log('File created and content written.');
//     });
//   } else {
//     // 文件存在，直接写入内容
//     fs.writeFile(__dirname, 'Your content here', (writeErr) => {
//       if (writeErr) throw writeErr;
//       console.log('Content written to existing file.');
//     });
//   }
// });

module.exports = route;
