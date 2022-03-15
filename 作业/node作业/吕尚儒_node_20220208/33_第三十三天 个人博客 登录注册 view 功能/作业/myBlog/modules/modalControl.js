import modalMap from './modal.config.js'
export default class Modal {
  constructor({ hbsTemp, modalWarp = $('.blog-modal'), dataType, successCallback = (data) => {
    console.log('提交成功', data)
  }, closeCallback = (data) => {
    console.log('关闭页面', data)
  } }) {
    //渲染hbs方法
    this.hbsTemp = hbsTemp
    this.data = {}
    this.wrap = modalWarp
    this.html = ''
    this.successCallback = successCallback
    this.closeCallback = closeCallback
    this.eventAgent()
  }
  //数据渲染
  render () {
    // 生成html = 渲染方法(渲染数据)
    let data = modalMap[this.dataType]
    this.html = this.hbsTemp(data)
    this.draw()

  }
  //event 代理
  eventAgent () {
    this.wrap.on('click', 'button', (e) => {
      e.preventDefault()
      let targetName = $(e.target).data('btn-target')
      this[targetName] && this[targetName]()
    })
    //TODO 需要把modal唤醒事件分离
    $('body').on('click', 'a', (e) => {
      e.preventDefault()
      let modalType = $(e.target).data('modal')
      if (!modalType || modalType.length === 0) {
        return false
      }
      this.dataType = modalType
      this.render()
    })
  }

  //渲染
  draw () {
    this.clean()
    this.wrap.removeAttr('hidden')
    this.wrap.html(this.html).show()
  }
  //清空
  clean () {
    this.wrap.html('')
  }
  //关闭
  close () {
    this.closeCallback()
    this.reset()
  }
  //提交
  confirm () {
    this.successCallback()
    this.reset()
  }
  //reset 重置blog-wrap
  reset () {
    this.wrap.hide()
    this.wrap.attr('hidden', true)
  }


}