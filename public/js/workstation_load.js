var sim_id = $('#simulation').attr('data_id');

var workstation = angular.module('workstation', []);

workstation.controller('Workstation', function($scope, $http) {

  $http.get('/data/station_types')
    .then(function(result) {
      $scope.station_type = result.data;
    });

  $http.get('/simulation/load/' + sim_id)
    .then(function(result) {
      $scope.simulation = result.data;
    });

});

// JQuery and UI Functions for WorkstationLoader

// UI functions
$(function() {

  $('#start').click(function() {
    socket.emit('station:start', {
      room: sim_id
    });
  });
  $('#end').click(function() {
    socket.emit('station:stop', {
      room: sim_id
    });
  });
});

socket = io.connect();

socket.emit('station:join', {
  room: sim_id
});

socket.on('update', function() {

});

socket.on('lock', function(data) {
  var station_id = data.unit;
  var icon = $('[data-target=#modal-' + station_id + ']');
  icon.parent().addClass('ready');
  var button = $('#b'+station_id).attr('disabled',true);
});

