const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const templatePath = path.join(process.cwd(), './template')
const viewPath = path.join(process.cwd(), './views')

/*
  handlebars -f ./template/*.hbs ./views/*.template.js


*/

fs.readdir(templatePath, 'utf8', (err, datas) => {
  //datas [目录内文件名称]
  if (err) {
    console.error(err)
  }
  if (datas) {
    datas.map(item => {
      let { name, base, ext } = path.parse(item)
      if (ext === '.hbs') {
        //exec 执行系统命令 shell cmd
        //handlebars -f hbs源文件地址 编译后文件输出地址
        let original = path.join(templatePath, `${name}.hbs`)
        let output = path.join(viewPath, `${name}.template.js`)
        exec(` handlebars ./template/${name}.hbs -f ./views/${name}.template.js`)//
      }
    })
  }
})