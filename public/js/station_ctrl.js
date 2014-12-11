var sim_id = window.params.simulation;
var station_id = window.params.unit;

var station = angular.module('station', []);

station.controller('Stations', function($scope, $http) {

  $http.get('/data/station_data/' + sim_id + '/' + station_id)
    .then(function(data) {
      console.log(data);
      $scope.station_data = data.data;
    });

  $scope.item_list = [];

  $scope.new_item = {
    item: "",
    target: {},
    sender: {
      id: station_id,
      name: "",
    },
    start_time: "",
    end_time: ""
  }

  $scope.new_order = function(event) {
    $scope.new_item.sender.name =  $scope.station_data.name
    if (event === 'start') {
      $scope.new_item.start_time = moment().format('HH:mm:ss a');
    } else {
      $scope.new_item.end_time = moment().format('HH:mm:ss a');
    }
    console.log($scope.new_item);
    $scope.item_list.push($scope.new_item);
    console.log($scope.item_list);
    brodcast_message($scope.new_item, event);
    $scope.new_item = {
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

});

socket.on('delivery', function(message) {
  // this is target
  if (message.target.id === station_id) {
    console.log(message);
    angular.element('.container').scope().item_list.push(message);
    angular.element('.container').scope().$apply();
  }

});

