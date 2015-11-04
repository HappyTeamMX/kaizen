var app = require('express.io')();
app.http().io();

app.get('/simulation_status', function(req, res) {
  var monk = req.db;
  var collection = monk.get('simulation_status');
  collection.find({}, {}, function(e, docs) {
    res.send(JSON.stringify(docs));
  });
});

app.get('/stations/:sim_id', function(req, res) {
  var monk = req.db;
  var collection = monk.get('simulations');
  var sim_id = req.param('sim_id');
});

app.get('/station_data/:sim_id/:station_id', function(req, res) {
    var monk = req.db;
    var collection = monk.get('simulations');
    var sim_id = req.param('sim_id');
    var station_id = req.param('station_id');
    collection.findOne({id: sim_id }, function(e, docs) {
        var sim = docs;
        var station_data = {
          id: station_id,
          simulation: docs.id,
          all_stations: []
        }
        console.log(docs);
        docs.stations.forEach(function(type) {
          type.units.forEach(function(unit) {
            if (unit.id === station_id) {
              console.log(unit);
              station_data.name = unit.name;
              station_data.interval = unit.err_interval;
              station_data.duration = unit.err_duration;
            }else{
              station_data.all_stations.push({
                id: unit.id,
                name: unit.name
              });

            }
          });
        });

        res.send(JSON.stringify(station_data, null, 4));
  });
});

app.get('/station_types', function(req, res) {
  var monk = req.db;
  var collection = monk.get('station_types');
  collection.find({}, {}, function(e, docs) {
    res.send(JSON.stringify(docs));
  });
});

app.get('/simulation_times/:sim_id', function(req, res) {
  var monk = req.db;
  var sim_id = req.param('sim_id');
  var collection = monk.get('simulation_times');
  collection.find({simulation:sim_id}, {}, function(e, docs) {
    res.send(JSON.stringify(docs));
  });
});

module.exports = app

