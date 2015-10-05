var sim_id = $('#simulation').attr('data_id');

var workstation = angular.module('table', []);

workstation.controller('TableController', function($scope, $http) {

  $http.get('/data/simulation_times/' + sim_id)
    .then(function(result) {
      $scope.all_times = result.data;
    });

});
