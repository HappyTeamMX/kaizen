var sim_id = window.params.simulation;
var station_id = window.params.unit;

var station = angular.module('station', []);

function send_and_reset(event) {
  console.log('sending');
  $scope.new_item.sender.name = $scope.station_data.name;
  // function on stations.js where socket is opened
  brodcast_message($scope.new_item, event);
  $scope.new_item = {
    simulation: sim_id,
    item: "",
    target: [],
    sender: {
      id: station_id,
      name: "",
    },
    start_time: "",
    end_time: ""
  }
}

station.controller('Stations', function($scope, $http) {

  $http.get('/data/station_data/' + sim_id + '/' + station_id)
    .then(function(data) {
      console.log(data);
      $scope.station_data = data.data;
    });

  $http.get('/data/simulation_times/' + sim_id)
    .then(function(data) {
      console.log(data);
      $scope.all_times = data.data;
    });

  $scope.item_list = [];

  $scope.new_item = {
    simulation: sim_id,
    item: "",
    target: {},
    sender: {
      id: station_id,
      name: "",
    },
    start_time: "",
    end_time: ""
  }

  $scope.send_and_reset = function(event) {
    $scope.new_item.sender.name = $scope.station_data.name;
    // function on stations.js where socket is opened
    brodcast_message($scope.new_item, event);
    $scope.new_item = {
      simulation: sim_id,
      item: "",
      target: [],
      sender: {
        id: station_id,
        name: "",
      },
      start_time: "",
      end_time: ""
    }
  }

  $scope.new_order = function(argument) {
    var new_id = get_id(5);
    $('#item-id').attr('value', new_id);
    $scope.item_list.push(new_id);
  }

  $scope.send_order = function(event) {
    // get time on variable according to event
    if (event === 'start') {
      $scope.new_item.start_time = moment().format('HH:mm:ss a');
      $scope.send_and_reset(event);
      // if event is end, check for selected item
    } else if (event === 'pass') {
      var note = $('.selected');
      if (note.length === 0) {
        console.log('No note selected');
        return;
      } else {
        $scope.new_item.start_time = moment().format('HH:mm:ss a');
        $scope.new_item.item = note.attr('data-id');
        $scope.new_item.id = note.attr('data-secret');
        $scope.send_and_reset(event);
      }
    } else {
      var note = $('.selected');
      if (note.length === 0) {
        console.log('no note selected');
        return;
      } else {
        $scope.new_item.end_time = moment().format('HH:mm:ss a');
        $scope.new_item.item = note.attr('data-id');
        $scope.send_and_reset(event);
        $scope.item_list.forEach(function(each) {
          if (each.item === note.attr('data-id')) {
            var i = $scope.item_list.indexOf(each);
            $scope.item_list.splice(i, 1);
          };
        });
      }
    }
  }

});

socket.on('delivery', function(message) {
  // this is target
  if (message.target.id === station_id) {
    console.log(message);
    angular.element('.container').scope().item_list.push(message);
    angular.element('.container').scope().$apply();
  }
});

