var sim_id = window.params.simulation;
var station_id = window.params.unit;
var x = 0;
var y = 0;  

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

function takerror(){
    x++;
    console.log(x);
    if(x==120){
        x = 0;
        $('#myModal').modal('show');
        var myVar = setInterval(function () {errortwo ()},1000);           
    }    
};

function errortwo(){
    y++;
    console.log(y);
    if(y==10){
        y=0;
        $('#myModal').modal('hide');
        clearInterval(myVar);
    }
}


socket = io.connect();

socket.emit('station:join', {room:sim_id});


socket.on('begin', function(data) {
    $('#myModal').modal('hide');
    setInterval(function () {takerror ()},1000);
});

socket.on('halt', function(data) {
    $('#myModal').modal('show');
});

socket.on('hello', function(data) {
    console.log('this is server with data ');
});
