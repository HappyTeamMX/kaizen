var express = require('express');
var router = express.Router();


// Generic
router.get('/station', function(req, res) {
  res.render('stations/layout', { title: 'Kaizen' });
});

// Generic
router.get('/station/start', function(req, res) {
  res.render('stations/station_start', { title: 'Kaizen' });
});

// Generic
router.get('/station/normal', function(req, res) {
  res.render('stations/station_normal', { title: 'Kaizen' });
});

// Generic
router.get('/station/qa', function(req, res) {
  res.render('stations/station_qa', { title: 'Kaizen' });
});





module.exports = router;
