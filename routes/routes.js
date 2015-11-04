// app/routes.js
module.exports = function(app, passport) {
'use strict';
  // ///////////////////// //
  //  Private admin views  //
  // ///////////////////// //

  app.get('/', function(req, res) {
    res.render('login.jade'); // load the login.ejs file
  });

  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.jade', {
      message: 'Welcome to Kaizen'
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true // allow flash messages
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/home', isLoggedIn, function(req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    collection.find({}, {
      limit: 5
    }, function(e, docs) {
      res.render('home', {
        'simulations': docs,
        'title': 'Kaizen'
      });
    });
  });

  // ////////////////////////// //
  //  Private simulation views  //
  // ////////////////////////// //

  // New simulation manager
  app.get('/simulation/new', isLoggedIn, function(req, res) {
    res.render('simulation/workstation', {
      title: 'Kaizen'
    });
  });

  app.get('/simulation/list', isLoggedIn, function(req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    collection.find({}, function(err, docs) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      }
      res.render('simulation/simulation_list', {
        title: 'Kaizen',
        'simulations': docs,
      });
    });
  });

  app.get('/simulation/:sim_id/edit', function(req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    collection.findOne({
      id: sim_id
    }, function(err) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      }
      res.render('simulation/workstation_edit', {
        title: 'Kaizen',
        id: sim_id
      });
    });
  });

  app.get('/simulation/:sim_id', function(req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    collection.findOne({
      id: sim_id
    }, function(err) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      }
      res.render('simulation/simulation_detail', {
        title: 'Kaizen',
        id: sim_id
      });
    });
  });

  app.get('/simulation/load/:sim_id', function(req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    collection.findOne({
      id: sim_id
    }, function(err, docs) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      }
      res.send(JSON.stringify(docs));
    });
  });

  // Save simulation manager
  app.post('/simulation/save', isLoggedIn, function(req, res) {
    var monk = req.db;
    var new_sim = req.body.sim;
    var collection = monk.get('simulations');
    collection.insert(new_sim, function(err) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      } else {
        res.send(true);
      }
    });
  });

  // update manager
  app.post('/simulation/update/:sim_id', isLoggedIn, function(req, res) {
    var sim_id = req.param('sim_id');
    var monk = req.db;
    var collection = monk.get('simulations');
    var new_sim = req.body.sim;
    console.log(sim_id);
    collection.update(new_sim, function(err) {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: 'Database Error'
        });
      } else {
        console.log('saved');
        res.send(true);
      }
    });
  });
  // Datatable with excel data
  app.get('/simulation/table/:simulation', function(req, res) {
    var sim_id = req.param('simulation');
    var monk = req.db;
    var collection = monk.get('simulation_times');
    collection.find({
      simulation: sim_id
    }, {}, function(e, docs) {
      res.render('exceltable', {
        times: docs,
        title: 'Kaizen'
      });
    });
  });

  // //////////// //
  //  Secret urls //
  // //////////// //

  app.get('/register', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('register.jade');
  });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/register', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  'use strict';
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/login');
}

