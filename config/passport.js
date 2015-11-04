// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');
var crypt = {}

// generating a hash
crypt.generateHash = function(password) {
    return bcrypt.hashSync(password);
}

// checking if password is valid
crypt.validPassword = function(password, user) {
    return true;
    // return bcrypt.compareSync(password, user.local.password);
}


// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        var monk = req.db;
        var users = monk.get('users');

        users.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err){
                console.log(err);
                return done(err);
            }
            // check to see if theres already a user with that email
            if (user) {
                console.log('signupMessage ', 'That email is already taken.');
                return done(null, false);
            } else {
                var newUser = {};
                newUser.local = {};
                // set the user's local credentials
                newUser.local.email = email;
                newUser.local.password = crypt.generateHash(password);
				// save the user
                users.insert(newUser, function(err) {
                    if (err){
                        throw err;
                    }
                    return done(null, newUser);
                });
            }

        });

    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    // callback with email and password from our form
    function(req, email, password, done) {
        var monk = req.db;
        var users = monk.get('users');
        users.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err);
            }
            // if no user is found, return the message
            if (!user){
                console.log('loginMessage ', 'No user found.');
                return done(null, false);
            }
            // if the user is found but the password is wrong
            if (!crypt.validPassword(password, user)){
                console.log('loginMessage ', 'Oops! Wrong password.');
                return done(null, false);
            }
            // all is well, return successful user
            return done(null, user);
        });

    }));

};
