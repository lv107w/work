var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let loginRouter = require('./routes/login') 
let getPubKeyRouter = require('./routes/getPublicKey')

var app = express();

app.use(cors({
  "origin": true,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": "x-requested-with,Authorization,token, content-type",
  "preflightContinue": false,  //是否通过next() 传递options请求给后续中间件
  "maxAge": 1720000,
  "credentials": true, //携带cookie
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

app.use('/login', loginRouter)
app.use('/getPubKey', getPubKeyRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
