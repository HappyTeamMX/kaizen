#!/usr/bin/env node

function getMethods(obj) {
  var result = [];
  for (var id in obj) {
    try {
      if (typeof(obj[id]) == "function") {
        result.push(id + ": " + obj[id].toString());
      }
    } catch (err) {
      result.push(id + ": inaccessible");
    }
  }
  return result;
}

var app = require('../app');

// ///////////////// //
// Broadcast Manager //
// ///////////////// //

app.io.route('station', {
  join: function(req) {
    console.log('join event launched');
    var room = req.data.room;
    var station = req.data.unit;
    req.io.join(room);
    if (station !== undefined) {
      req.io.room(room).broadcast('lock', {
        unit: station
      });
    };
  },
  start: function(req) {
    var room = req.data.room;
    console.log('unlock all stations');
    req.io.room(room).broadcast('begin');
  },
  stop: function(req) {
    var room = req.data.room;
    console.log('lock all stations ');
    req.io.room(room).broadcast('halt');
  },
  update: function(req) {
    // get request data
    var room = req.data.room;
    var message = req.data.message;
    var event = req.data.event;
    var collection = global.gmonk.get('simulation_times');
    // create object with data to save
    var new_data = {
      simulation: message.simulation,
      item: message.item,
      sender: message.sender.name,
      target: message.target.name,
      start: message.start_time,
      end: message.end_time,
    }
    if (event === 'start' || event === 'pass') {
      collection.insert(new_data, function(err, doc) {
        message.id = doc._id;
        req.io.room(room).broadcast('delivery', message);
      });
    } else {
      collection.update({
        id: message.id
      }, {
        $set: {
          end: message.end_time
        }
      }, function(err, docs) {
        if (err) {
          console.log(err);
        };
      });
      req.io.room(room).broadcast('delivery', message);
    }
  },
  send: function(req) {
    // remove your customer
  },
});
//
app.io.route('start', function(req) {
  req.io.room(req.data).broadcast('begin');
});

app.set('port', 80);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

