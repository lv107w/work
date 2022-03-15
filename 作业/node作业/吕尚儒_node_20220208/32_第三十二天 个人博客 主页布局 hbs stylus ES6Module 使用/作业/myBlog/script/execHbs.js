const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const templatePath = path.join(process.cwd(), './template')
const viewPath = path.join(process.cwd(), './views')

/*hbs 模板引擎渲染 指令
  handlebars -f ./template/*.hbs ./views/*.template.js
  //handlebars -f hbs源文件地址 编译后文件输出地址
*/

fs.readdir(templatePath, 'utf-8', (err, data) => {
  if(err) {
    console.error(err);
  }
  if(data) {
    data.map(item => {
      let {ext, name, base} = path.parse(item)
      if(ext === '.hbs') {
        //exec 就是 shell cmd
        // let original = path.join(templatePath, `${name}.hbs`)
        // let output = path.join(viewPath, `${name}.template.js`)
        exec(`handlebars ./template/${name}.hbs -f ./views/${name}.template.js`)
      }
    })
  }
})
