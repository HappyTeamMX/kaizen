
// UI functions
$(function(){
  $('.stations').click(function(){
    $('.stations').removeClass('selected');
    $(this).addClass('selected');
  });

});


var workstation = angular.module('workstation',[]);

workstation.controller('WorkstationCntrl', function ($scope) {
  // get data ajax
  $scope.stations = [{
    id: '68d82650-16e7-11e4-993f-ed87dfbc4232',
    name:'Warehouse',
    units: [{
      user:'11'},{
      user:'12'}
    ]
  },{
    id: '6986b5d0-16e7-11e4-993f-ed87dfbc4232',
    name:'Assambly',
    units: [{
      user:'21'},{
      user:'22'}
    ]
  },{
    id: '6a7582a0-16e7-11e4-993f-ed87dfbc4232',
    name:'QA',
    units: [{
      user:'31'},{
      user:'32'}
    ]
  }];
  
  window.data = $scope.stations;

  $scope.save = function(){
    console.log(this.stations);
  }
  $scope.control_action = function(action, target){


    if( target === "column" && action === "remove"){

    }

    // add - create new column, add it a station and rebind click event
    if( target === "column" && action === "add"){
      this.stations.push({name:'New Column',operators:[{user:'41'}]});
    }

    // stations
    // remove - whipe out the station. adieu
    if( target === "station" && action === "remove"){

    }
    // add - add new station at end of column
    if( target === "station" && action === "add"){
      var column_id = $('.stations.selected').attr('data-id');
      this.stations.forEach(function(each){
        if (each.id === column_id){
          each.units.push({user:'22'});
        }
      });
    }
  }

});
