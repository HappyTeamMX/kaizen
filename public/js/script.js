window.params = function() {
  // because we like to load all the JS code
  try {
    var params = {};
    var param_array = window.location.href.split('?')[1].split('&');
    for (var i in param_array) {
      x = param_array[i].split('=');
      params[x[0]] = x[1];
    }
    return params;
  } catch (error) {
    console.error("Handled error: " + error.message);
  }
}();

$(function() {

  $('.pop').popover({
    html: true,
    content: function() {
      return $(this).children('.popover').html();
    }
  });

  $('.status').addClass('fa fa-circle');
  $(".alert").hide();
  $(".alert").alert();

  $('.datepicker').datetimepicker({
    pickTime: false,
    format: 'DD/MM/YYYY',
    icons: {
      date: 'fa fa-calendar',
      up: "fa fa-arrow-up",
      down: "fa fa-arrow-down"
    }
  });

  $('.timepicker').datetimepicker({
    pickDate: false,
    format: 'HH:mm',
    useCurrent: false,
    icons: {
      date: 'fa fa-calendar',
      up: "fa fa-arrow-up",
      down: "fa fa-arrow-down"
    }
  });

  $('.dataTable').DataTable({
    "sDom": 'T<"clear">lfrtip',
    "oTableTools": {
      "sSwfPath": "/media/swf/copy_csv_xls_pdf.swf"
    }
  });
});
