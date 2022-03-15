// import Http from './export.js'
import Modal from './modalControl.js'

/*
  导入 import 变量名 form 文件路径

  导出 export 导出内容
*/
let modal = new Modal({
  hbsTemp: Handlebars.templates['modal.hbs'],
  modalWarp: $('.blog-modal'),
  successCallback (data) {
    console.log('提交成功', data)
  }, closeCallback (data) {
    console.log('关闭页面', data)
  }
})

