var express = require('express.io');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// load controllers
var main_controller = require('./routes/main');
var simulation_controller = require('./routes/simulation');
var stations_controller = require('./routes/stations');


// DB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://kaizenuser:kaizenpass@ds041160.mongolab.com:41160/kaizen_project');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


// make db accesible to routers
app.use(function(req,res,next){
    req.db = db;
    next();
});

// add controllers to app
app.use('/', main_controller);
app.use('/simulation', simulation_controller);
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
