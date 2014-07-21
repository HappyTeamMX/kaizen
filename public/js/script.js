$(function () {
  $('.pop').popover({
    html: true,
    content: function () {
      return $(this).children('.popover').html();
    }
  });

  $('.status').addClass('fa fa-circle');


});

  // simulation diagram builder
$(function(){

  function select_column (){
    $('.column').removeClass('selected');
    $(this).addClass('selected');
  }
  $('.column').click(select_column);

  $('.controls span').click(function(){
    var operation = $(this).attr('class');
    var target = $(this).attr('data');
    // column
    // remove -  just remove the entire column
    if( target === "column" && operation === "remove"){
      $('.column.selected').remove();
    }

    // add - create new column, add it a station and rebind click event
    if( target === "column" && operation === "add"){
      var next = parseInt($('.layout > .column:last-child').attr('data-number')) + 1;
      var column = '<div data-number="'+ next +'" class="column" ></div>';
      $('.layout').append(column);
      var station = '<div class="workstation"><i class="fa fa-gears"></i></div>';
      $('.column:last-child').append(station);
      $('.column').on('click', select_column);

    }
    // stations
    // remove - whipe out the station. adieu
    if( target === "station" && operation === "remove"){
      $('.column.selected > .workstation:last-child').remove();
    }
    // add - add new station at end of column
    if( target === "station" && operation === "add"){
      var station = '<div class="workstation"><i class="fa fa-gears"></i></div>';
      $('.column.selected').append(station);
    }

    console.log(operation);
    console.log(target);
  });

});
