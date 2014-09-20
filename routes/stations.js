var express = require('express');
var router = express.Router();



// Start simulation template
router.get('/start', function(req, res) {
  res.render('stations/station_start', { title: 'Kaizen' });
});

// Normal simulation template
router.get('/normal', function(req, res) {
  res.render('stations/station_normal', { title: 'Kaizen' });
});

// Generic
//router.get('quality', function(req, res) {
//  res.render('stations/station_qa', { title: 'Kaizen' });
//});





module.exports = router;
