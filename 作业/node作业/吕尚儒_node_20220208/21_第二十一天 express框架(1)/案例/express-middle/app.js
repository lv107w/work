var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParse = require('body-parser')
var multer = require('Multer')
var fs = require('fs')
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var siginRouter = require('./routes/sigin')
var app = express();


const storage = multer.diskStorage({
  // destination:'public/uploads/'+new Date().getFullYear() + (new Date().getMonth()+1) + new Date().getDate(),
  destination (req, res, cb) {
    console.log(req.params['classify'].trim())
    const filePath = path.join(__dirname, './upload', req.params['classify'].trim())
    console.log(filePath)
    fs.existsSync(filePath) || fs.mkdirSync(filePath);
    cb(null, filePath);
  },
  filename (req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
const upload = multer({ storage })
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('short', { stream: accessLogStream }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sigin', siginRouter)
app.use('/upload/:classify', upload.single('file'), (req, res, next) => {
  console.log(req.file)
  console.log(req.params['classify'])
  next()
})
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
