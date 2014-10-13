var app = require('express.io')();
app.http().io();

module.exports = function(app, passport) {
  
  app.get('/simulation_status', function(req, res) {
    var mongodb = req.db;
    var collection = mongodb.get('simulation_status');
    collection.find({},{},function(e,docs){
      res.send(JSON.stringify(docs));
    });
  });
  
  app.get('/station_types', function(req, res) {
    var mongodb = req.db;
    var collection = mongodb.get('station_types');
    collection.find({},{},function(e,docs){
      res.send(JSON.stringify(docs));
    });
  });

};
