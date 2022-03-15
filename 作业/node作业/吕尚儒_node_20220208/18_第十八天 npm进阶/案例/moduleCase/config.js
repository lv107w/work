//服务器静态配置
console.log(process.cwd())
module.exports = {
  root: process.cwd(), // 项目根目录的绝对路径
  host: '127.0.0.1', //服务器的 主机地址
  port: '3001' // 服务器监听的端口
}