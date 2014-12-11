var sim_id = window.params.simulation;
var station_id = window.params.unit;
// bigger offset means smaller id
function get_id(offset) {
  return uuid.v4().substring(0, offset);
}

$(function() {

  $('.send-to').hide();

  $('body').on('click', '.note', function() {
    $('.note').removeClass('selected');
    $(this).addClass('selected');
  });

  $('body').on('click', '#start button, #start-normal button', function() {
    $('#start').slideToggle();
    $('.send-to').slideToggle();
  });

  $('body').on('click', '.send-to button', function() {
    $('#start input').val('');
    $('#start').slideToggle();
    $('.send-to').slideToggle();
    $('.note.selected').addClass('started');
  });

  $('body').on('click', '#end button', function() {
    $('.note.started.selected').hide('swing');
    $('.note.started.selected').removeClass('selected');
  });
});

$(window).load(function() {
  $('#myModal').modal('show');
});

socket = io.connect();

socket.emit('station:join', {
  room: sim_id,
  unit: station_id
});

socket.on('begin', function(data) {
  $('#myModal').modal('hide');
});

socket.on('halt', function(data) {
  $('#myModal').modal('show');
});

function brodcast_message(obj) {
  console.log('broadcasting...');
  var data = {
    room: sim_id,
    message: obj,
  }
  socket.emit('station:update', data);
}

