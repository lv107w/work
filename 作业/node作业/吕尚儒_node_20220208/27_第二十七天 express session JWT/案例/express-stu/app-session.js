var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session') //session 中间件
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat', //签名 字符串
  resave: false, // 强制保存 session 就算没有变化
  saveUninitialized: true, //强制将未初始化的 session 存储 默认值 true
  name: 'sid', // 设置cookie上的 key
  cookie: {
    maxAge: 172000 /*签名过期时间 有效期*/
  },
  // rolling: true //每次请求都强制设置cookie 重置过期时间

}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login', (req, res, next) => {
  let { username, pwd } = req.body
  console.log(username, pwd)
  //登录验证账号密码正确之后 设置session信息 sid
  //sid 加签名加密后 服务端设置cookie到客户端
  req.session.sid = username
  res.send(200, {
    statusCode: 200,
    errMsg: "welcome"
  })
})

app.use('/logout', (req, res, next) => {
  //destroy 清除用户的session会话
  req.session.destroy(function () {
    console.log(`session已清除`)
    req.cookie('sid', '')
  })
  res.send(200, {
    statusCode: 200,
    errMsg: "welcome"
  })
})

app.use('/getAvatar', (req, res, next) => {
  //设置session信息
  if (!req.session.sid) {
    res.send(200, {
      statusCode: 403,
      errMsg: "没有访问权限"
    })
    return
  }
  res.send(200, {
    statusCode: 200,
    errMsg: "welcome"
  })
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
