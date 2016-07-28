// app/routes.js
// author: Ricardo Valencia <@ivan_tuitero>

module.exports = function (app, passport) {
  'use strict';

  //  always send to login
  app.get('/', function (req, res) {
    res.render('login.jade');
  });

  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.jade', {
      message: 'Welcome to Kaizen'
    });
  });

  // process the login form
  app.post('/login',
    passport.authenticate('local-login', {
      successRedirect: '/home',
      failureRedirect: '/home',
      failureFlash: true
    }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });


  // ////////////////////////// //
  //  Private simulation views  //
  // ////////////////////////// //

  // home view
  app.get('/home', isLoggedIn, function (req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    collection.find({}, {
      limit: 5,
      sort: { 'date': -1 }
    }, function (e, docs) {
      res.render('home', {
        'simulations': docs,
        'title': 'Kaizen',
        user: req.user,
      });
    });
  });

  // New simulation manager
  app.get('/simulation/new', isLoggedIn, function (req, res) {
    res.render('simulation/workstation', {
      title: 'Kaizen - New Simulation',
      user: req.user
    });
  });

  app.get('/simulation/list', isLoggedIn, function (req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    collection.find({}, function (err, docs) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      }
      res.render('simulation/simulation_list', {
        title: 'Kaizen - Simulation List',
        'simulations': docs,
        user: req.user
      });
    });
  });

  app.get('/simulation/edit/:sim_id', isLoggedIn, function (req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    collection.findOne({
      id: sim_id
    }, function (err) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      }
      res.render('simulation/workstation_edit', {
        title: 'Kaizen',
        id: sim_id,
        user: req.user
      });
    });
  });

  app.get('/simulation/:sim_id', function (req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    collection.findOne({
      id: sim_id
    }, function (err) {
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

  app.get('/simulation/load/:sim_id', function (req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    collection.findOne({
      id: sim_id
    }, function (err, docs) {
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
  app.post('/simulation/save', isLoggedIn, function (req, res) {
    var monk = req.db;
    var new_sim = req.body.sim;
    var collection = monk.get('simulations');
    console.log('sim save');
    collection.insert(new_sim, function (err) {
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
  app.post('/simulation/update/:sim_id', isLoggedIn, function (req, res) {
    var sim_id = req.param('sim_id');
    var monk = req.db;
    var collection = monk.get('simulations');
    var new_sim = req.body.sim;
    console.log('sim save ' + sim_id);
    collection.updateById(new_sim._id, new_sim, function (err) {
      if (err) {
        res.send({
          status: 500,
          message: 'Database Error'
        });
      } else {
        console.log('object saved');
        res.send(true);
      }
    });
  });
  // Datatable with excel data
  app.get('/simulation/table/:simulation', function (req, res) {
    var sim_id = req.param('simulation');
    var monk = req.db;
    var collection = monk.get('simulation_times');
    collection.find({
      simulation: sim_id
    }, {}, function (e, docs) {
      res.render('exceltable', {
        times: docs,
        title: 'Kaizen'
      });
    });
  });

  // //////////// //
  //  Secret urls //
  // //////////// //

  app.get('/register', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('register.jade');
  });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/register',
  }));

  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile.jade', {
      user: req.user
    });
  });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  'use strict';
  console.log(req.db);
  return next();
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

