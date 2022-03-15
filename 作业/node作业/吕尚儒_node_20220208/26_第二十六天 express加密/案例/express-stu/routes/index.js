var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', layout: "layout0" });

  /*
    不设置layout属性
      layout =   hbs 默认从 views 下寻找 layout.hbs 
    设置layout属性 值 指定 views 下 模板hbs文件名称
      layout = layout属性值


    把我们render传入的 模板页面(index) 渲染完成之后  以 body 数据参数 渲染
    layout.hbs中 index渲染生成的html内容会以 {{{body}}} 插入
    layout.hbs进行输出 
  
  */
});

module.exports = router;
