var app = require('express.io')()
app.http().io()

// Start simulation template
app.get('/start', function(req, res) {
  res.render('stations/station_start', {
    title: 'Kaizen'
  })
})

// Normal simulation template
app.get('/normal', function(req, res) {
  res.render('stations/station_normal', {
    title: 'Kaizen'
  })
})

app.get('/customer', function(req, res) {
  res.render('stations/station_customer', {
    title: 'Kaizen'
  })
})

// Quality simulation template
app.get('/quality', function(req, res) {
  res.render('stations/station_quality', {
    title: 'Kaizen'
  });
});

module.exports = app;

