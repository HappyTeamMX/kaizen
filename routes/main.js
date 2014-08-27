var express = require('express');
var router = express.Router();


// Login manager
router.get('/', function(req, res) {
  res.render('login', { title: 'Kaizen' });
});


// Main page manager
router.get('/home', function(req, res) {
  //var db = req.db;
  //var collection = db.get('simulations');
  //collection.find({},{},function(e,docs){console.log('var for test',test); console.log(docs,test); res.render('home', {simulations: docs, title: 'Kaizen'}); });
  res.render('home',{title: 'Kaizen'});
});



module.exports = router;
