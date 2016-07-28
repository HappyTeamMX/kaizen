// app.js for Kaizen project
// author: Ricardo Valencia <@ivan_tuitero>

// variable initialization
var express = require('express.io');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var engines = require('consolidate');
var monk = require('monk');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var app = express();

// database conection
var database = monk('mongodb://kaizenuser:kaizenpass@ds041160.mongolab.com:41160/kaizen_project');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('jade', engines.jade);
app.set('view engine', 'jade');



// io initialization
app.http().io()

// make db accesible to routes
app.use(function (req, res, next) {
    console.log('add database');
    req.db = database;
    console.log(database);
    next();
});

// required for passport
app.use(cookieParser());
app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);
require('./routes/main')(app, passport);

// less middleware
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// load controllers
var data_controller = require('./routes/data');
var stations_controller = require('./routes/stations');
var main_controller = require('./routes/main');

// add controllers to app
app.use('/data', data_controller);
app.use('/station', stations_controller);
app.use('/', main_controller);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: "Sorry, error was caused"
    });
});

module.exports = app;
