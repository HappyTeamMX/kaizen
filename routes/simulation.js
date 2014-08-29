var express = require('express');
var router = express.Router();


// New simulation manager
router.get('/simulation/new', function(req, res) {
  res.render('simulation/workstation', { title: 'Kaizen' });
});


// Save simulation manager
router.post('/simulation/save', function(req, res) {
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