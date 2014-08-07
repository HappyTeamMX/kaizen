var express = require('express');
var router = express.Router();



// GET login
//TODO: change to login after post is done
router.get('/', function(req, res) {
  res.render('home', { title: 'Kaizen' });
});

// GET home
router.get('/home', function(req, res) {
  res.render('home', { title: 'Kaizen' });
  var db = req.db;
  var collection = db.get('kaizen');
});

// GET home
router.get('/new_simulation', function(req, res) {
  res.render('new_sim', { title: 'Kaizen' });
});

router.post('/save_simulation', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('simulations');

  var new_sim = req.body.sim;

  // Submit to the DB
  collection.insert(new_sim, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // If it worked, set the header so the address bar doesn't still say /adduser
      res.location("home");
      // And forward to success page
      res.redirect("home");
    }
  });
});



module.exports = router;
