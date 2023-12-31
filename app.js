var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var async = require('async');
var http = require('http');
var bodyParser = require("body-parser");
const dotenv = require("dotenv")
dotenv.config();


const studentsRoutes = require('./src/student');
const signinRouter = require('./routes/signin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(session({
//   secret: '5L%GAJg6g=',
// resave: false,
// saveUninitialized: true,
// // cookie: { secure: true }
// }));


app.use('/', signinRouter);
// app.use('/', studentsRoutes);




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

app.listen(4000, () => {
  console.log("Server is running on port: 4000")});