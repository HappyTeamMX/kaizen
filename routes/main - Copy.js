var express = require('express');
var router = express.Router();


// Login manager
router.get('/', function(req, res) {
  res.render('login', { title: 'Kaizen' });
});


// Main page manager
router.get('/home', function(req, res) {
  var mongodb = req.db;
  var collection = mongodb.get('simulations');
  collection.find({},{limit:5},function(e,docs){
    res.render('home', {
      'simulations': docs,
      'title' : 'Kaizen'
    });
  });
});

module.exports = router;
