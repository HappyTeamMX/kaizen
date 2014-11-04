var app = require('express.io')()
app.http().io()

// Start simulation template
app.get('/start', function(req, res) {
  res.render('stations/station_start', { title: 'Kaizen' })
})


// Normal simulation template
app.get('/normal', function(req, res) {
  res.render('stations/station_normal', { title: 'Kaizen' })
})

app.get('/customer', function(req, res) {
  res.render('stations/station_customer', { title: 'Kaizen' })
})


// Datatable with excel data
app.get('/final', function(req, res) {
  res.render('stations/exceltable', { title: 'Kaizen' });
});

// Generic
//app.get('quality', function(req, res) {
//  res.render('stations/station_qa', { title: 'Kaizen' });
//});

module.exports = app;
