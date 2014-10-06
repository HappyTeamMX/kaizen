var express = require('express');
var router = express.Router();


// New simulation manager
router.get('/new', function(req, res) {
  res.render('simulation/workstation', { title: 'Kaizen' });
});

router.get('/list', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  collection.find({},function(e,docs){
    res.render('simulation/simulation_list', {
      title: 'Kaizen',
      'simulations': docs,
    });
  });
});

router.get('/detail/:sim_id', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  var sim_id = req.param("sim_id");
  collection.findOne({id:sim_id},function(e,docs){
    res.render('simulation/simulation_detail', {
      title: 'Kaizen',
      id:sim_id
    });
  });
});


router.get('/load/:sim_id', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  var sim_id = req.param("sim_id");
  console.log(sim_id);
  collection.findOne({id:sim_id},function(e,docs){
    res.send(JSON.stringify(docs));
  });
});




// Save simulation manager
router.post('/save', function(req, res) {
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
