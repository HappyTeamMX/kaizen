var sim_id = window.params.simulation;
var station_id = window.params.unit;


// bigger offset = smaller id
function get_id(offset) {
    return uuid.v4().substring(0, offset);
}


$(function() {
    $('.send-to').hide();
    // bindings
    $('body').on('click', '.note', function() {
        $('.note').removeClass('selected');
        $(this).addClass('selected');
    });

    $('body').on('click', '#start button, #start-normal button', function() {
        $('#start').slideToggle();
        $('.send-to').slideToggle();
    });

    $('body').on('click', '.send-to button', function() {
        var item_id = $('#start input').val();
        if (item_id != undefined) {
            $('.tickets').append('<li class="note" data-id=" ' + item_id + ' "> ' + item_id + ' </li>');
        }
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

socket.emit('station:join', {room:sim_id});


socket.on('begin', function(data) {
    $('#myModal').modal('hide');
});

socket.on('halt', function(data) {
    $('#myModal').modal('show');
});

socket.on('hello', function(data) {
    console.log('this is server with data ');
});
