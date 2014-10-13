var app = require('express.io')();
app.http().io();

// New simulation manager
app.get('/new', function(req, res) {
  res.render('simulation/workstation', { title: 'Kaizen' });
});




app.get('/list', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  collection.find({},function(e,docs){
    res.render('simulation/simulation_list', {
      title: 'Kaizen',
      'simulations': docs,
    });
  });
});




app.get('/detail/:sim_id', function(req, res) {
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


app.get('/load/:sim_id', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  var sim_id = req.param("sim_id");
  console.log(sim_id);
  collection.findOne({id:sim_id},function(e,docs){
    res.send(JSON.stringify(docs));
  });
});




// Save simulation manager
app.post('/save', function(req, res) {
  var db = req.db;
  var collection = db.get('simulations');
  var new_sim = req.body.sim;

  // Submit to the DB
  collection.insert(new_sim, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database. ");
    } else {
      res.send(true);
      // res.location("/home");
      // res.redirect("/home");
    }
  });
});



module.exports = app;
