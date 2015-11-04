var express = require('express.io');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// load controllers
var data_controller = require('./routes/data');
var stations_controller = require('./routes/stations');

// DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(
  'mongodb://kaizenuser:kaizenpass@ds041160.mongolab.com:41160/kaizen_project'
);

var app = require('express.io')();
app.http().io()


// required for passport
app.use(cookieParser());
app.use(express.session({secret: 'ilovescotchscotchyscotchscotch'}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// view engine setup
var engines = require('consolidate');
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', engines.jade);
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// make db accesible to routes
app.use(function(req, res, next) {
  req.db = db;
  global.gmonk = db;
  next();
});

// add controllers to app
require('./routes/routes.js')(app, passport);

app.use('/data', data_controller);
app.use('/station', stations_controller);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: "Sorry, error was caused"
  });
});

module.exports = app;

