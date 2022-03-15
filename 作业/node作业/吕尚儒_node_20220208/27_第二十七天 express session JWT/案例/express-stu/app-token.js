var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs')
const session = require('express-session') //session 中间件
const cors = require('cors')
const jwt = require('jsonwebtoken') //token生成包  JWT
const expressJwt = require('express-jwt') //token验证中间件 JWT

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var privateKey = fs.readFileSync('./auth/private.cer', 'utf8');
var publicKey = fs.readFileSync('./auth/public.cer', 'utf8');

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



app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use('/getToken', (req, res, next) => {
  let { username, pwd } = req.body
  //登录验证账号密码正确之后 生成jwt令牌

  var token = jwt.sign({ username, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, privateKey, { algorithm: 'RS256' });

  res.send(200, {
    statusCode: 200,
    errMsg: "ok",
    data: {
      token
    }
  })
})

app.use('/login', (req, res, next) => {
  /*
    验证token 
      如果token存在并且有效
      直接重定向(前端or后端)到 首页 /index or /user
      res.redirect()

    token不正确
      返回错误码 
        前端跳转到登录页面 
          用户填入账号密码
            重新请求getToken接口
  */

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

app.use('/getAvatar', expressJwt({
  secret: publicKey, //解密秘钥 
  algorithms: ["RS256"], //6.0.0以上版本必须设置解密算法 
  getToken: function fromHeaderOrQuerystring (req) {
    //获取token的方法 默认处理方式如下
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {

      return req.query.token;
    }
    return null;
  },
  isRevoked: function (req, payload, next) {
    //获取token payload内容
    // console.log(payload)
    let { iat, username } = payload
    req.tokenID = username
    next()
  }
}), (req, res, next) => {
  if (!req.tokenID) {
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
