$(function () {

  $('.pop').popover({
    html: true,
    content: function () {
      return $(this).children('.popover').html();
    }
  });
  $('.status').addClass('fa fa-circle');

  $(".alert").hide();
  $(".alert").alert();


  $('.datepicker').datetimepicker({
    pickTime: false,
    icons:{
      date: 'fa fa-calendar',
      up: "fa fa-arrow-up",
      down: "fa fa-arrow-down"
    }
  });

  $('.timepicker').datetimepicker({
    pickDate: false,
    format:'HH:mm',
    useCurrent: false,
    icons:{
      date: 'fa fa-calendar',
      up: "fa fa-arrow-up",
      down: "fa fa-arrow-down"
    }
  });


});

