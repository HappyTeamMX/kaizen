var sim_id = window.params.simulation;
var station_id = window.params.unit;
// bigger offset means smaller id
var x = 0;
var y = 0;

// bigger offset = smaller id
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
  $('#startupModal').modal('show');
});

function failure_timer(i,d) {
  if(i === 0 || d === 0){
    console.log('Invalid timer');
    return true;
  }
  x++;
  if (x === i) {
    x = 0;
    $('#errorModal').modal('show');
    var timer = setInterval(function() {
      error_timer(d, timer);
    }, 1000);
  }
};

function error_timer(d, timer) {
  y++;
  if (y === d) {
    y = 0;
    $('#errorModal').modal('hide');
    clearInterval(timer);
  }
}

socket = io.connect();

socket.emit('station:join', {
  room: sim_id,
  unit: station_id
});

socket.on('begin', function(data) {
  $('#startupModal').modal('hide');
  console.log('Start failure timer');
  var i = angular.element('.container').scope().station_data.interval;
  var d = angular.element('.container').scope().station_data.duration;
  var main_timer = setInterval(function() {
    var res = failure_timer(m2s(i),m2s(d));
    if (res){
      clearInterval(main_timer);
      return;
    }
  }, 1000);
});

socket.on('halt', function(data) {
  $('#startupModal').modal('show');
});

function brodcast_message(obj, event) {
  console.log('broadcasting...');
  var data = {
    room: sim_id,
    message: obj,
    event: event
  }
  socket.emit('station:update', data);
}

