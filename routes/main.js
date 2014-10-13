var app = require('express.io')();
app.http().io();

// Login manager
app.get('/', function(req, res) {
  res.render('login', { title: 'Kaizen' });
});


// Main page manager
app.get('/home', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  collection.find({},{limit:5,sort: {date:1}},function(e,docs){
    res.render('home', {
      'simulations': docs,
      'title' : 'Kaizen'
    });
  });
});

// Data access
app.get('/data/simulation_status', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulation_status');
  collection.find({},{},function(e,docs){
    res.send(JSON.stringify(docs));
  });
});

app.get('/data/station_types', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('station_types');
  collection.find({},{},function(e,docs){
    res.send(JSON.stringify(docs));
  });
});


module.exports = app;
