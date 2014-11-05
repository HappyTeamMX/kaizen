
var station = angular.module('station',[]);

station.controller('Stations', function ($scope, $http) {

  $scope.item_list = [1235,1234,1234,456,56756,575564,44534535];

  $scope.new_order = function(){
    alert('new world order');
    var new_id = get_id(5);
    $('#item-id').attr('value',new_id);
    $scope.item_list.append(new_id);
  }
    
});


$('#new-order').click(function(e){
  console.log('clicked');
  e.preventDefault();
});
