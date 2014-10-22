window.params = function(){
    var params = {};
    var param_array = window.location.href.split('?')[1].split('&');
    for(var i in param_array){
        x = param_array[i].split('=');
        params[x[0]] = x[1];
    }
    return params;
}();

$(function () {

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
    format:'DD/MM/YYYY',
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

  $('.dataTable').DataTable();

});

function Validate(){
  var oli = document.getElementById('oli').value;
  if (oli != 'kaizen'){
    window.confirm('Contraseña o usuario incorrectos');
  } else {
    document.location.href = '/home';
  }

}


