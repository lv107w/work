import Http from './export.js'
import Modal from './modalControl.js'
import RegExpVerify from './validate.js'










/*
  导入 import 变量名 form 文件路径

  导出 export 导出内容
*/
let modal = new Modal({
  hbsTemp: Handlebars.templates['modal.hbs'],
  modalWarp: $('.blog-modal'),
  drawCallback (formType) {
    $(`#${formType}`).on('blur', 'input', (e) => {
      let $target = $(e.target)
      $target.parent().removeClass('blog-error--input')[0].dataset['msg'] = ''
    })
    modal.validator = new RegExpVerify(formType, () => {
      //TODO validate Success
      console.log('提交 TODO http')
      
    }, (errors) => {
      //TODO validate error
      //聚焦到错误的input
      errors[0]['element'].focus()
      //循环所有错误 反馈信息
      errors.map(({ message, element }) => {
        $(element).parent().addClass('blog-error--input')[0].dataset['msg'] = message
      })
    })
  },
  successCallback (formType) {
    //执行第三方校验库校验方法
    modal.validator.validate()
  }, closeCallback (data) {
    console.log('关闭页面', data)
  }
})




/*

 let result =  new Validate({
    data:[
      {
        name:'username'
        value:'dafads',
        rules:'is_phone|required',
        msg:'请输入正确的username格式....'
      },
       {
        name:'username'
        value:'dafads',
        rules:'is_phone|required',
        msg:'请输入正确的username格式....'
      },
       {
        name:'username'
        value:'dafads',
        rules:'is_phone|required',
        msg:'请输入正确的username格式....'
      }
    ]
  })


  result => {
    isPass:false,
    errors:[
       {
        name:'username'
        msg:'请输入正确的username格式....'
      }
    ]
  }

*/