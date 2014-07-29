/* Workstation Diagram Builder
    by Ricardo Iván (avathar). Github: /avatharBot

    Version 0.1.1
    Designed to work for project Kaizen
      may extend it's functionality sometime as an independent plugin

    MIT Licence: http://opensource.org/licenses/MIT
*/

$.fn.diagram = function(){


  // layout container
  var lc = $(this);

  // gotta work on this
  if( lc.children().size() > 1 ){
    console.log('cannot create diagram again');
    return false;
  }

  // base markup for controls and drawing area
  var c =
  '<div class="controls col-sm-3">    \
    <div class="row">   \
      <legend> Columns </legend>    \
      <span data="column" class="add">    \
        <i class="fa fa-plus"></i>    \
        <span>Add</span>    \
      </span>   \
      <span data="column" class="remove">   \
        <i class="fa fa-minus"></i>   \
       <span>Remove</span>    \
      </span>   \
    </div>    \
    <div class="row">   \
      <legend> Stations </legend>   \
      <span data="station" class="add">     \
        <i class="fa fa-plus"></i>    \
        <span>Add</span>    \
      </span>   \
      <span data="station" class="remove">    \
        <i class="fa fa-minus"></i>   \
        <span>Remove</span>   \
      </span>   \
    </div>    \
  </div>';
  var l =
    '<div class="layout col-sm-7"></div> \
    <div class="right"> <div class="btn save-me">Save Diagram</div> </div>';
  lc.append(c);
  lc.append(l);

  // highlight a column to remove it or adding stations
  function select_column (){
    $('.column').removeClass('selected');
    $(this).addClass('selected');
  }
  // binding the event
  $('.column').click(select_column);

  // click events for controlling the diagram creation
  $('.controls span').click(function(){
    var operation = $(this).attr('class');
    var target = $(this).attr('data');
    // column
    // remove -  just remove the entire column
    if( target === "column" && action === "remove"){
      $('.column.selected').remove();
    }
    // add - create new column, add it a station and rebind click event
    if( target === "column" && action === "add"){
      var next = parseInt($('.layout > .column:last-child').attr('data-number')) + 1;
      var column = '<div data-number="'+ next +'" class="column" ></div>';
      $('.layout').append(column);
      var station = '<div class="workstation"><i class="fa fa-gears"></i></div>';
      $('.column:last-child').append(station);
      $('.column').on('click', select_column);

    }

    // stations
    // remove - whipe out the station. adieu
    if( target === "station" && action === "remove"){
      $('.column.selected > .workstation:last-child').remove();
    }
    // add - add new station at end of column
    if( target === "station" && action === "add"){
      var station = '<div class="workstation"><i class="fa fa-gears"></i></div>';
      $('.column.selected').append(station);
    }
  });

  // stations info

  // serialize to JSON for saving
  $('.save-me').click(function(){
    var layout = $('.layout');
    var diagram = layout.html();
    console.log(diagram);
    var map = new Array();
    layout.children().each(function(){
      var dn = $(this).attr('data-number');
      map.push( $(this).attr('data-number') );
      console.log(map);
      $(this).children().each(function(){
        map[""+dn] = new Array();
        map[""+dn].push($(this).html());
      });
    });
  });
}
