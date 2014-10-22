var app = require('express.io')();
app.http().io();

// Start simulation template
app.get('/start', function(req, res) {
  res.render('stations/station_start', { title: 'Kaizen' });
});

// Broadcast Manager
app.io.route('ready', function(req) {
    req.io.join(req.data);
    req.io.room(req.data).broadcast('announce', {
        message: 'New client in the ' + req.data + ' room. '
    });
});

// Normal simulation template
app.get('/normal', function(req, res) {
  res.render('stations/station_normal', { title: 'Kaizen' });
});

// Datatable with excel data
app.get('/final', function(req, res) {
  res.render('stations/exceltable', { title: 'Kaizen' });
});

// Generic
//app.get('quality', function(req, res) {
//  res.render('stations/station_qa', { title: 'Kaizen' });
//});





module.exports = app;
