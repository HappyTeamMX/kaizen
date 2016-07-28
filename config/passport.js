// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var crypt = {}

// generating a hash
crypt.generateHash = function(password) {
    return bcrypt.hashSync(password);
}

// checking if password is valid
crypt.validPassword = function(password, user) {
    return bcrypt.compareSync(password, user.local.password);
}

module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        done(null, id);
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        var monk = req.db;
        var users = monk.get('users');

        users.findOne({ 'local.email' :  email }, function(err, user) {
            if (err){
                console.log(err);
                return done(err);
            }
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

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log(req);
        var monk = req.db;
        var users = monk.get('users');
        users.findOne({ 'local.email' :  email }, function(err, user) {
            if (err){
                console.log('auth error', err);
                return done(err);
            }
            if (!user){
                console.log('loginMessage ', 'No user found.');
                return done(null, false);
            }
            if (!crypt.validPassword(password, user)){
                console.log('loginMessage ', 'Oops! Wrong password.');
                return done(null, false);
            }
            return done(null, user);
        });

    }));

};
