var app = require('express.io')();
app.http().io();

// Start simulation template
app.get('/start', function(req, res) {
  res.render('stations/station_start', { title: 'Kaizen' });
});


// Normal simulation template
app.get('/normal', function(req, res) {
  res.render('stations/station_normal', { title: 'Kaizen' });
});

      // ///////////////// //
     // Broadcast Manager //
    // ///////////////// //
app.io.route('/join', function(req) {
    console.log('join event');
    req.io.join(req.data);
    req.io.room(req.data).broadcast('hello');
});

// 
app.io.route('/start', function(req) {
    req.io.room(req.data).broadcast('begin');
});

// Generic
//app.get('quality', function(req, res) {
//  res.render('stations/station_qa', { title: 'Kaizen' });
//});

module.exports = app;
