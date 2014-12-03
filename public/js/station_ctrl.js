var sim_id = window.params.simulation;
var station_id = window.params.unit;

var station = angular.module('station', []);

station.controller('Stations', function($scope, $http) {

    $http.get('/data/station_data/'+sim_id+'/'+ station_id)
        .then(function(data) {
            console.log(data);
        });

    $scope.station_info = {
        id: window.params.unit,
        pending: []
    };

    $scope.item_list = [];

    $scope.new_order = function() {
        var new_id = get_id(5);
        $('#item-id').attr('value', new_id);
        $scope.item_list.push(new_id);
    }

});
