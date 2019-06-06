var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongodbutil = require( './dbconnect.js' );
mongodbutil.connectToServer( function( err ) {
  //app goes online once this callback occurs
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var companiesRouter = require('./routes/companies');
  var activitiesRouter = require('./routes/activities');
  var registerRouter = require('./routes/register');  
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/companies', companiesRouter);
  app.use('/activities', activitiesRouter);
  app.use('/register', registerRouter);  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
  //end of calback
});


app.listen(5000, function() {
  console.log('Example app listening on port 5000!');
});

//module.exports = app;