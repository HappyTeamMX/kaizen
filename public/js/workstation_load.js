var id = $('#simulation').attr('data_id');

var workstation = angular.module('workstation',[]);

workstation.controller('Workstation', function ($scope, $http) {
  // get data ajax

  $http.get('/data/station_types')
    .then(function(result) {
      $scope.station_type = result.data;
  });

  $http.get('/simulation/load/'+id)
    .then(function(result) {
      $scope.simulation = result.data;
  });
    
});

// JQuery and UI Functions for WorkstationLoader


// UI functions
$(function(){
  // AJS faster than light so we bind to the parent
  $('.container').on('click','.stations',function(){
    $('.stations').removeClass('selected');
    $(this).addClass('selected');
  });


});
