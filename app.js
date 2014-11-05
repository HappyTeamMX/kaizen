var express = require('express.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
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
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var app = require('express.io')()
app.http().io()


require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var engines = require('consolidate');
app.engine('jade', engines.jade);
app.engine('ejs', engines.ejs);
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/img/icon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(express.session({
    secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// make db accesible to routers
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// add controllers to app
require('./app/routes.js')(app, passport);

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
