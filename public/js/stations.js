$(function () {
    // on load
    // $('.send-to').hide();

    // bindings
    $('body').on('click','.note',function(){
        $('.note').removeClass('selected');
        $(this).addClass('selected');
    });


});
