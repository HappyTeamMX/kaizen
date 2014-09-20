$(function () {
    // on load
    $('.send-to').hide();

    // bindings
    $('body').on('click','.note',function(){
        $('.note').removeClass('selected');
        $(this).addClass('selected');

    });

    $('body').on('click','#start button, #start-normal button',function(){
      $('#start').slideToggle();
      $('.send-to').slideToggle();
    });

    $('body').on('click','.send-to button',function(){
      var item_id = $('#start input').val();
      if (item_id != undefined){
        $('.tickets').append( '<li class="note" data-id=" '+ item_id +' "> '+ item_id+' </li>' );
      }
      $('#start input').val('');
      $('#start').slideToggle();
      $('.send-to').slideToggle();
      $('.note.selected').addClass('started');

    });


    $('body').on('click','#end button',function(){
      $('.note.started.selected').hide('swing');
      $('.note.started.selected').removeClass('selected');
    });
});
