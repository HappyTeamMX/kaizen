var sim_id = $('#simulation')
  .attr('data_id');

var workstation = angular.module('workstation', []);

workstation.controller('Workstation', function($scope, $http) {
  // get data ajax

  $http.get('/data/station_types')
    .then(function(result) {
      $scope.station_type = result.data;
    });

  $http.get('/data/simulation_status')
    .then(function(result) {
      $scope.simulation_status = result.data;
    });

  $http.get('/simulation/load/' + sim_id)
    .then(function(result) {
      $scope.simulation = result.data;
    });



  $scope.save = function() {
    console.log(this.simulation);
    // Store the data-dump of the FORM scope.
    var request = $http.post("/simulation/save", {
        sim: this.simulation
      })
      .success(function() {
        $('.alert')
          .show();
      });
  }


  $scope.control_action = function(action, target) {
      // Remove Column
      if (target === "column" && action === "remove") {
        var column_id = $('.stations.selected')
          .attr('data-id');
        $scope.simulation.stations.forEach(function(dude) {
          if (dude.id === column_id) {
            var i = $scope.simulation.stations.indexOf(dude);
            $scope.simulation.stations.splice(i, 1);
          }
        });
        // this.simulation.stations.pop();
      }
      // Add Column
      // - create new column, add it a station and rebind click event
      if (target === "column" && action === "add") {
        this.simulation.stations.push({
          id: get_id(8),
          type: {
            name: 'Workstation'
          },
          units: [{
            id: get_id(4),
            name: 'Workstation',
            std_dev: '00:00',
            err_interval: '00:00',
            err_duration: '00:30'
          }]
        });
      }


      // Remove station
      // - wipe out the station. adieu
      if (target === "station" && action === "remove") {
        var column_id = $('.stations.selected')
          .attr('data-id');
        this.simulation.stations.forEach(function(each) {
          if (each.id === column_id) {
            each.units.pop();
            return;
          }
        });

      }
      // Add Station
      // - add new station at end of column
      if (target === "station" && action === "add") {
        var column_id = $('.stations.selected')
          .attr('data-id');
        this.simulation.stations.forEach(function(each) {
          if (each.id === column_id) {
            each.units.push({
              id: get_id(4),
              name: 'Station',
              std_dev: '00:00',
              err_interval: '00:00',
              err_duration: '00:30'
            });
            return;
          }
        });
      }

    } // end event


});

// JQuery and UI Functions for Workstation
// helper functions

// bigger offset = smaller id
function get_id(offset) {
  return uuid.v4()
    .substring(0, offset);
}

// UI functions
$(function() {
  // AJS faster than light so we bind to the parent
  $('.container')
    .on('click', '.stations', function() {
      $('.stations')
        .removeClass('selected');
      $(this)
        .addClass('selected');
    });

  $('.container')
    .on('click', '.input-field', function() {
      $(this)
        .slideToggle();
      $(this)
        .next('.flip')
        .slideToggle();
      $(this)
        .next('.flip')
        .children('input, select')
        .focus();
    });

  $('.layout')
    .on('blur', '.flip select', function() {
      $(this)
        .parent()
        .prev('.input-field')
        .slideToggle();
      $(this)
        .parent()
        .slideToggle();
    });

  $('.container')
    .on('click', '.flip button', function() {
      $(this)
        .parent()
        .parent()
        .parent()
        .prev('.input-field')
        .slideToggle();
      $(this)
        .parent()
        .parent()
        .parent()
        .slideToggle();
    });


});

