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
});

// GET home
router.get('/new_simulation', function(req, res) {
  res.render('new_sim', { title: 'Kaizen' });
});



module.exports = router;
